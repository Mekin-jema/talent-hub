import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'sonner';
import { handleError } from '@/lib/error-handler';
import { useAuthStore } from './useAuthStore';
import {  AdminJob, Application, ApplicationStatus, Role } from '@/types';
const API_BASE_URL =  'http://localhost:5000/api/v1';
// const API_BASE_URL = process.env.BACKEND_API_URL || 'https://talent-hub-2-flkq.onrender.com/api/v1';
const ADMIN_API_URL = `${API_BASE_URL}/admin`;




export interface AnalyticsData {
  totalJobs: number;
  totalApplications: number;
  totalUsers: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}

interface AdminStoreState {
  // Data
  allApplications: Application[];
  allJobs: AdminJob[];
  recentJobs: AdminJob[];
  analytics: AnalyticsData | null;
  
  // State
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchAllApplications: (page?: number, limit?: number) => Promise<void>;
  fetchAllJobs: (page?: number, limit?: number) => Promise<void>;
  fetchRecentJobs: () => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminStoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      allApplications: [],
      allJobs: [],
      recentJobs: [],
      analytics: null,
      loading: false,
      error: null,

      // Fetch all applications (admin only)
      fetchAllApplications: async (page = 1, limit = 10) => {
        try {
          set({ loading: true, error: null });
          const { user } = useAuthStore.getState();
          console.log("user inside fetch",user);
          if (!user?.token) throw new Error('You must be logged in');
          if (user.user.role !== Role.ADMIN) throw new Error('Admin access required');

          const res = await axios.get(
            `${ADMIN_API_URL}/applications?page=${page}&limit=${limit}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          set({ allApplications: res.data.data });
        } catch (err) {
          const errorMessage = handleError(err, 'Failed to fetch applications');
          set({ error: errorMessage });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // Fetch all jobs (admin only)
      fetchAllJobs: async (page = 1, limit = 10) => {
        try {
          set({ loading: true, error: null });
          const { user } = useAuthStore.getState();
          
          if (!user?.token) throw new Error('You must be logged in');
          if (user.user.role !== Role.ADMIN) throw new Error('Admin access required');

          const res = await axios.get(
            `${ADMIN_API_URL}/jobs?page=${page}&limit=${limit}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          set({ allJobs: res.data.data });
        } catch (err) {
          const errorMessage = handleError(err, 'Failed to fetch jobs');
          set({ error: errorMessage });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // Fetch recent jobs (admin only)
      fetchRecentJobs: async () => {
        try {
          set({ loading: true, error: null });
          const { user } = useAuthStore.getState();
          
          if (!user?.token) throw new Error('You must be logged in');
          if (user.user.role !== Role.ADMIN) throw new Error('Admin access required');

          const res = await axios.get(
            `${ADMIN_API_URL}/jobs/recent`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          set({ recentJobs: res.data.data });
        } catch (err) {
          const errorMessage = handleError(err, 'Failed to fetch recent jobs');
          set({ error: errorMessage });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // Fetch analytics data (admin only)
      fetchAnalytics: async () => {
        try {
          set({ loading: true, error: null });
          const { user } = useAuthStore.getState();
          
          if (!user?.token) throw new Error('You must be logged in');
          if (user.user.role !== Role.ADMIN) throw new Error('Admin access required');

          const res = await axios.get(
            `${ADMIN_API_URL}/analytics`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          set({ analytics: res.data.data });
        } catch (err) {
          const errorMessage = handleError(err, 'Failed to fetch analytics');
          set({ error: errorMessage });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // Update application status (admin only)
      updateApplicationStatus: async (id: string, status: ApplicationStatus) => {
        try {
          set({ loading: true, error: null });
          const { user } = useAuthStore.getState();
          
          if (!user?.token) throw new Error('You must be logged in');
          if (user.user.role !== Role.ADMIN) throw new Error('Admin access required');

          const res = await axios.patch(
            `${ADMIN_API_URL}/applications/${id}/status`,
            { status },
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          // Update the local state
          set((state) => ({
            allApplications: state.allApplications.map((app) =>
              app.id === id ? { ...app, status } : app
            ),
          }));

          toast.success('Application status updated successfully');
        } catch (err) {
          const errorMessage = handleError(err, 'Failed to update application status');
          set({ error: errorMessage });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // Delete job (admin only)
      deleteJob: async (id: string) => {
        try {
          set({ loading: true, error: null });
          const { user } = useAuthStore.getState();
          
          if (!user?.token) throw new Error('You must be logged in');
          if (user.user.role !== Role.ADMIN) throw new Error('Admin access required');

          await axios.delete(
            `${ADMIN_API_URL}/jobs/${id}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          // Update the local state
          set((state) => ({
            allJobs: state.allJobs.filter((job) => job.id !== id),
            recentJobs: state.recentJobs.filter((job) => job.id !== id),
          }));

          toast.success('Job deleted successfully');
        } catch (err) {
          const errorMessage = handleError(err, 'Failed to delete job');
          set({ error: errorMessage });
          throw err;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        allApplications: state.allApplications,
        allJobs: state.allJobs,
        recentJobs: state.recentJobs,
        analytics: state.analytics,
      }),
    }
  )
);