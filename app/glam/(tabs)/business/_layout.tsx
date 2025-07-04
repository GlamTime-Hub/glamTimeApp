import { useColorScheme } from "@/lib/useColorScheme";
import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";
import { View } from "react-native";

const BusinessScreen = () => {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Stack
      initialRouteName="list/index"
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: isDarkColorScheme ? "white" : "black",
        headerRight: () => (
          <View className="flex-row items-center  relative -mr-1">
            <NotificationIcon />
            <ThemeToggle />
          </View>
        ),
        contentStyle: {
          height: "180%",
        },
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
