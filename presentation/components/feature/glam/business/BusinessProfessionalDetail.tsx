import { View, ScrollView } from "react-native";
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
import { useColorScheme } from "@/lib/useColorScheme";

export const BusinessProfessionalDetail = () => {
  const { id, professional, isLoading } = useProfessionalDetail();
  const { titleColor, colorIcons } = useColorScheme();

  if (isLoading) return <Text>Searching...</Text>;

  return (
    <View className="my-4 px-5 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <Text
          className={`text-center text-2xl my-2 font-baloo-bold ${titleColor}`}
        >
          {professional?.user.name}
        </Text>
        <View className="flex  mx-5 flex-row mb-2 gap-6 justify-center  rounded-lg">
          <View className="flex-row gap-1 items-center">
            <Text className={`text-2xl mt-2 ${titleColor}`}>
              {professional?.likes}
            </Text>
            <ThumbsUp size={25} className={colorIcons} />
          </View>
          <View className="flex-row gap-1  items-center">
            <Text className={`text-2xl mt-2 ${titleColor}`}>
              {professional?.totalBooking}
            </Text>
            <CalendarDays size={25} className={colorIcons} />
          </View>

          <View className="flex-row gap-1 items-center">
            <Text className={`text-2xl mt-2 ${titleColor}`}>
              {professional?.receivedReviews}
            </Text>
            <MessageCircleMore size={25} className={colorIcons} />
          </View>

          <View className="flex-row items-center gap-1">
            <Text className="font-baloo-bold mt-2 text-2xl">
              {professional?.rating}
            </Text>
            <Star color="#FFD700" size={25} fill={"gold"} />
          </View>
        </View>

        <BusinessProfessionalTab
          id={id as string}
          businessId={professional?.businessId!}
          businessType=""
        />
      </ScrollView>
    </View>
  );
};
