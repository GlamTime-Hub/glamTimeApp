import { create } from "zustand";
import Supabase from "../api/supabase.api";
import { Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  setSession: (session: Session | null) => void;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  session: null,

  setSession: (session) => set({ session }),

  logout: async () => {
    await Supabase.auth.signOut();
    set({ session: null });
  },
}));

// Escuchar cambios de sesión y actualizar Zustand
Supabase.auth.onAuthStateChange((event, session) => {
  console.log("session");
  if (session) {
    useAuthStore.getState().setSession(session);
  }
});

export default useAuthStore;
