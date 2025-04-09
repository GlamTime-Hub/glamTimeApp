import { View } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Text } from "@/presentation/components/ui/text";
import { useLocalSearchParams } from "expo-router";

import {
  CalendarDays,
  Heart,
  MessageCircleMore,
  Star,
  ThumbsUp,
} from "@/lib/icons/Icons";
import { BusinessProfessionalTab } from "./BusinessProfessionalTabs";
import { useEffect } from "react";
import { professionals } from "@/BD/professional.constant";
import { groupedByCategory } from "@/BD/service.constant";
import { useBusinessBookingStore } from "@/presentation/store/use-business-booking.store";

export const BusinessProfessionalDetail = () => {
  const { id, businessId } = useLocalSearchParams();

  const { professional, addProfessional } = useBusinessBookingStore();

  useEffect(() => {
    const professionalSelected = professionals.find(
      (professional) => professional.id === id
    );

    addProfessional(professionalSelected);
  }, []);

  if (!professional) return <Text>Searching...</Text>;

  return (
    <View className="my-4 px-5 flex-1">
      <View className="flex  flex-row justify-center">
        <Avatar alt="Imagen de profesional" size="xl">
          <AvatarImage
            source={{
              uri: professional.urlPhoto,
            }}
          ></AvatarImage>
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
      </View>
      <Text className="text-center text-2xl font-bold">
        {professional.name}
      </Text>
      <Text className="text-center text-lg ">{professional.businessName}</Text>

      <View className="flex  mx-5 flex-row my-5 gap-6 justify-center py-2 rounded-lg">
        <View className="flex flex-row gap-1">
          <Text className="text-xl ">{professional.likes}</Text>
          <ThumbsUp size={25} className="text-foreground" />
        </View>
        <View className="flex  flex-row gap-1">
          <Text className="text-xl ">{professional.completedReservations}</Text>
          <CalendarDays size={25} className="text-foreground" />
        </View>

        <View className="flex  flex-row gap-1">
          <Text className="text-xl ">{professional.receivedComments}</Text>
          <MessageCircleMore size={25} className="text-foreground" />
        </View>

        <View className="flex flex-row items-center gap-1">
          <Text className="font-bold text-lg">{professional.rating}</Text>
          <Star color="#FFD700" size={25} fill={"gold"} />
        </View>
      </View>

      <BusinessProfessionalTab services={groupedByCategory} />
    </View>
  );
};
