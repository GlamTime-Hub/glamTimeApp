import { useState } from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card } from "@/presentation/components/ui/card";
import { Heart, Star, ThumbsUp } from "@/lib/icons/Icons";
import { Text } from "@/presentation/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { router } from "expo-router";

interface Props {
  business: {
    name: string;
    imageUrl: string;
    rating: number;
    liked: boolean;
    likes?: number;
  };
}

const BusinessCard = ({ business }: Props) => {
  const [liked, setLiked] = useState(business.liked);

  const toggleLike = () => setLiked(!liked);

  const { isDarkColorScheme } = useColorScheme();

  return (
    <Card className="my-2">
      <TouchableOpacity
        className="w-full h-[300px] rounded-lg"
        onPress={() =>
          router.push({
            pathname: "/glam/(tabs)/business/detail/home/[id]",
            params: { id: 1 },
          })
        }
      >
        <ImageBackground
          source={{ uri: business.imageUrl }}
          style={styles.image}
        >
          <View
            className="flex flex-row justify-between items-center"
            style={styles.overlay}
          >
            <View>
              <Text className={"text-white text-xl"}>{business.name}</Text>
              <View className="flex flex-row gap-2">
                <View className="flex flex-row items-center gap-1">
                  <Text className={"text-white"}>
                    {business.rating.toFixed(1)}
                  </Text>
                  <Star color="#FFD700" size={18} fill={"gold"} />
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text className={"text-white"}>{business.likes}</Text>
                  <ThumbsUp size={18} className="color-white" />
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={toggleLike}>
              <Heart
                color={liked ? "red" : "white"}
                fill={liked ? "red" : "transparent"}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 100,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
});

export default BusinessCard;
