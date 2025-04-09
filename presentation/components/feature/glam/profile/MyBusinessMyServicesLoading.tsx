import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const MyBusinessMyServicesLoading = () => {
  return (
    <View className="p-6">
      <Skeleton className="h-14 my-2 rounded-lg" />
      <Skeleton className="h-24 my-2 rounded-lg" />
      <Skeleton className="h-24 my-2 rounded-lg" />
      <Skeleton className="h-24 my-2 rounded-lg" />
      <Skeleton className="h-24 my-2 rounded-lg" />
      <Skeleton className="h-24 my-2 rounded-lg" />
    </View>
  );
};
