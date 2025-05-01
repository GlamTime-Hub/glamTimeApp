import * as WebBrowser from "expo-web-browser";
import useAuthStore from "@/core/store/auth.store";
import Supabase from "@/core/api/supabase.api";
import { Session } from "@supabase/supabase-js";

WebBrowser.maybeCompleteAuthSession();

export const AuthService = {
  signInWithOtp: async (phoneNumber: string) => {
    const { error } = await Supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });

    if (error) return error;

    return null;
  },
  verifyOtp: async (phoneNumber: string, otp: string) => {
    const {
      data: { session },
      error,
    } = await Supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: "sms",
    });

    return {
      error,
      session,
    };
  },
  logout: async () => {
    await useAuthStore.getState().logout();
  },
};
