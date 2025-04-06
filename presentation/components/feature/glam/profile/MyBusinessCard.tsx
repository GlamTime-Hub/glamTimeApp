import { Image, TouchableOpacity, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { Heart, Star, MessageCircleMore, SquarePen } from "@/lib/icons/Icons";
import { Button } from "@/presentation/components/ui/button";
import { router } from "expo-router";

export const MyBusinessCard = () => {
  const onSelectBusiness = () => {
    router.push("/glam/(tabs)/profile/my-business/detail");
  };

  return (
    <TouchableOpacity onPress={onSelectBusiness}>
      <Card className="my-2">
        <CardContent className="p-0 flex flex-row">
          <Image
            source={{
              uri: "https://images.pexels.com/photos/31323301/pexels-photo-31323301/free-photo-of-diseno-interior-de-peluqueria-moderna-y-elegante.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            style={{
              width: 150,
              height: 100,
              justifyContent: "flex-end",
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          />
          <View className="flex flex-row justify-between relative">
            <View className="py-4 px-6">
              <Text className="font-bold text-lg">Peluquería Luxury</Text>
              <Text className="text-sm">Calle 123, Ciudad</Text>
              <View className="flex flex-row mt-2 gap-2">
                <View className="flex flex-row items-center gap-1 ">
                  <Text>150</Text>
                  <Heart color="red" size={18} fill={"red"} />
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text>4.5</Text>
                  <Star color="#FFD700" size={18} fill={"gold"} />
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text>120</Text>
                  <MessageCircleMore size={18} className="text-foreground" />
                </View>
              </View>
            </View>
            <View className="absolute top-4 -right-20">
              <Button variant={"ghost"} size={"icon"}>
                <SquarePen size={20} className="text-foreground" />
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
