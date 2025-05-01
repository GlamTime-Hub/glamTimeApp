import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const BusinessProfessionalTabLoading = () => {
  return (
    <View className="flex-1 ">
      <View className="relative">
        <Skeleton className="h-20 my-2" />
        <Skeleton className="h-14 w-14 top-3 left-5 absolute rounded-full my-2" />
      </View>
    </View>
  );
};
