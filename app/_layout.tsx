import "../global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Platform } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";
import { useDeepLinking } from "@/hooks/use-deep-link.hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthStore from "@/core/store/auth.store";

const screenWidth = Dimensions.get("window").width;

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        width: screenWidth,
        padding: 0,
        marginTop: 45,
        borderLeftColor: "#28a745",
        borderRadius: 0,
      }}
      text1Style={{ fontSize: 18, color: "#28a745" }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        width: screenWidth,
        padding: 0,
        marginTop: 45,
        borderLeftColor: "red",
        borderRadius: 0,
      }}
      text1Style={{ fontSize: 18, color: "red" }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        width: screenWidth,
        padding: 0,
        marginTop: 45,
        borderLeftColor: "#2F80ED",
        borderRadius: 0,
      }}
      text1Style={{ fontSize: 18, color: "#2F80ED" }}
      text2Style={{ fontSize: 14 }}
      text2Props={{
        numberOfLines: 2,
      }}
    />
  ),
};

export default function RootLayout() {
  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useDeepLinking();

  const { restoreSession } = useAuthStore();

  useLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    restoreSession();
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack initialRouteName="glam/(tabs)">
          <Stack.Screen
            name="login/index"
            options={{
              title: "Conéctate con tu estilo",
              headerTitleAlign: "center",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              headerTitleAlign: "center",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="glam/(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="confirm-email/index"
            options={{ title: "Confirmation", headerTitleAlign: "center" }}
          />
        </Stack>
        <PortalHost />
        <Toast topOffset={0} config={toastConfig} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
