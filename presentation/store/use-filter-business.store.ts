import { create } from "zustand";

interface BusinessFilter {
  name: string;
  country: string;
  city: string;
  category: string;
  businessType: string;
}

interface BusinessFilterState {
  filter: BusinessFilter;
  setFilter: (filter: Partial<BusinessFilter>) => void;
  isInitialized: boolean;
  initializeDefaults: (city?: string, country?: string) => void;
}

export const useBusinessFilterStore = create<BusinessFilterState>((set) => ({
  filter: {
    name: "",
    city: "",
    category: "",
    country: "",
    businessType: "",
  },
  isInitialized: false,
  setFilter: (newFilter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        ...newFilter,
      },
    })),
  initializeDefaults: (city, country) =>
    set((state) => ({
      filter: {
        ...state.filter,
        city: city ?? "",
        country: country ?? "",
      },
      isInitialized: true,
    })),
}));
