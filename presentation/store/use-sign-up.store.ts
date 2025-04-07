import { create } from "zustand";

interface SignUpState {
  email: string;
  password: string;
  addCredentials: (email: string, password: string) => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  email: "",
  password: "",
  addCredentials: (email, password) => set({ email, password }),
}));
