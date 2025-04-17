import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const BusinessContentLoading = () => {
  return (
    <View className="p-4">
      <Skeleton className="h-8" />
      <View className="flex my-2 flex-row justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </View>
      <Skeleton className="h-72  my-2" />
      <Skeleton className="h-72  my-2" />
      <Skeleton className="h-72  my-2" />
    </View>
  );
};
