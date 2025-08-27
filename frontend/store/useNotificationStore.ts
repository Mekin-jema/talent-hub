// stores/useNotificationStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { handleError } from '@/lib/error-handler';
import { useAuthStore } from './useAuthStore';
import { toast } from 'sonner';
const API_BASE_URL = process.env.BACKEND_API_URL || 'https://talent-hub-1-91qb.onrender.com/api/v1';

const NOTIFICATIONS_API_URL = `${API_BASE_URL}/notifications`;

export interface Notification {
  id: string;
  message: string;
  type: 'application' | 'system' | 'message';
  isRead: boolean;
  createdAt: string;
  applicationId?: string;
  userId: string;
}

interface NotificationStoreState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  unreadCount: number;

  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAll: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStoreState>()(
  persist(
    (set, get) => ({
      notifications: [],
      loading: false,
      error: null,
      unreadCount: 0,

      fetchNotifications: async () => {
        try {
          set({ loading: true });
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in');

          const res = await axios.get(NOTIFICATIONS_API_URL, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          const notifications = res.data.data || [];
          const unreadCount = notifications.filter((n: Notification) => !n.isRead).length;

          set({ notifications, unreadCount });
        } catch (err) {
          handleError(err, 'Failed to fetch notifications');
          set({ error: 'Failed to fetch notifications' });
        } finally {
          set({ loading: false });
        }
      },

      markAsRead: async (id: string) => {
        try {
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in');

          await axios.patch(`${NOTIFICATIONS_API_URL}/${id}/read`, {}, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set((state) => {
            const updatedNotifications = state.notifications.map(n =>
              n.id === id ? { ...n, isRead: true } : n
            );
            const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
            
            return { notifications: updatedNotifications, unreadCount };
          });

          toast.success('Notification marked as read');
        } catch (err) {
          handleError(err, 'Failed to mark notification as read');
          throw err;
        }
      },

      markAllAsRead: async () => {
        try {
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in');

          await axios.patch(`${NOTIFICATIONS_API_URL}/read-all`, {}, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set((state) => {
            const updatedNotifications = state.notifications.map(n => ({ ...n, isRead: true }));
            return { notifications: updatedNotifications, unreadCount: 0 };
          });

          toast.success('All notifications marked as read');
        } catch (err) {
          handleError(err, 'Failed to mark all notifications as read');
          throw err;
        }
      },

      clearAll: async () => {
        try {
          const { user } = useAuthStore.getState();
          if (!user?.token) throw new Error('You must be logged in');

          await axios.delete(NOTIFICATIONS_API_URL, {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          set({ notifications: [], unreadCount: 0 });
          toast.success('All notifications cleared');
        } catch (err) {
          handleError(err, 'Failed to clear notifications');
          throw err;
        }
      },
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
);