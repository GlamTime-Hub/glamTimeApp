import { Image, TouchableOpacity, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import {
  Heart,
  Star,
  MessageCircleMore,
  SquarePen,
  Image as ImageIcon,
} from "@/lib/icons/Icons";
import { router } from "expo-router";
import { Business } from "@/core/interfaces/business.interface";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  business: Business;
  fromProfessional?: boolean;
}

export const MyBusinessCard = ({
  business,
  fromProfessional = false,
}: Props) => {
  const { isDarkColorScheme, colorIcons, titleColor } = useColorScheme();

  const onSelectBusiness = () => {
    if (fromProfessional) {
      router.push({
        pathname: "/glam/(tabs)/profile/my-services/my-service/[businessId]",
        params: {
          businessId: business.id,
          businessType: business.businesstype,
        },
      });
      return;
    }

    router.push({
      pathname: "/glam/(tabs)/profile/my-business/detail/[id]",
      params: { id: business.id },
    });
  };

  return (
    <TouchableOpacity onPress={onSelectBusiness}>
      <Card
        className={`my-2 ${
          business.isActive
            ? ""
            : `${isDarkColorScheme ? "bg-red-500" : "bg-red-200"}`
        }`}
      >
        <CardContent className="p-0 flex flex-row">
          {business.urlPhoto ? (
            <View className="flex w-32 justify-center items-center">
              <Image
                source={{
                  uri: business.urlPhoto,
                }}
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: "flex-end",
                }}
              />
            </View>
          ) : (
            <View className="flex w-32 justify-center ">
              <ImageIcon
                className="text-foreground"
                size={120}
                strokeWidth={0.5}
              />
            </View>
          )}

          <View className="flex flex-row justify-between relative flex-1">
            <View className="py-4 px-2 ">
              <Text className="font-baloo-bold text-lg" numberOfLines={2}>
                {business.name}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {business.location.address}
              </Text>
              <View className="flex flex-row mt-2 gap-4">
                <View className="flex flex-row items-center gap-1 ">
                  <Text className={`text-lg ${titleColor}`}>
                    {business.likes}
                  </Text>
                  <Heart className={colorIcons} size={18} />
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text className={`text-lg ${titleColor}`}>
                    {business.receivedReviews}
                  </Text>
                  <MessageCircleMore size={18} className={colorIcons} />
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text className={`text-lg ${titleColor}`}>
                    {business.rating}
                  </Text>
                  <Star color="#FFD700" size={18} fill={"gold"} />
                </View>
              </View>
            </View>
            <View className="absolute top-4 right-2 ">
              <SquarePen size={20} className={colorIcons} />
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
