import { Professional } from "@/core/interfaces/professional.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Slot } from "@/core/interfaces/slot.interface";
import { cn } from "@/lib/util";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { formatTime } from "@/presentation/utils/format-time.util";
import { View } from "react-native";

interface Props {
  professional: Professional | null;
  slot: Slot | null;
  service: SubCategory | null;
  status?: string;
}

export const BusinessBookingConfirmationCard = ({
  professional,
  slot,
  service,
  status,
}: Props) => {
  return (
    <Card className="my-2">
      <CardContent className="p-0 m-0">
        <View className="flex p-6 gap-4 flex-row items-center justify-center">
          <Avatar alt="Imagen de profesional" size="xl">
            <AvatarImage
              source={{
                uri: professional?.user.urlPhoto,
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>

          <View>
            <View className="flex flex-row items-center">
              <Text className="font-baloo-bold text-lg">Profesional: </Text>
              <Text className="text-lg">{professional?.user.name}</Text>
            </View>

            <View className="flex flex-row items-center">
              <Text className="font-baloo-bold text-lg">Servicio: </Text>
              <Text className="text-lg">{service?.name}</Text>
            </View>

            <View className="flex flex-row items-center">
              <Text className="font-baloo-bold text-lg">Dia: </Text>
              <Text className="text-lg">{slot?.fullDate}</Text>
            </View>

            <View className="flex flex-row items-center">
              <Text className="font-baloo-bold text-lg">Hora: </Text>
              <View className="flex flex-row">
                <Text>{formatTime(slot?.startTime!)}</Text>
                <Text>-</Text>
                <Text>{formatTime(slot?.endTime!)}</Text>
              </View>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
