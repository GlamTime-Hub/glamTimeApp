import { create } from "zustand";
import { UserNotification } from "@/core/interfaces/user-notification.interface";

interface UserNotificationState {
  notification: UserNotification | null;
  totalNotification: number;
  setNotification: (notification: UserNotification) => void;
  setTotalNotification: (totalNotification: number) => void;
}

export const useUserNotificationStore = create<UserNotificationState>(
  (set) => ({
    notification: null,
    totalNotification: 0,
    setNotification: (notification: UserNotification) => set({ notification }),
    setTotalNotification: (totalNotification: number) =>
      set({ totalNotification }),
  })
);
