import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'sonner';
import { handleError } from '@/lib/error-handler';
import { useAuthStore } from './useAuthStore';
import { ApplicationFormValues } from '@/validation/application.validation';
import { Application, Job } from '@/types';

const API_BASE_URL = process.env.BACKEND_API_URL || 'https://talent-hub-2-flkq.onrender.com/api/v1';
// const API_BASE_URL = 'http://localhost:5000/api/v1';
const APPLICATIONS_API_URL = `${API_BASE_URL}/applications`;




interface ApplicationStoreState {
  applications: Application[];
  userApplications: Application[]; // NEW: for logged-in user's apps
  currentApplication: Application | null;
  loading: boolean;
  error: string | null;
  appliedJobs: Record<string, boolean>;

  applyForJob: (data: ApplicationFormValues, id: string) => Promise<Application>;
  fetchUserApplications: () => Promise<void>;
  fetchJobApplications: (jobId: string) => Promise<void>;
  updateApplicationStatus: (id: string, status: string) => Promise<Application>;
  checkIfApplied: (jobId: string) => boolean;
}

export const useApplicationStore = create<ApplicationStoreState>()(
  persist(
    (set, get) => ({
      applications: [],
      userApplications: [], // NEW
      currentApplication: null,
      appliedJobs: {},
      loading: false,
      error: null,

      applyForJob: async (data, id) => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in to apply for a job');

          const res = await axios.post(`${APPLICATIONS_API_URL}/apply`, { data, id }, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set((state) => ({
            applications: [res.data.data, ...state.applications],
            appliedJobs: { ...state.appliedJobs, [id]: true },
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

      fetchUserApplications: async () => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in');
          console.log('User in applyForJob:', user);


          const res = await axios.get(`${APPLICATIONS_API_URL}/my-applications`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          const appliedJobsMap = res.data.data.reduce(
            (acc: Record<string, boolean>, app: Application) => {
              acc[app.job.id] = true;
              return acc;
            },
            {}
          );

          set({
            userApplications: res.data.data, // store in userApplications
            appliedJobs: appliedJobsMap,
          });
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

          const res = await axios.patch(
            `${APPLICATIONS_API_URL}/${id}/status`,
            { status },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );

          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === id ? res.data.data : app
            ),
            userApplications: state.userApplications.map((app) =>
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

      checkIfApplied: (jobId) => {
        const { appliedJobs } = get();
        return !!appliedJobs[jobId];
      },
    }),
    {
      name: 'application-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        applications: state.applications,
        userApplications: state.userApplications, // persist userApplications
        currentApplication: state.currentApplication,
        appliedJobs: state.appliedJobs,
      }),
    }
  )
);
