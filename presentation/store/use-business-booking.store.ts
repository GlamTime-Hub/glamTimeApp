import { create } from "zustand";

interface BusinessBookingState {
  professional: any | null;
  service: any | null;

  slot: any;
  addProfessional: (professional: any) => void;
  addService: (service: any) => void;

  addSlot: (slot: any) => void;
}

export const useBusinessBookingStore = create<BusinessBookingState>((set) => ({
  professional: null,
  service: null,
  slot: null,
  addProfessional: (professional) => set({ professional }),
  addService: (service) => set({ service }),
  addSlot: (slot) => set({ slot }),
}));
