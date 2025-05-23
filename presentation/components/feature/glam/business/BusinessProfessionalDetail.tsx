import { View } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Text } from "@/presentation/components/ui/text";
import {
  CalendarDays,
  MessageCircleMore,
  Star,
  ThumbsUp,
} from "@/lib/icons/Icons";
import { BusinessProfessionalTab } from "./BusinessProfessionalTabs";
import { useProfessionalDetail } from "@/presentation/hooks";

export const BusinessProfessionalDetail = () => {
  const { professional, isLoading } = useProfessionalDetail();

  if (isLoading) return <Text>Searching...</Text>;

  return (
    <View className="my-4 px-5 flex-1">
      <View className="flex  flex-row justify-center">
        <Avatar alt="Imagen de profesional" size="xl">
          <AvatarImage
            source={{
              uri: professional?.user.urlPhoto,
            }}
          ></AvatarImage>
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
      </View>
      <Text className="text-center text-2xl font-bold">
        {professional?.user.name}
      </Text>
      <Text className="text-center text-lg ">{"professional"}</Text>

      <View className="flex  mx-5 flex-row my-5 gap-6 justify-center py-2 rounded-lg">
        <View className="flex flex-row gap-1">
          <Text className="text-xl ">{professional?.likes}</Text>
          <ThumbsUp size={25} className="text-foreground" />
        </View>
        <View className="flex  flex-row gap-1">
          <Text className="text-xl ">{professional?.totalBooking}</Text>
          <CalendarDays size={25} className="text-foreground" />
        </View>

        <View className="flex  flex-row gap-1">
          <Text className="text-xl ">{professional?.receivedReviews}</Text>
          <MessageCircleMore size={25} className="text-foreground" />
        </View>

        <View className="flex flex-row items-center gap-1">
          <Text className="font-bold text-lg">{professional?.rating}</Text>
          <Star color="#FFD700" size={25} fill={"gold"} />
        </View>
      </View>

      {/* <BusinessProfessionalTab services={groupedByCategory} /> */}
    </View>
  );
};
