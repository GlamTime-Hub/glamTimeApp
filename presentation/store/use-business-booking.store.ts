import { Professional } from "@/core/interfaces/professional.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Slot } from "@/core/interfaces/slot.interface";
import { create } from "zustand";

interface BusinessBookingState {
  professional: Professional | null;
  service: SubCategory | null;

  slot: Slot | null;
  addProfessional: (professional: Professional) => void;
  addService: (service: SubCategory) => void;

  addSlot: (slot: Slot) => void;

  clearBooking: () => void;
}

export const useBusinessBookingStore = create<BusinessBookingState>((set) => ({
  professional: null,
  service: null,
  slot: null,
  addProfessional: (professional: Professional) => set({ professional }),
  addService: (service: SubCategory) => set({ service }),
  addSlot: (slot) => set({ slot }),
  clearBooking: () =>
    set({
      professional: null,
      service: null,
      slot: null,
    }),
}));
