import { View } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Text } from "@/presentation/components/ui/text";
import StarRating from "react-native-star-rating-widget";

interface Props {
  userName: string;
  comment: string;
  userUrlPhoto: string;

  rating: number;
}

export const BusinessProfessionalCommentCard = ({
  userName,
  comment,
  userUrlPhoto,
  rating,
}: Props) => {
  return (
    <View className="flex w-full flex-row items-center my-4 ">
      <Avatar alt="Imagen de profesional" size="sm">
        <AvatarImage
          source={{
            uri: userUrlPhoto,
          }}
        ></AvatarImage>
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
      <View className="pl-2 pr-6">
        <View className="flex flex-row justify-between">
          <Text className="text-md font-bold">{userName}</Text>
          <View className="mr-2">
            <StarRating
              starSize={20}
              emptyColor="#e0e0e0"
              rating={rating}
              starStyle={{ marginHorizontal: 0 }}
              onChange={() => null}
            />
          </View>
        </View>
        <Text className="text-sm text-wrap pr-4 italic">"{comment}"</Text>
      </View>
    </View>
  );
};
