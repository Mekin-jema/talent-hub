import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'sonner';
import { handleError } from '@/lib/error-handler';

const API_BASE_URL = process.env.BACKEND_API_URL;

interface User {
  id: string;
  email: string;
  token?: string; // Token now inside the user
  firstName?: string;
  middleName?: string;
  lastName?: string;
  role?: string;
  tier?: string;
  phone?: string;
  avatar?: string;
}

interface UserStoreState {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;

  // Auth Actions
  signup: (input: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<{ message?: string }>;

  login: (input: { email: string; password: string }) => Promise<void>;
  verifyEmail: (token: string) => Promise<{ data: User }>;
  loginWithProvider: (provider: 'google' | 'github', code: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ message: string }>;
  resetPassword: (token: string, newPassword: string, email: string) => Promise<void>;

  // User Actions
  getCurrentUser: () => Promise<void>;
  updateProfile: (input: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      error: null,

      signup: async (input) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_BASE_URL}/signup`, input);
          toast.success('Verification email sent. Please check your inbox.');
          return { message: (response.data.message as string) || 'Signup successful' };
        } catch (error) {
          handleError(error, 'Signup failed');
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      login: async (input) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_BASE_URL}/signin`, input);
          const userData: User = response.data.data;
          if (!userData?.token) throw new Error(response.data.message || 'Login failed');

          axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
          set({ user: userData, isAuthenticated: true });
          toast.success('Login successful');
        } catch (error) {
          handleError(error, 'Login failed');
        } finally {
          set({ loading: false });
        }
      },

      loginWithProvider: async (provider, code) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_BASE_URL}/auth/${provider}`, { code });
          const userData: User = response.data.data;
          if (!userData?.token) throw new Error('Social login failed');

          axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
          set({ user: userData, isAuthenticated: true });
          toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful`);
        } catch (error) {
          handleError(error, 'Social login failed');
        } finally {
          set({ loading: false });
        }
      },

      verifyEmail: async (token) => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_BASE_URL}/verify-email/${token}`);
          if (!response.data?.data) throw new Error('Verification failed');
          toast.success('Email verified successfully');
          return { data: response.data.data as User };
        } catch (error) {
          handleError(error, 'Verification failed');
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      checkAuth: async () => {
        try {
          set({ isCheckingAuth: true });
          await get().getCurrentUser();
        } catch {
          set({ isAuthenticated: false });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          delete axios.defaults.headers.common['Authorization'];
          set({ user: null, isAuthenticated: false });
          toast.success('Logged out successfully');
        } catch (error) {
          handleError(error, 'Logout failed');
        } finally {
          set({ loading: false });
        }
      },

      requestPasswordReset: async (email) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_BASE_URL}/request-password-reset`, { resetEmail: email });
          toast.success(response.data.message || 'Password reset email sent');
          return response.data;
        } catch (error) {
          handleError(error, 'Failed to request password reset');
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token, newPassword, email) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_BASE_URL}/reset-password/${token}`, { newPassword, email });
          toast.success(response.data.message || 'Password reset successfully');
        } catch (error) {
          handleError(error, 'Password reset failed');
        } finally {
          set({ loading: false });
        }
      },

      getCurrentUser: async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/me`);
          const userData: User = response.data.data;
          if (userData?.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
          }
          set({ user: userData, isAuthenticated: !!userData });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
          handleError(error, 'Failed to fetch user');
        }
      },

      updateProfile: async (input) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_BASE_URL}/update`, input);
          const updatedUser: User = response.data;
          set({ user: updatedUser });
          toast.success('Profile updated successfully');
        } catch (error) {
          handleError(error, 'Profile update failed');
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        isCheckingAuth: state.isCheckingAuth,
        user: state.user,
      }),
    }
  )
);

// Initialize auth if token exists inside user
const initializeAuth = async () => {
  const { user } = useAuthStore.getState();
  if (user?.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    await useAuthStore.getState().getCurrentUser();
  }
};

initializeAuth();
