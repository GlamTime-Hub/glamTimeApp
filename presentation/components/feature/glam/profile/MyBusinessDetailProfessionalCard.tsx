import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { View } from "react-native";

export const MyBusinessDetailProfessionalCard = () => {
  return (
    <Card className="my-2">
      <CardContent className="p-4 flex flex-row justify-between  items-center">
        <Avatar alt="">
          <AvatarImage
            source={{
              uri: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
          ></AvatarImage>
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
        <View className="px-4">
          <Text className="font-bold text-lg">Juan Ceballos</Text>
          <Text className="text-sm">juanCeballos@gmail.com</Text>
          <Text className="text-sm">311 678 6056</Text>
        </View>
        <Text className="bg-yellow-200 py-2 px-4 rounded-full text-sm">
          Enviada
        </Text>
      </CardContent>
    </Card>
  );
};
