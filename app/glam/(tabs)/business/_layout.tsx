import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BusinessScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <Stack
        initialRouteName="list/index"
        screenOptions={{
          headerTitleAlign: "center",
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
    </SafeAreaView>
  );
};

export default BusinessScreen;
