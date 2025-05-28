export default ({ config }) => ({
  ...config,
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    apiBackendUrl: process.env.EXPO_PUBLIC_API_BACKEND,
    eas: {
      projectId: "09907518-f6ae-463a-b3f9-2390f4f43e31",
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "@react-native-community/datetimepicker",
      {
        android: {
          timePicker: {
            background: { light: "#FF5722", dark: "#383838" },
            numbersBackgroundColor: { light: "#FF5722", dark: "#383838" },
          },
        },
      },
    ],
    [
      "expo-asset",
      {
        assets: ["./assets/images/default.png"],
      },
    ],
  ],
});
