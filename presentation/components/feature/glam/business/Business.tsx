import BusinessCard from "./BusinessCard";
import { ScrollView, View } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { BusinessOrder } from "./BusinessOrder";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/lib/util";

export const Business = () => {
  return (
    <View className="mt-10 mb-5 flex-1">
      <View className="px-10 ">
        <Text className="text-center">
          Te mostramos negocios según tu ubicación.
        </Text>
        <Text className="text-center">
          ¡Pero tú tienes el control! Usa los filtros y encuentra justo lo que
          buscas.
        </Text>
      </View>

      <View className="mt-4 flex flex-row items-center justify-between">
        <View className={cn("px-4", `w-[250px]`)}>
          <Input placeholder="Filtrar por nombre o ubicación" />
        </View>

        <BusinessOrder />
      </View>
      <View className="flex-1">
        <ScrollView
          className="px-4 mt-4 h-full "
          showsVerticalScrollIndicator={false}
        >
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
              liked: false,
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
        </ScrollView>
      </View>
    </View>
  );
};
