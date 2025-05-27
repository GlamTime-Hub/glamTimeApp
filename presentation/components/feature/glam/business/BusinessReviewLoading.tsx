import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const ReviewLoading = () => {
  return (
    <View className="flex-1">
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
    </View>
  );
};
