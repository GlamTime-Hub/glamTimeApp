import { Region } from "@/core/interfaces/region.interface";
import { create } from "zustand";

interface BusinessLocationState {
  businessId: string;
  region: Region;
  setBusinessId: (businessId: string) => void;
  setRegion: (region: Region) => void;
}

export const useBusinessLocationStore = create<BusinessLocationState>(
  (set) => ({
    businessId: "",
    region: {
      address: "",
      latitude: 4.711,
      longitude: -74.0721,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
    setBusinessId: (businessId: string) => set({ businessId }),
    setRegion: (region: Region) => set({ region }),
  })
);
