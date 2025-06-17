import { Skeleton } from "@/presentation/components/ui/skeleton";
import { View } from "react-native";

export const ProfessionalFavoriteLoadingCard = () => {
  return (
    <View>
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
      <Skeleton className="h-20 my-2" />
    </View>
  );
};
