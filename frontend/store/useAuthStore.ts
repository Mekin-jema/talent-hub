import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'sonner';
import { handleError } from '@/lib/error-handler';
import { SignupFormType } from '@/validation/signup.validation';
import { loginFormType } from '@/validation/login.validation';

const API_BASE_URL = process.env.BACKEND_API_URL || 'https://talent-hub-1-91qb.onrender.com/api/v1';
const AUTH_API_URL = `${API_BASE_URL}/auth`;

interface User {
  user: any;
  id: string;
  email: string;
  token?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  role: string;
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

  signup: (input: SignupFormType) => Promise<{ message?: string }>;
  login: (input: loginFormType) => Promise<{
    role: string;
    user:{
      role:string
    }
  }>;
  loginWithProvider: (provider: 'google' | 'github', code: string) => Promise<User>;
  verifyEmail: (token: string) => Promise<User>;
  checkAuth: () => void;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ message: string }>;
  resetPassword: (token: string, newPassword: string, email: string) => Promise<void>;
  updateProfile: (input: Partial<User>) => Promise<User | null>;
}

export const useAuthStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      error: null,

      signup: async (input: SignupFormType) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${AUTH_API_URL}/register`, input);

          if (res.data.success === false) {
            toast.error(res.data.data.message || 'Signup failed');
            return { message: res.data.data.message };
          }

          toast.success(res.data.data.message || 'Signup successful');
          return { message: res.data.data.message || 'Signup successful' };
        } catch (err) {
          handleError(err, 'Signup failed');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      login: async (input) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${AUTH_API_URL}/login`, input);
          const { token, ...userData } = res.data.data;

          if (!token) throw new Error(res.data.message || 'Login failed');

          // set axios auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // persist user including token
          set({ user: { ...userData, token }, isAuthenticated: true });
          toast.success('Login successful');

          return res.data.data.user;
        } catch (err) {
          handleError(err, 'Login failed');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      loginWithProvider: async (provider, code) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${AUTH_API_URL}/auth/${provider}`, { code });
          const { token, ...userData } = res.data.data;

          if (!token) throw new Error('Social login failed');

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          set({ user: { ...userData, token }, isAuthenticated: true });
          toast.success(`${provider} login successful`);
          return { ...userData, token };
        } catch (err) {
          handleError(err, 'Social login failed');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      verifyEmail: async (token) => {
        try {
          set({ loading: true });
          const res = await axios.get(`${AUTH_API_URL}/verify-email/${token}`);
          if (!res.data?.data) throw new Error('Verification failed');
          toast.success('Email verified successfully');
          return res.data.data;
        } catch (err) {
          handleError(err, 'Verification failed');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      checkAuth: () => {
        const { user } = get();
        if (user?.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
        set({ isCheckingAuth: false });
      },

      logout: async () => {
        try {
          set({ loading: true });
          delete axios.defaults.headers.common['Authorization'];
          set({ user: null, isAuthenticated: false });
          toast.success('Logged out successfully');
        } catch (err) {
          handleError(err, 'Logout failed');
        } finally {
          set({ loading: false });
        }
      },

      requestPasswordReset: async (email) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${AUTH_API_URL}/request-password-reset`, { resetEmail: email });
          toast.success(res.data.message || 'Password reset email sent');
          return res.data;
        } catch (err) {
          handleError(err, 'Failed to request password reset');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token, newPassword, email) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${AUTH_API_URL}/reset-password/${token}`, { newPassword, email });
          toast.success(res.data.message || 'Password reset successfully');
        } catch (err) {
          handleError(err, 'Password reset failed');
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (input) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${AUTH_API_URL}/update`, input);
          const user: User = res.data;
          set({ user });
          toast.success('Profile updated successfully');
          return user;
        } catch (err) {
          handleError(err, 'Profile update failed');
          throw err;
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

// Initialize auth from localStorage
useAuthStore.getState().checkAuth();
