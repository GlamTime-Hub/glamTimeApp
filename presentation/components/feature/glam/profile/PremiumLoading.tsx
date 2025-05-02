import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const PremiumLoading = () => {
  return (
    <View className="flex-1 p-4">
      <Skeleton className="h-12" />
    </View>
  );
};
