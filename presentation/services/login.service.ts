import * as WebBrowser from "expo-web-browser";
import useAuthStore from "@/core/store/auth.store";
import Supabase from "@/core/api/supabase.api";

WebBrowser.maybeCompleteAuthSession();

export const AuthService = {
  loginWithEmail: async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await Supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return error;

    useAuthStore.getState().setSession(session);
    return null;
  },

  /* loginWithGoogle: async () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: "GOOGLE_EXPO_CLIENT_ID",
      iosClientId: "GOOGLE_IOS_CLIENT_ID",
      androidClientId: "GOOGLE_ANDROID_CLIENT_ID",
      webClientId: "GOOGLE_WEB_CLIENT_ID",
    });

    const result = await promptAsync();
    if (result.type === "success") {
      const { data, error } = await Supabase.auth.signInWithIdToken({
        provider: "google",
        token: result.authentication?.id_token,
      });
      if (error) throw error;
      useAuthStore.getState().setSession(data.user);
    }
  }, */
  /*
  loginWithApple: async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });

      const { data, error } = await Supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken ?? "",
      });
      if (error) throw error;
      useAuthStore.getState().setSession(data.user);
    } catch (error) {
      console.error("Error al iniciar sesión con Apple", error);
    }
  }, */

  logout: async () => {
    await useAuthStore.getState().logout();
  },
};
