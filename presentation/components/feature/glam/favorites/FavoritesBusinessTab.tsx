import { View } from "react-native";
import BusinessCard from "../business/BusinessCard";
import { useBusinessFavorites } from "@/presentation/hooks/use-business-favorites.hook";
import { BusinessFavoriteLoadingCard } from "../business/BusinessFavoriteLoadingCard";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const FavoritesBusinessTab = () => {
  const { business, isLoading } = useBusinessFavorites();

  if (isLoading) {
    return <BusinessFavoriteLoadingCard />;
  }

  if (business.length === 0) {
    return (
      <CustomAlert
        title="Info!!!"
        description="No tienes negocios favoritos."
        type="info"
      />
    );
  }

  return (
    <View>
      {business.map((item) => (
        <BusinessCard
          key={item.id}
          business={{
            id: item.id,
            name: item.name,
            imageUrl: item.urlPhoto,
            rating: item.rating,
            likes: item.likes,
            receivedReviews: item.receivedReviews,
            totalBooking: item.totalBooking,
            address: item.location.address,
          }}
        />
      ))}
    </View>
  );
};
