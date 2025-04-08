import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const MyBusinessLoading = () => {
  return (
    <View className="flex-1 p-6">
      <View className="flex flex-row justify-between">
        <Skeleton className="h-10 w-16" />
        <Skeleton className="h-10 w-16" />
      </View>
      <View className="mt-4">
        <Skeleton className="h-40 w-full my-2" />
        <Skeleton className="h-40 w-full my-2" />
        <Skeleton className="h-40 w-full my-2" />
        <Skeleton className="h-40 w-full my-2" />
        <Skeleton className="h-40 w-full my-2" />
      </View>
    </View>
  );
};
