import { create } from "zustand";

interface BusinessFilterState {
  filter: {
    name: string;
    city: string;
    category: string;
    businessType: string;
  };
  setFilter: (filter: {
    name: string;
    city: string;
    category: string;
    businessType: string;
  }) => void;
}

export const useBusinessFilterStore = create<BusinessFilterState>((set) => ({
  filter: {
    name: "",
    city: "",
    category: "",
    businessType: "",
  },
  setFilter: (filter) => set({ filter }),
}));
