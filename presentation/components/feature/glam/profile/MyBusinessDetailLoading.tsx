import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const MyBusinessDetailLoading = () => {
  return (
    <View className="flex flex-col flex-1 p-6 gap-4 items-center ">
      <Skeleton className="h-32 w-32 rounded-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-24 w-full" />
    </View>
  );
};
