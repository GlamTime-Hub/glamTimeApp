import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const ProfileLoading = () => {
  return (
    <View className="flex flex-1 p-6 gap-2 items-center">
      <Skeleton className="h-36 w-36 rounded-full" />
      <Skeleton className="h-8 w-20 " />
      <Skeleton className="h-32 w-full my-4 " />
      <Skeleton className="h-40 w-full my-4 " />
      <Skeleton className="h-40 w-full my-4 " />
    </View>
  );
};
