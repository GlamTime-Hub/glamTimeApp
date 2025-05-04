import { BookingDetail } from "@/core/interfaces/booling-detail.interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { formatTime } from "@/presentation/utils/format-time.util";
import { bg } from "date-fns/locale";
import { ImageBackground, StyleSheet, View } from "react-native";

interface Props {
  booking: BookingDetail;
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
});

const STATUS_STYLE: { [key: string]: { bgColor: string; label: string } } = {
  pending: {
    bgColor: "bg-yellow-100",
    label: "Pendiente de ser confirmada.",
  },
  confirmed: {
    bgColor: "bg-green-100",
    label: "Confirmada.",
  },
};

export const BookingCard = ({ booking }: Props) => {
  const statusStyle = STATUS_STYLE[booking.status] || STATUS_STYLE.pending;

  return (
    <View className="p-4 flex-1">
      <Card className="flex-1 h-[300px]">
        <CardContent className="flex-1 p-0">
          <ImageBackground
            source={{
              uri: booking.business?.urlPhoto,
              scale: 0.2,
            }}
            className="relative"
            style={styles.image}
          >
            <View
              style={styles.overlay}
              className="absolute flex w-full top-0 justify-center"
            >
              <Text className="text-white font-baloo-bold text-center">
                {booking.business.name}
              </Text>
            </View>
          </ImageBackground>
          <View className="flex flex-row items-center p-4 gap-2">
            <Avatar alt="Imagen de profesional">
              <AvatarImage
                source={{
                  uri: booking.professional?.urlPhoto,
                }}
              ></AvatarImage>
              <AvatarFallback>
                <Text>ZN</Text>
              </AvatarFallback>
            </Avatar>
            <View className="px-4">
              <Text className="font-baloo-bold text-2xl">
                {booking.professional.name}
              </Text>
              <Text className="text-xl">{booking.serviceName}</Text>
              <Text className="text-xl">{booking.fullDate}</Text>
              <View className="flex flex-row gap-2">
                <Text className="text-xl">{formatTime(booking.startTime)}</Text>
                <Text>-</Text>
                <Text className="text-xl">{formatTime(booking.endTime)}</Text>
              </View>
            </View>
          </View>
          <View
            className={`mx-4 rounded-md ${statusStyle.bgColor} flex flex-row justify-center`}
          >
            <Text className="font-baloo-bold text-black">Estado: </Text>
            <Text className="text-black">{statusStyle.label}</Text>
          </View>
          <View className="w-full p-4">
            <Button size="sm">
              <Text>Cancelar Cita</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};
