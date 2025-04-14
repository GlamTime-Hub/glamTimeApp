import { TouchableOpacity, View } from "react-native";
import { Bell } from "@/lib/icons/Icons";
import { router } from "expo-router";
import { useTotalUserNotifications } from "@/presentation/hooks/user-total-notification.hook";
import { Skeleton } from "@/presentation/components/ui/skeleton";
import { Text } from "@/presentation/components/ui/text";

export const NotificationIcon = () => {
  const { total, isLoading, session } = useTotalUserNotifications();

  if (!session) return null;

  if (isLoading) {
    return <Skeleton className="h-6 w-6 rounded-full" />;
  }

  return (
    <TouchableOpacity
      className="relative"
      onPress={() => router.push("/glam/(tabs)/notifications")}
    >
      <Bell className="text-foreground" strokeWidth={1.25} />
      {total > 0 && (
        <View className="absolute flex items-center justify-center bg-primary h-5 w-5 rounded-full animate-bounce -top-1 -right-1">
          <Text className="text-white text-center absolute">{total}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
