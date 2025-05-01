import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const BusinessDetailLoading = () => {
  return (
    <View className="flex-1">
      <View className="relative">
        <Skeleton className="h-60" />
        <Skeleton className="absolute bottom-0 right-4 mb-4 h-12 w-12 rounded-full" />
        <Skeleton className="absolute bottom-20 right-4 h-12 w-12 rounded-full" />
      </View>

      <Skeleton className="my-2 h-52 mx-4" />
      <Skeleton className="my-2 h-12 mx-4" />
      <Skeleton className="my-2 h-52 mx-4" />
    </View>
  );
};
