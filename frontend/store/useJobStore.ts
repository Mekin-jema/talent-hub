import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'sonner';
import { handleError } from '@/lib/error-handler';
import { JobFormValues } from '@/validation/job.validation';
import { useAuthStore } from './useAuthStore';
import { Job } from '@/types';

const API_BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:5000/api/v1';
const JOBS_API_URL = `${API_BASE_URL}/jobs`;

interface JobStoreState {
  jobs: Job[];
  currentJob: Job ;
  loading: boolean;
  error: string | null;

  fetchJobs: (page?: number, limit?: number) => Promise<void>;
  getJobById: (id: string) => Promise<void>;
  createJob: (data: Partial<JobFormValues>) => Promise<JobFormValues>;
  updateJob: (id: string, data: Partial<JobFormValues>) => Promise<JobFormValues>;
  deleteJob: (id: string) => Promise<void>;
}

export const useJobStore = create<JobStoreState>()(
  persist(
    (set, get) => ({
      jobs: [],
      currentJob:{} as Job,
      loading: false,
      error: null,

      fetchJobs: async (page = 1, limit = 10) => {
        try {
          set({ loading: true });
          const res = await axios.get(`${JOBS_API_URL}?page=${page}&limit=${limit}`);
          set({ jobs: res.data.data });
        } catch (err) {
          handleError(err, 'Failed to fetch jobs');
          set({ error: 'Failed to fetch jobs' });
        } finally {
          set({ loading: false });
        }
      },

      getJobById: async (id: string) => {
        console.log("Fetching job with ID:", id);
        try {
          set({ loading: true });
          const res = await axios.get(`${JOBS_API_URL}/${id}`);
          set({ currentJob: res.data.data });
        } catch (err) {
          handleError(err, 'Failed to fetch job');
          set({ error: 'Failed to fetch job' });
        } finally {
          set({ loading: false });
        }
      },

      createJob: async (data: Partial<JobFormValues>) => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          console.log("user",user)
          if (!user?.token) throw new Error('You must be logged in to create a job');

          const res = await axios.post(JOBS_API_URL, data, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set((state) => ({ jobs: [res.data.data, ...state.jobs] }));
          toast.success('Job created successfully');
          return res.data.data;
        } catch (err) {
          handleError(err, 'Failed to create job');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      updateJob: async (id: string, data: Partial<JobFormValues>) => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in to update a job');

          const res = await axios.put(`${JOBS_API_URL}/${id}`, data, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set((state) => ({
            jobs: state.jobs.map((job) => (job.id === id ? res.data.data : job)),
          }));
          toast.success('Job updated successfully');
          return res.data.data;
        } catch (err) {
          handleError(err, 'Failed to update job');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      deleteJob: async (id: string) => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in to delete a job');

          await axios.delete(`${JOBS_API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set((state) => ({ jobs: state.jobs.filter((job) => job.id !== id) }));
          toast.success('Job deleted successfully');
        } catch (err) {
          handleError(err, 'Failed to delete job');
          throw err;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'job-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        jobs: state.jobs,
        currentJob: state.currentJob,
      }),
    }
  )
);
