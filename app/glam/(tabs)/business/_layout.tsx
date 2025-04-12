import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";
import { View } from "react-native";

const BusinessScreen = () => {
  return (
    <Stack
      initialRouteName="list/index"
      screenOptions={{
        headerRight: () => (
          <View className="flex flex-row gap-2 justify-end px-0 relative -right-2">
            <NotificationIcon />
            <ThemeToggle />
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="list/index"
        options={{
          headerTitleAlign: "center",
          title: "Negocios",
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          headerTitleAlign: "center",
          title: "Detalle",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default BusinessScreen;
