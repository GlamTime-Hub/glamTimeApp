import { Image, TouchableOpacity, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import {
  ThumbsUp,
  Star,
  MessageCircleMore,
  SquarePen,
  Image as ImageIcon,
} from "@/lib/icons/Icons";
import { router } from "expo-router";
import { Business } from "@/core/interfaces/business.interface";

interface Props {
  business: Business;
}

export const MyBusinessCard = ({ business }: Props) => {
  const onSelectBusiness = () => {
    router.push({
      pathname: "/glam/(tabs)/profile/my-business/detail/[id]",
      params: { id: business.id },
    });
  };

  return (
    <TouchableOpacity onPress={onSelectBusiness}>
      <Card className="my-2">
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
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  padding: 10,
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
            <View className="py-4 px-4 ">
              <Text className="font-bold text-lg" numberOfLines={2}>
                {business.name}
              </Text>
              <Text className="text-sm">{business.location.address}</Text>
              <View className="flex flex-row mt-2 gap-4">
                <View className="flex flex-row items-center gap-1 ">
                  <Text className="text-lg">{business.likes}</Text>
                  <ThumbsUp size={18} />
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text className="text-lg">{business.rating}</Text>
                  <Star color="#FFD700" size={18} fill={"gold"} />
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text className="text-lg">{business.receivedReviews}</Text>
                  <MessageCircleMore size={18} className="text-foreground" />
                </View>
              </View>
            </View>
            <View className="absolute top-4 right-5 ">
              <SquarePen size={20} className="text-foreground" />
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
