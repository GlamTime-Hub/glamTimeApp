import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const MyScheduleLoading = () => {
  return (
    <View className="flex-1 p-6">
      <Skeleton className="h-8" />
      <Skeleton className="h-36 my-2" />
      <Skeleton className="h-36 my-2" />
      <Skeleton className="h-36 my-2" />
      <Skeleton className="h-36 my-2" />
      <Skeleton className="h-36 my-2" />
      <Skeleton className="h-36 my-2" />
      <Skeleton className="h-18" />
    </View>
  );
};
