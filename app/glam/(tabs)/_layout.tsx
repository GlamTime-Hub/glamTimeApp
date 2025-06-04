import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Tabs } from "expo-router";
import {
  CalendarDays,
  House,
  CircleUserRound,
  Heart,
  Store,
} from "@/lib/icons/Icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { View } from "react-native";
import { NotificationIcon } from "@/presentation/components/feature";

export default function _layout() {
  const { isDarkColorScheme, titleColor } = useColorScheme();

  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={{
        headerRight: () => (
          <View className="flex-row items-center py-0 relative mr-4">
            <NotificationIcon />
            <ThemeToggle />
          </View>
        ),
        headerTitleAlign: "center",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: isDarkColorScheme ? "#fff" : "#000",
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Inicio",
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused }) => (
            <House
              className={titleColor}
              size={focused ? 28 : 23}
              strokeWidth={focused ? 2.5 : 1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="business"
        options={{
          title: "Negocios",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Store
              className={titleColor}
              size={focused ? 28 : 23}
              strokeWidth={focused ? 2.5 : 1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Mis Reservas",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CalendarDays
              className={titleColor}
              size={focused ? 28 : 23}
              strokeWidth={focused ? 2.5 : 1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites/index"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ focused }) => (
            <Heart
              className={titleColor}
              size={focused ? 28 : 23}
              strokeWidth={focused ? 2.5 : 1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CircleUserRound
              className={titleColor}
              size={focused ? 28 : 23}
              strokeWidth={focused ? 2.5 : 1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notificaciones",
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="invitation/index"
        options={{
          title: "Invitaciones",
          href: null,
        }}
      />
    </Tabs>
  );
}
