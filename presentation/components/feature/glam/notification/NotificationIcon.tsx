import { TouchableOpacity, View } from "react-native";
import { Bell } from "@/lib/icons/Icons";
import { router } from "expo-router";
import { useTotalUserNotifications } from "@/presentation/hooks/user-total-notification.hook";
import { Skeleton } from "@/presentation/components/ui/skeleton";
import { Text } from "@/presentation/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";

export const NotificationIcon = () => {
  const { total, isLoading } = useTotalUserNotifications();
  const { titleColor, backgroundColors } = useColorScheme();

  if (isLoading) {
    return <Skeleton className="h-6 w-6 rounded-full" />;
  }

  return (
    <TouchableOpacity
      className="relative h-12 w-10 items-center justify-center "
      onPress={() => router.navigate("/glam/(tabs)/notifications/home")}
    >
      <View>
        <Bell className={titleColor} strokeWidth={2} />
        {total > 0 && (
          <View
            className={`absolute flex items-center justify-center ${backgroundColors}  h-5 w-5 rounded-full animate-bounce -top-1 -right-1`}
          >
            <Text className={` text-white text-center absolute`}>{total}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
