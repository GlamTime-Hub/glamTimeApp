import {
  CalendarDays,
  Heart,
  MapPinned,
  MessageCircleMore,
  Star,
  ThumbsUp,
} from "@/lib/icons/Icons";
import Share from "@/lib/icons/Share";
import { WhatsAppIcon } from "@/lib/icons/WhatsApp";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/util";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { router, useLocalSearchParams } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BusinessTab } from "./BussinessTab";
import { useBusinessBookingStore } from "@/presentation/store/use-business-booking.store";
import { useEffect } from "react";
import { groupedByCategory } from "@/BD/service.constant";
import { professionals } from "@/BD/professional.constant";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 100,
  },
});

export const BusinessDetail = () => {
  const { id } = useLocalSearchParams();

  const { isDarkColorScheme } = useColorScheme();

  const { addProfessional, addService } = useBusinessBookingStore();

  useEffect(() => {
    addProfessional(null);
    addService(null);
  }, []);

  return (
    <View className="flex-1">
      <View className="w-full h-[200px]">
        <ImageBackground
          resizeMode="cover"
          className="relative"
          source={{
            uri: "https://images.pexels.com/photos/31323301/pexels-photo-31323301/free-photo-of-diseno-interior-de-peluqueria-moderna-y-elegante.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            scale: 0.2,
          }}
          style={styles.image}
        >
          <View className="absolute flex  gap-4 right-6 bottom-4">
            <TouchableOpacity className="flex justify-between flex-row items-center gap-1">
              <Text
                className={cn(
                  " py-1 px-2 text-sm rounded-lg",
                  isDarkColorScheme
                    ? "bg-white text-black"
                    : "bg-black text-white"
                )}
              >
                Mensaje
              </Text>

              <WhatsAppIcon size={30} />
            </TouchableOpacity>
            <TouchableOpacity className="flex justify-between flex-row items-center gap-1">
              <Text
                className={cn(
                  " py-1 px-2 text-sm rounded-lg",
                  isDarkColorScheme
                    ? "bg-white text-black"
                    : "bg-black text-white"
                )}
              >
                Compartir
              </Text>
              <Share size={30} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View className="flex-1 mb-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row items-center justify-between  px-5 py-4">
            <Text className="text-2xl font-bold">Peluquería Luxury</Text>
            <View className="flex flex-row items-center gap-1">
              <Text className="font-bold text-lg">{4.5}</Text>
              <Star color="#FFD700" size={25} fill={"gold"} />
            </View>
          </View>
          <View className="flex flex-row justify-between items-center px-5">
            <View>
              <Text className="text-md">Calle 54 # 36-e95</Text>
              <Text className="text-md">Primero de mayo</Text>
              <Text className="text-md">Barrancabermeja</Text>
            </View>
            <TouchableOpacity className="flex flex-row items-center gap-1">
              <Text
                className={cn(
                  " py-1 px-2 text-sm rounded-lg",
                  isDarkColorScheme
                    ? "bg-white text-black"
                    : "bg-black text-white"
                )}
              >
                Ver ubicación
              </Text>
              <MapPinned size={25} className="text-foreground" />
            </TouchableOpacity>
          </View>
          <View className="flex mx-5 flex-row my-2 gap-6 justify-center py-2 rounded-lg">
            <View className="flex flex-row items-center gap-1">
              <Text className="text-lg ">180</Text>
              <ThumbsUp size={18} className="text-foreground" />
            </View>
            <View className="flex  flex-row gap-1 items-center">
              <Text className="text-lg ">200</Text>
              <CalendarDays size={20} className="text-foreground" />
            </View>

            <View className="flex  flex-row gap-1 items-center">
              <Text className="text-lg ">5000</Text>
              <MessageCircleMore size={20} className="text-foreground" />
            </View>
          </View>

          <View className="px-5 my-2">
            <Button
              variant={"outline"}
              onPress={() =>
                router.push({
                  pathname: "/glam/(tabs)/business/detail/comments/[id]",
                  params: { id: "12" },
                })
              }
            >
              <Text>Ver Comentarios</Text>
            </Button>
          </View>
          <View className="px-5">
            <BusinessTab
              services={groupedByCategory}
              professionals={professionals}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
