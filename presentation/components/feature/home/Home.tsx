import { useWindowDimensions, View } from "react-native";
import { Text } from "../../ui/text";
import { HomeBusinessCard } from "./HomeBusinessCard";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useRef } from "react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { AuthService } from "@/presentation/services/login.service";

export const Home = () => {
  const ref = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width;
  const data: any = [
    {
      id: 1,
      name: "Peluqueria",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Spa y Masajes para todos",
      rating: 5,
    },
    {
      id: 3,
      name: "Spa",
      rating: 5,
    },
    {
      id: 4,
      name: "Spa",
      rating: 5,
    },
    {
      id: 5,
      name: "Spa",
      rating: 5,
    },
  ];

  const LogOut = async () => {
    // Logica de logout
    await AuthService.logout();
  };

  return (
    <View className="px-4">
      <Text className="mt-4 mb-1 text-2xl font-baloo-bold">Destacados</Text>
      <Separator />
      <View className="h-[250px] w-full">
        <Carousel
          ref={ref}
          data={data}
          renderItem={({ item }) => (
            <HomeBusinessCard business={item} small={false} />
          )}
          width={200}
          height={350}
          style={{
            width: width,
            height: 350,
            justifyContent: "center",
            alignItems: "center",
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          defaultIndex={1}
        />
      </View>
      <Button className="mt-20" onPress={() => LogOut()}>
        <Text>Cerrar Sesion</Text>
      </Button>

      {/* <View className="mt-10">
        <FlatList
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HomeBusinessCard business={item} small={true} />
          )}
        />
      </View> */}
    </View>
  );
};
