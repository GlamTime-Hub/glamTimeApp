import { create } from "zustand";

interface LoginState {
  phoneNumber: string;
  phoneNumberExtension: string;
  addPhoneNumber: (phoneNumber: string, phoneNumberExtension: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  phoneNumber: "",
  phoneNumberExtension: "",
  addPhoneNumber: (phoneNumber: string, phoneNumberExtension: string) =>
    set({ phoneNumber, phoneNumberExtension }),
}));
