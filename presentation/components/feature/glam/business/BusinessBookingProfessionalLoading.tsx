import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const BusinessBookingProfessionalLoading = () => {
  return (
    <View className="flex-1 p-4 gap-2">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </View>
  );
};
