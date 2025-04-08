import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const MyBusinessMyProfessionalsLoading = () => {
  return (
    <View className="p-6">
      <View className="flex my-2 flex-row justify-between">
        <Skeleton className="h-12 w-28" />
        <Skeleton className="h-12 w-28" />
      </View>

      <Skeleton className="h-32 my-2 w-full" />
      <Skeleton className="h-32 my-2 w-full" />
      <Skeleton className="h-32 my-2 w-full" />
      <Skeleton className="h-32 my-2 w-full" />
    </View>
  );
};
