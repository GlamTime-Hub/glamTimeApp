import { View } from "react-native";
import BusinessCard from "../business/BusinessCard";

export const FavoritesBusinessTab = () => {
  return (
    <View>
      <BusinessCard
        business={{
          name: "Peluquería Luxury",
          imageUrl:
            "https://images.pexels.com/photos/31323301/pexels-photo-31323301/free-photo-of-diseno-interior-de-peluqueria-moderna-y-elegante.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          rating: 5,
          liked: true,
          likes: 120,
        }}
      />
      <BusinessCard
        business={{
          name: "Spa y Masajes",
          imageUrl:
            "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          rating: 5,
          liked: true,
          likes: 120,
        }}
      />
      <BusinessCard
        business={{
          name: "Belleza y algo más",
          imageUrl:
            "https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          rating: 5,
          liked: true,
          likes: 120,
        }}
      />
    </View>
  );
};
