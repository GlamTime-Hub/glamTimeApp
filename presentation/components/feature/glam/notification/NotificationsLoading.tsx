import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const NotificationsLoading = () => {
  return (
    <View className="p-6">
      <Skeleton className="h-28" />
      <Skeleton className="h-28 my-2" />
      <Skeleton className="h-28 my-2" />
      <Skeleton className="h-28 my-2" />
    </View>
  );
};
