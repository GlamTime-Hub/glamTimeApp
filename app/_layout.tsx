import "../global.css";
import "react-native-url-polyfill/auto";

import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, View } from "react-native";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthStore from "@/core/store/auth.store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocationPermission } from "@/hooks/use-location-permission.hook";
import { useUserStore } from "@/presentation/store/use-user.store";
import { PortalHost } from "@rn-primitives/portal";
import { useNetInfo } from "@/hooks/use-net-info.hook";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useNotificationPush } from "@/hooks/use-notifications-push.hook";

const screenWidth = Dimensions.get("window").width;

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export { ErrorBoundary } from "expo-router";

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
      text1Style={{ fontSize: 14, color: "#28a745" }}
      text2Style={{ fontSize: 12 }}
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
      text1Style={{ fontSize: 14, color: "red" }}
      text2Style={{ fontSize: 12 }}
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
      text1Style={{ fontSize: 14, color: "#2F80ED" }}
      text2Style={{ fontSize: 12 }}
      text2Props={{
        numberOfLines: 2,
      }}
    />
  ),
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    "Baloo2-Bold": require("../assets/fonts/Baloo2-Bold.ttf"),
    "Baloo2-ExtraBold": require("../assets/fonts/Baloo2-ExtraBold.ttf"),
    "Baloo2-SemiBold": require("../assets/fonts/Baloo2-SemiBold.ttf"),
    "Baloo2-Medium": require("../assets/fonts/Baloo2-Medium.ttf"),
    "Baloo2-Regular": require("../assets/fonts/Baloo2-Regular.ttf"),
  });

  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  const { showInternetError } = useNetInfo();

  useLocationPermission();
  // useNotificationPush();

  const { restoreSession } = useAuthStore();
  const { loadUserFromStorage } = useUserStore();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

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
    loadUserFromStorage();
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  if (showInternetError) {
    return (
      <SafeAreaView>
        <View className="p-4">
          <CustomAlert
            title="Conexión a Internet"
            description="Por favor, verifica tu conexión a Internet y vuelve a intentarlo."
            type="destructive"
          />
        </View>
      </SafeAreaView>
    );
  }

  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <Stack
            initialRouteName="glam/(tabs)"
            screenOptions={{
              headerTintColor: isDarkColorScheme ? "white" : "black",
            }}
          >
            <Stack.Screen
              name="login"
              options={{
                title: "Conéctate con tu estilo",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="sign-up/[userAuthId]"
              options={{
                title: "¡Hey! Cuéntanos",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="glam/(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <PortalHost />
          <Toast topOffset={0} config={toastConfig} />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
