import { View } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Text } from "@/presentation/components/ui/text";
import { Star } from "@/lib/icons/Icons";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { useColorScheme } from "@/lib/useColorScheme";

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
  const { titleColor } = useColorScheme();

  return (
    <Card className="my-2 flex-1">
      <CardContent className="px-4 py-0 flex-1">
        <View className="flex flex-1 w-full flex-row justify-between  gap-2 my-4 ">
          <Avatar alt="Imagen de profesional">
            <AvatarImage
              source={{
                uri: userUrlPhoto,
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
          <View className="relative  flex-1 ">
            <Text className={`font-baloo-bold ${titleColor}`}>{userName}</Text>
            <Text
              className="text-sm text-muted-foreground italic"
              numberOfLines={3}
            >
              "{comment}"
            </Text>
            <View className="flex-1 items-center flex-row gap-1 absolute top-0 right-0">
              <Text>{rating}</Text>
              <Star color="#FFD700" size={18} fill={"gold"} />
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
