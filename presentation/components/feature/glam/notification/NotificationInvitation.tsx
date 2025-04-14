import { UserNotification } from "@/core/interfaces/user-notification.interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { TouchableOpacity, View } from "react-native";
import { Image } from "@/lib/icons/Icons";
import { Text } from "@/presentation/components/ui/text";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { router } from "expo-router";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import { useUserNotificationStore } from "@/presentation/store/use-user-notification.store";

interface Props {
  notification: UserNotification;
  markNotification: (notificationId: string) => Promise<void>;
}

export const NotificationInvitation = ({
  notification,
  markNotification,
}: Props) => {
  const title =
    notification.type === "invitation"
      ? notification.business.name
      : notification.fromUser.name;

  const image =
    notification.type === "invitation"
      ? notification.business.urlPhoto
      : notification.fromUser.urlPhoto;

  const { setNotification } = useUserNotificationStore();

  const handleNotification = async () => {
    setNotification(notification);
    if (notification.type === "invitation") {
      router.push("/glam/(tabs)/invitation");
    }

    if (notification.type === "invitation-accepted") {
      await markNotification(notification.id);
      router.push({
        pathname:
          "/glam/(tabs)/profile/my-business/my-professionals/[businessId]",
        params: {
          businessId: notification.business.id,
        },
      });
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
                  uri: image || "",
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
            <View className="w-[300px] px-4 relative">
              <Text className="font-baloo-bold text-xl">{title}</Text>
              <Text className="text-md mb-4 text-wrap" numberOfLines={2}>
                {notification.message}
              </Text>
              <Text className="absolute text-sm -bottom-4 right-4">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                  locale: es,
                })}
              </Text>
            </View>
            <View></View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
