import { View } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Text } from "@/presentation/components/ui/text";
import { Star } from "@/lib/icons/Icons";
import { Separator } from "@rn-primitives/select";
import { Card, CardContent } from "@/presentation/components/ui/card";

interface Props {
  userName: string;
  comment: string;
  userUrlPhoto: string;

  rating: number;
}

export const ReviewCard = ({
  userName,
  comment,
  userUrlPhoto,
  rating,
}: Props) => {
  return (
    <Card className="my-2">
      <CardContent className="px-4 py-0">
        <View className="flex flex-1 w-full flex-row justify-between items-center gap-2 my-4 ">
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
          <View className="w-full">
            <View className="flex flex-row relative ">
              <Text className="font-baloo-bold">{userName}</Text>
              <View className="flex flex-row gap-2 absolute right-10">
                <Text>{rating}</Text>
                <Star color="#FFD700" size={18} fill={"gold"} />
              </View>

              {/*  <StarRating
            starSize={20}
            emptyColor="#e0e0e0"
            rating={rating}
            starStyle={{ marginHorizontal: 0 }}
            onChange={() => null}
          /> */}
            </View>
            <View className="w-[250px]">
              <Text className="text-sm  italic" numberOfLines={2}>
                "{comment}"
              </Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
