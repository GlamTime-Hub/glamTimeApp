import BusinessCard from "./BusinessCard";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ListFilter, ArrowDownWideNarrow } from "@/lib/icons/Icons";
import { Text } from "@/presentation/components/ui/text";
import { router } from "expo-router";

export const Business = () => {
  return (
    <View className="my-10 flex-1">
      <View className="px-10 ">
        <Text className="text-center">
          Te mostramos negocios según tu ubicación.
        </Text>
        <Text className="text-center">
          ¡Pero tú tienes el control! Usa los filtros y encuentra justo lo que
          buscas.
        </Text>
      </View>

      <View className="mt-4 flex flex-row justify-between">
        <TouchableOpacity
          className="flex flex-row px-4 items-center gap-2"
          onPress={() => router.push("/glam/business/filter")}
        >
          <ListFilter size={25} color={"#232427"} />
          <Text>Filtrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row px-4 items-center gap-2"
          onPress={() => console.log("")}
        >
          <ArrowDownWideNarrow size={25} color={"#232427"} />
          <Text>Ordenar</Text>
        </TouchableOpacity>
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
            }}
          />
          <BusinessCard
            business={{
              name: "Spa y Masajes",
              imageUrl:
                "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              rating: 5,
              liked: false,
            }}
          />
          <BusinessCard
            business={{
              name: "Belleza y algo más",
              imageUrl:
                "https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              rating: 5,
              liked: true,
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};
