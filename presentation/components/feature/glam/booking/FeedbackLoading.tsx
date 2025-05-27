import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const FeedbackLoading = () => {
  return (
    <View className="flex-1 justify-between p-4">
      <Skeleton className="h-[400px]" />
      <Skeleton className="h-14" />
    </View>
  );
};
