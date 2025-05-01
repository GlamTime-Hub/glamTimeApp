import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { User } from "../../core/interfaces/user.interface";

const USER_KEY = "glamtime-user";

interface UserState {
  user: User | null;
  addUser: (user: User) => void;
  logout: () => void;
  loadUserFromStorage: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  addUser: async (user: User) => {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    set({ user });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(USER_KEY);
    set({ user: null });
  },

  loadUserFromStorage: async () => {
    const storedUser = await SecureStore.getItemAsync(USER_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        set({ user: parsedUser });
      } catch (error) {
        await SecureStore.deleteItemAsync(USER_KEY);
      }
    }
  },
}));
