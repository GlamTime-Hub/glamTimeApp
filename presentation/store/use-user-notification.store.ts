import { create } from "zustand";
import { UserNotification } from "@/core/interfaces/user-notification.interface";

interface UserNotificationState {
  notification: UserNotification | null;
  setNotification: (notification: UserNotification) => void;
}

export const useUserNotificationStore = create<UserNotificationState>(
  (set) => ({
    notification: null,
    setNotification: (notification: UserNotification) => set({ notification }),
  })
);
