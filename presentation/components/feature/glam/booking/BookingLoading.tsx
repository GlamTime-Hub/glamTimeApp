import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const BookingLoading = () => {
  return (
    <View className="flex-1 flex gap-2 p-4">
      <Skeleton className="h-44" />
      <Skeleton className="h-44" />
      <Skeleton className="h-44" />
    </View>
  );
};
