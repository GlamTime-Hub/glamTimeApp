import {
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card } from "@/presentation/components/ui/card";
import {
  Star,
  ThumbsUp,
  MessageCircleMore,
  CalendarDays,
} from "@/lib/icons/Icons";
import { Text } from "@/presentation/components/ui/text";
import { router } from "expo-router";

interface Props {
  business: {
    id: string;
    name: string;
    imageUrl: string;
    rating: number;
    likes: number;
    receivedReviews: number;
    totalBooking: number;
    address: string;
  };
}

const BusinessCard = ({ business }: Props) => {
  return (
    <Card className="my-2">
      <TouchableOpacity
        className="w-full h-[300px] rounded-lg"
        onPress={() =>
          router.push({
            pathname: "/glam/(tabs)/business/detail/home/[id]",
            params: { id: business.id },
          })
        }
      >
        <ImageBackground
          className="rounded-lg"
          source={{ uri: business.imageUrl }}
          style={styles.image}
        >
          <View
            className="flex flex-row justify-between items-center"
            style={styles.overlay}
          >
            <View>
              <Text className={"text-white font-baloo-bold text-xl"}>
                {business.name}
              </Text>
              <Text className={"text-white py-0 my-0 font-baloo-bold text-sm"}>
                {business.address}
              </Text>
              <View className="flex flex-row gap-4">
                <View className="flex flex-row justify-center items-center gap-1">
                  <Text className={"text-white text-xl mt-2"}>
                    {business.rating}
                  </Text>
                  <Star color="#FFD700" size={15} fill={"gold"} />
                </View>
                <View className="flex flex-row justify-center items-center gap-1">
                  <Text className={"text-white text-xl mt-2"}>
                    {business.totalBooking}
                  </Text>
                  <CalendarDays className="color-white" size={15} />
                </View>

                <View className="flex flex-row items-center gap-1">
                  <Text className={"text-white mt-2 text-xl"}>
                    {business.likes}
                  </Text>
                  <ThumbsUp size={16} className="color-white" />
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text className={"text-white mt-2 text-xl"}>
                    {business.receivedReviews}
                  </Text>
                  <MessageCircleMore size={16} className="color-white" />
                </View>
              </View>
            </View>
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
    borderRadius: 4,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
});

export default BusinessCard;
