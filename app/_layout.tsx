import "../global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Dimensions, Platform } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { useLayoutEffect } from "react";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";

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
        marginTop: Platform.OS === "android" ? 45 : 0,
        borderLeftColor: "#FE6700",
        borderRadius: 0,
      }}
      text1Style={{ fontSize: 18, color: "#FE6700" }}
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
};

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
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
      </Stack>
      <PortalHost />
      <Toast topOffset={0} config={toastConfig} />
    </ThemeProvider>
  );
}
