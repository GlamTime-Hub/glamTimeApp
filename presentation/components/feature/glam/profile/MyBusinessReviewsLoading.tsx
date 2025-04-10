import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const MyBusinessReviewsLoading = () => {
  return (
    <View className="flex-1 p-6">
      <Skeleton className="h-20 my-4" />
      <Skeleton className="h-20 my-4" />
      <Skeleton className="h-20 my-4" />
      <Skeleton className="h-20 my-4" />
      <Skeleton className="h-20 my-4" />
      <Skeleton className="h-20 my-4" />
    </View>
  );
};
