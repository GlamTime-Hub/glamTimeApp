import { UserNotification } from "@/core/interfaces/user-notification.interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { TouchableOpacity, View } from "react-native";
import { Image } from "@/lib/icons/Icons";
import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { router } from "expo-router";
import { useUserNotificationStore } from "@/presentation/store/use-user-notification.store";

interface Props {
  notification: UserNotification;
}
export const NotificationCard = ({ notification }: Props) => {
  const title = ["invitation"].includes(notification.type)
    ? notification.business.name
    : notification.user.name;

  const { setNotification } = useUserNotificationStore();

  const handleNotification = async () => {
    setNotification(notification);
    if (notification.type === "invitation") {
      router.push("/glam/(tabs)/invitation");
    }
  };

  return (
    <TouchableOpacity onPress={handleNotification}>
      <Card className="my-4 animate-pulse">
        <CardContent className="py-4 px-2">
          <View className="flex flex-row jutify-between items-center">
            <Avatar alt="Imagen de profesional" size="md">
              <AvatarImage
                source={{
                  uri: notification.user.urlPhoto || "",
                }}
              ></AvatarImage>
              <AvatarFallback>
                <Image
                  className="text-foreground"
                  size={40}
                  strokeWidth={0.8}
                />
              </AvatarFallback>
            </Avatar>
            <View className="w-[300px] px-4">
              <Text className="font-baloo-bold text-xl">{title}</Text>
              <Text className="text-md text-wrap" numberOfLines={2}>
                {notification.message}
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
