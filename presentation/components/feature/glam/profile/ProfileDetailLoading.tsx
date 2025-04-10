import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const ProfileDetailLoading = () => {
  return (
    <View className="flex-1 flex-col justify-between  p-6">
      <View>
        <Skeleton className="h-10" />
        <Skeleton className="h-[400px] my-2" />
      </View>
      <Skeleton className="h-10" />
    </View>
  );
};
