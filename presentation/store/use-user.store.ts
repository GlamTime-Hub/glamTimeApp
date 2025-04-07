import { create } from "zustand";
import { User } from "../../core/interfaces/user.interface";

interface UserState {
  user: User | null;
  addUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  addUser: (user: User) => set({ user }),
}));
