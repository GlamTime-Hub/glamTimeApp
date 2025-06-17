import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const BusinessFavoriteLoadingCard = () => {
  return (
    <View>
      <Skeleton className="h-80 my-2" />
      <Skeleton className="h-80 my-2" />
      <Skeleton className="h-80 my-2" />
    </View>
  );
};
