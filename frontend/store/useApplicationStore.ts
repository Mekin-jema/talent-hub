import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'sonner';
import { handleError } from '@/lib/error-handler';
import { useAuthStore } from './useAuthStore';

const API_BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:5000/api/v1';
const APPLICATIONS_API_URL = `${API_BASE_URL}/applications`;

export interface ApplicationFormValues {
  jobId: string;
  coverLetter?: string;
  salaryExpectation?: string;
  noticePeriod?: string;
  resumeUrl?: string;
}

export interface Application {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  resumeUrl?: string | null;
  extraData?: Record<string, any>;
  job: {
    id: string;
    title: string;
    createdBy: { id: string; fullName: string; email: string };
  };
  applicant: { id: string; fullName: string; email: string };
}

interface ApplicationStoreState {
  applications: Application[];
  currentApplication: Application | null;
  loading: boolean;
  error: string | null;

  applyForJob: (data: ApplicationFormValues) => Promise<Application>;
  fetchUserApplications: (userId: string) => Promise<void>;
  fetchJobApplications: (jobId: string) => Promise<void>;
  updateApplicationStatus: (id: string, status: string) => Promise<Application>;
}

export const useApplicationStore = create<ApplicationStoreState>()(
  persist(
    (set, get) => ({
      applications: [],
      currentApplication: null,
      loading: false,
      error: null,

      applyForJob: async (data) => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in to apply for a job');

          const res = await axios.post(`${APPLICATIONS_API_URL}/apply`, data, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set((state) => ({
            applications: [res.data.data, ...state.applications],
          }));
          toast.success('Application submitted successfully');
          return res.data.data;
        } catch (err) {
          handleError(err, 'Failed to apply for job');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      fetchUserApplications: async (userId) => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in');

          const res = await axios.get(`${APPLICATIONS_API_URL}/user/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set({ applications: res.data.data });
        } catch (err) {
          handleError(err, 'Failed to fetch user applications');
          set({ error: 'Failed to fetch user applications' });
        } finally {
          set({ loading: false });
        }
      },

      fetchJobApplications: async (jobId) => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in');

          const res = await axios.get(`${APPLICATIONS_API_URL}/job/${jobId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set({ applications: res.data.data });
        } catch (err) {
          handleError(err, 'Failed to fetch job applications');
          set({ error: 'Failed to fetch job applications' });
        } finally {
          set({ loading: false });
        }
      },

      updateApplicationStatus: async (id, status) => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in');

          const res = await axios.put(
            `${APPLICATIONS_API_URL}/${id}/status`,
            { status },
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === id ? res.data.data : app
            ),
          }));
          toast.success('Application status updated successfully');
          return res.data.data;
        } catch (err) {
          handleError(err, 'Failed to update application status');
          throw err;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'application-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        applications: state.applications,
        currentApplication: state.currentApplication,
      }),
    }
  )
);
