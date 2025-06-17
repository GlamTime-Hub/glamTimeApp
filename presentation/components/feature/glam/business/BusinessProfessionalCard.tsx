import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Text } from "@/presentation/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import { MessageCircleMore, Star, Heart, NotebookPen } from "@/lib/icons/Icons";
import { Professional } from "@/core/interfaces/professional.interface";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  professional: Professional;
  callback: (id: string) => void;
}

export const BusinessProfessionalCard = ({ professional, callback }: Props) => {
  const { titleColor, colorIcons } = useColorScheme();

  const onSelectProfessional = () => {
    callback(professional.id);
  };

  return (
    <TouchableOpacity className="my-2" onPress={onSelectProfessional}>
      <Card>
        <CardContent className="py-0 px-2">
          <View className="py-4 flex flex-row justify-between items-center ">
            <View className="flex flex-row gap-2 items-center">
              <Avatar alt="Imagen de profesional">
                <AvatarImage
                  source={{
                    uri: professional.user.urlPhoto,
                  }}
                ></AvatarImage>
                <AvatarFallback>
                  <Text>ZN</Text>
                </AvatarFallback>
              </Avatar>
              <View>
                <Text className={`text-xl font-baloo-bold ${titleColor} `}>
                  {professional.user.name}
                </Text>

                <View className="flex flex-row gap-4">
                  <View className="flex flex-row gap-1 items-center">
                    <Text className={`text-2xl mt-2 ${titleColor}`}>
                      {professional.likes}
                    </Text>
                    <Heart size={20} className={colorIcons} />
                  </View>

                  <View className="flex flex-row  gap-1 items-center">
                    <Text className={`text-2xl mt-2 ${titleColor}`}>
                      {professional.totalBooking}
                    </Text>
                    <NotebookPen size={20} className={colorIcons} />
                  </View>

                  <View className="flex flex-row gap-1 items-center">
                    <Text className={`text-2xl mt-2 ${titleColor}`}>
                      {professional.receivedReviews}
                    </Text>
                    <MessageCircleMore size={20} className={colorIcons} />
                  </View>
                </View>
              </View>
            </View>
            <View className="flex flex-row items-center gap-1 pr-4">
              <Text className={"text-2xl mt-1 font-baloo-bold"}>
                {professional.rating}
              </Text>
              <Star color="#FFD700" size={25} fill={"gold"} />
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
