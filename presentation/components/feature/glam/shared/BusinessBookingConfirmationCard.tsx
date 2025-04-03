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
  professional: any;
  slot: any;
  service: any;

  status?: string;
}

export const BusinessBookingConfirmationCard = ({
  professional,
  slot,
  service,
  status,
}: Props) => {
  return (
    <Card
      className={cn(
        "my-2",
        status === "pending" ? "border-2 border-green-200" : ""
      )}
    >
      <CardContent className="p-0 m-0">
        <View className="flex p-6 gap-4 flex-row items-center justify-center">
          <Avatar alt="Imagen de profesional" size="xl">
            <AvatarImage
              source={{
                uri: professional.urlPhoto,
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>

          <View>
            <View className="flex flex-row items-center">
              <Text className="font-bold text-lg">Profesional: </Text>
              <Text className="text-lg">{professional.name}</Text>
            </View>

            <View className="flex flex-row items-center">
              <Text className="font-bold text-lg">Servicio: </Text>
              <Text className="text-lg">{service.name}</Text>
            </View>

            <View className="flex flex-row items-center">
              <Text className="font-bold text-lg">Dia: </Text>
              <Text className="text-lg">{slot.date}</Text>
            </View>

            <View className="flex flex-row items-center">
              <Text className="font-bold text-lg">Hora: </Text>
              <View className="flex flex-row">
                <Text>{formatTime(slot.startTime)}</Text>
                <Text>-</Text>
                <Text>{formatTime(slot.endTime)}</Text>
              </View>
            </View>
          </View>
        </View>
        {status === "pending" && (
          <View className="flex flex-row justify-center items-center py-2">
            <Text className="text-green-200 text-lg">Pendiente</Text>
          </View>
        )}
      </CardContent>
    </Card>
  );
};
