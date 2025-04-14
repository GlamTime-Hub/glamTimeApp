import { UserNotification } from "@/core/interfaces/user-notification.interface";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { View } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Image, Trash2 } from "@/lib/icons/Icons";
import { Text } from "@/presentation/components/ui/text";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/presentation/components/ui/button";
import { useState } from "react";
import { router } from "expo-router";
import { LoadingIndicator } from "../shared/LoadingIndicator";

interface Props {
  notification: UserNotification;
  markNotification: (notificationId: string) => Promise<void>;
}

export const NotificationInvitationRejected = ({
  notification,
  markNotification,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await markNotification(notification.id);
    setLoading(false);
    router.push({
      pathname:
        "/glam/(tabs)/profile/my-business/my-professionals/[businessId]",
      params: {
        businessId: notification.business.id,
      },
    });
  };

  return (
    <Card className="my-4">
      <CardContent className="py-4 px-2">
        <View className="flex flex-row jutify-between items-center">
          <Avatar alt="Imagen de profesional" size="md">
            <AvatarImage
              source={{
                uri: notification.fromUser.urlPhoto || "",
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Image className="text-foreground" size={40} strokeWidth={0.8} />
            </AvatarFallback>
          </Avatar>
          <View className="w-[300px] px-4 relative">
            <View className="flex flex-row justify-between items-center">
              <Text className="font-baloo-bold text-xl">
                {notification.fromUser.name}
              </Text>
              {loading && <LoadingIndicator />}
              {!loading && (
                <Button onPress={handleDelete} variant={"ghost"} size={"icon"}>
                  <Trash2 color={"red"} size={24} />
                </Button>
              )}
            </View>
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
        </View>
      </CardContent>
    </Card>
  );
};
