import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
// import { jwtDecode, JwtPayload } from 'jwt-decode';

const API_BASE_URL = process.env.BACKEND_API_URL;

// Type guard for Axios errors
function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
  return (error as AxiosError).isAxiosError !== undefined;
}
interface LoginResponse {
  data:{
    token: string;
  };
  message?: string;
  status?: string;
}


interface User {
  id: string;
  email: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  role?: string;
  tier?: string;
  phone?: string;
  avatar?: string;
}

// interface ApiClient {
//   id: string;
//   label: string;
//   status: 'active' | 'inactive';
//   createdAt: string;
//   expiresAt: string;
//   token?: string;
// }




interface UserStoreState {
  token:string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  error: string | null;
  user: User |  null;

  // Auth Actions
  signup: (input: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<{  message?: string }>;
  
  login: (input: { email: string; password: string }) => Promise<string>;
  verifyEmail: (token: string) => Promise<{
    data: User;
  }>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ message: string }>;
  resetPassword: (token: string, newPassword: string,email:string) => Promise<void>;
  
  // User Actions
  getCurrentUser: () => Promise<void>;
  updateProfile: (input: Partial<User>) => Promise<void>;
  

}

export const useAuthStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      error: null,
      user: null, 
      
      signup: async (input) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_BASE_URL}/signup`, input, {
            headers: { 'Content-Type': 'application/json' },
          });


          if (!response.data) {
            throw new Error(response.data.message || 'Signup failed - no token received');
          }
          toast.success('Verification email sent. Please check your inbox.');
          return {  message: response.data.message || 'Signup successful' };
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            const message = error.response?.data?.message || 'Signup failed';
            toast.error(message);
            throw new Error(message);
          } else {
            const message = error instanceof Error ? error.message : 'Signup failed';
            toast.error(message);
            throw new Error(message);
          }
        } finally {
          set({ loading: false });
        }
      },


login: async (input: { email: string; password: string }): Promise<string> => {
  try {
    set({ loading: true });
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/signin`, input, {
      headers: { 'Content-Type': 'application/json' },
    });

    const token = response.data?.data?.token;
    if (!token) throw new Error(response.data.message || 'Login failed - no token received');

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    set({ token, isAuthenticated: true });

    // ✅ Immediately fetch and set the user after login
    await get().getCurrentUser();

    toast.success('Login successful');
    return token;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw new Error(message);
    } else {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw new Error(message);
    }
  } finally {
    set({ loading: false });
  }
}
,
      verifyEmail: async (token) => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_BASE_URL}/verify-email/${token}`);
          
          if (response.data) {
            toast.success('Email verified successfully');
     
            return { data: response.data.data }; // Return user data
          } else {
            throw new Error( 'Verification failed');
          }
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            const message = error.response?.data?.message || 'Verification failed';
            toast.error(message);
            throw new Error(message);
          } else {
            const message = error instanceof Error ? error.message : 'Verification failed';
            toast.error(message);
            throw new Error(message);
          }
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
          set({ token: null, isAuthenticated: false });
          toast.success('Logged out successfully');
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data?.message || 'Logout failed');
          } else {
            toast.error('Logout failed');
          }
        } finally {
          set({ loading: false });
        }
      },

      requestPasswordReset: async (email) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_BASE_URL}/request-password-reset`, { resetEmail:email });
          toast.success(response.data.message || 'Password reset email sent');
          return response.data;
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            const message = error.response?.data?.message || 'Failed to request password reset';
            toast.error(message);
            throw new Error(message);
          } else {
            const message = error instanceof Error ? error.message : 'Failed to request password reset';
            toast.error(message);
            throw new Error(message);
          }
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token, newPassword,email) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_BASE_URL}/reset-password/${token}`, { newPassword,email });
          toast.success(response.data.message || 'Password reset successfully');
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            const message = error.response?.data?.message || 'Password reset failed';
            toast.error(message);
            throw new Error(message);
          } else {
            const message = error instanceof Error ? error.message : 'Password reset failed';
            toast.error(message);
            throw new Error(message);
          }
        } finally {
          set({ loading: false });
        }
      },

getCurrentUser: async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`);
    
    
    // Save user data instead of token
    set({ 
      user: response.data.data,
      isAuthenticated: true 
    });
  } catch (error: unknown) {
    set({ 
      user: null,
      isAuthenticated: false 
    });

    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    } else {
      throw new Error('Failed to fetch user');
    }
  }
},


      updateProfile: async (input) => {
        console.log('Updating profile with input:', input);
        try {
          set({ loading: true });
          const response = await axios.put(`${API_BASE_URL}/update`, input);
          set({ token: response.data });
          toast.success('Profile updated successfully');
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            const message = error.response?.data?.message || 'Profile update failed';
            toast.error(message);
            throw new Error(message);
          } else {
            const message = error instanceof Error ? error.message : 'Profile update failed';
            toast.error(message);
            throw new Error(message);
          }
        } finally {
          set({ loading: false });
        }
      },

 

    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isCheckingAuth: state.isCheckingAuth,
        user:state.user
      }),
    }
  )
);


const initializeAuth = async() => {
  const { token } = useAuthStore.getState();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     await useAuthStore.getState().getCurrentUser(); 
  }
   const state = useAuthStore.getState();
  if (state.isAuthenticated && state.token) {
    // Note: You'll need to store the token in your state or elsewhere
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};


initializeAuth();