import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Tabs } from "expo-router";
import { CalendarDays, House, User, Heart, Store } from "@/lib/icons/Icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/util";

export default function _layout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={{
        headerRight: () => <ThemeToggle />,
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: isDarkColorScheme ? "#FFF" : "transparent",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 25,
          height: 60,
          marginHorizontal: 10,
          display: "flex",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: isDarkColorScheme ? "#FFF" : "transparent",
        },
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
              size={focused ? 30 : 23}
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
          title: "Reservas",
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
        name="profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <User
              className="text-foreground"
              size={focused ? 30 : 23}
              strokeWidth={focused ? 3 : 1.25}
            />
          ),
        }}
      />
    </Tabs>
  );
}
