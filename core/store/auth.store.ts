import { create } from "zustand";
import Supabase from "../api/supabase.api";
import { Session } from "@supabase/supabase-js";
import SecureStoreAdapter from "../adapters/secureStoreAdapter";
import { queryClient } from "../config/query-client";

interface AuthState {
  session: Session | null;
  setSession: (session: Session | null) => void;
  restoreSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  session: null,

  restoreSession: async () => {
    const session = await SecureStoreAdapter.getItem("session");
    console.log("restoreSession", session);
    if (session) {
      set({ session: JSON.parse(session) });
    }
  },
  setSession: async (session) => {
    await SecureStoreAdapter.setItem("session", JSON.stringify(session));
    set({ session });
  },

  logout: async () => {
    await Supabase.auth.signOut();
    await SecureStoreAdapter.removeItem("session");
    queryClient.clear();
    queryClient.removeQueries();
    set({ session: null });
  },
}));

// Escuchar cambios de sesión y actualizar Zustand
Supabase.auth.onAuthStateChange(async (event, session) => {
  console.log("onAuthStateChange", session);
  console.log("event", event);
  if (session) {
    await SecureStoreAdapter.setItem("session", JSON.stringify(session));
    useAuthStore.getState().setSession(session);
  } else {
    await SecureStoreAdapter.removeItem("session");
  }
});

export default useAuthStore;
