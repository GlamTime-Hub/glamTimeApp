import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const MyScheduleBusinessLoading = () => {
  return (
    <View className="p-4 flex gap-2">
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
    </View>
  );
};
