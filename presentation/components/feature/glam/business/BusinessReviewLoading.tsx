import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const BusinessReviewLoading = () => {
  return (
    <View className="flex-1 p-4">
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
