import { AppNotification } from 'types/interfaces';
import { create } from 'zustand';

interface NotificationState {
  notifications: AppNotification[];
  add: (notifications: Omit<AppNotification, 'ID'>) => void;
  set: (notifications: AppNotification[]) => void;
  reset: () => void;
  // action for fetching data
  fetch: () => Promise<void>;
}

const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  set: (notifications) => set({ notifications }),
  add: (notifications) =>
    set((state) => ({
        notifications: [
        ...state.notifications,
        {
          ...notifications,
        },
      ],
    })),
  reset: () => set({ notifications: [] }),
  fetch: async () => {
    const response = await fetch('https://api.example.com/search-history');
    const notifications = await response.json();
    set({ notifications });
  },
}));

export default useNotificationStore;
