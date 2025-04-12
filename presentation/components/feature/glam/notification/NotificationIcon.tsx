import { Text, TouchableOpacity, View } from "react-native";
import { Bell } from "@/lib/icons/Icons";
import { router } from "expo-router";
import { useTotalUserNotifications } from "@/presentation/hooks/user-total-notification.hook";

export const NotificationIcon = () => {
  const { total } = useTotalUserNotifications();

  return (
    <TouchableOpacity
      className="relative"
      onPress={() => router.push("/glam/(tabs)/notifications")}
    >
      <Bell className="text-foreground" strokeWidth={1.25} />
      {total && total > 0 && (
        <View className="absolute bg-primary h-5 w-5 rounded-full animate-bounce -top-1 -right-1">
          <Text className="text-white text-center">{total}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
