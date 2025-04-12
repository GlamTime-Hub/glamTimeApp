import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Tabs } from "expo-router";
import { CalendarDays, House, User, Heart, Store } from "@/lib/icons/Icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/util";
import { View } from "react-native";
import { NotificationIcon } from "@/presentation/components/feature";

export default function _layout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={{
        headerRight: () => (
          <View className="flex flex-row gap-2 justify-end px-0 relative -right-3">
            <NotificationIcon />
            <ThemeToggle />
          </View>
        ),
        headerTitleAlign: "center",
        tabBarShowLabel: false,

        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        },
        tabBarActiveTintColor: "inherit",
        tabBarInactiveTintColor: "inherit",
        tabBarActiveBackgroundColor: "inherit",
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Inicio",
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused }) => (
            <House
              className={cn("text-foreground")}
              strokeWidth={focused ? 3 : 1.25}
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
              className="text-foreground"
              size={focused ? 30 : 23}
              strokeWidth={focused ? 3 : 1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="booking/index"
        options={{
          title: "Mis Reservas",
          tabBarIcon: ({ focused }) => (
            <CalendarDays
              className="text-foreground"
              size={focused ? 30 : 23}
              strokeWidth={focused ? 3 : 1.25}
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
              className="text-foreground"
              size={focused ? 30 : 23}
              strokeWidth={focused ? 3 : 1.25}
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
            <User
              className="text-foreground"
              size={focused ? 30 : 23}
              strokeWidth={focused ? 3 : 1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          title: "Notificaciones",
          href: null,
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
