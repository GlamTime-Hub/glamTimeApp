import { BookingDetail } from "@/core/interfaces/booking-detail.interface";

import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { formatTime } from "@/presentation/utils/format-time.util";
import { Linking, Platform, TouchableOpacity, View } from "react-native";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";

import { X, MapPinned, ShieldUser, Store } from "@/lib/icons/Icons";
import { router } from "expo-router";

interface Props {
  booking: BookingDetail;
  loading: boolean;
  onCancelBooking: (id: string) => void;
}

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

const Label = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <View className="flex flex-row gap-2">
      <Text className="text-primary font-baloo-bold">{title}:</Text>
      <Text>{description}</Text>
    </View>
  );
};

export const BookingCard = ({ booking, loading, onCancelBooking }: Props) => {
  const statusStyle = STATUS_STYLE[booking.status] || STATUS_STYLE.pending;

  const openLocation = async () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${booking.business.location.address}@${booking.business.location.lat},${booking.business.location.lng}`,
      android: `geo:0,0?q=${booking.business.location.lat},${booking.business.location.lng}(${booking.business.location.address})`,
    });

    await Linking.openURL(url!);
  };

  const goToProfessional = () => {
    router.push({
      pathname: "/glam/(tabs)/business/detail/professional-detail/[id]",
      params: {
        id: booking.professional.id,
        businessId: booking.business.id,
      },
    });
  };

  const goToBusiness = () => {
    router.push({
      pathname: "/glam/(tabs)/business/detail/home/[id]",
      params: {
        id: booking.business.id,
      },
    });
  };

  return (
    <View className="p-4 flex-1">
      <Card className="flex-1">
        <CardContent className="flex-1 p-0">
          <View className="flex p-4">
            <Label title="Salón" description={booking.business.name} />

            <Label
              title="Profesional"
              description={booking.professional.name}
            />
            <Label title="Servicio" description={booking.serviceName} />
            <Label title="Día" description={booking.fullDate} />

            <View className="flex flex-row gap-2">
              <Text className="text-primary font-baloo-bold">Hora:</Text>
              <View className="flex flex-row gap-2">
                <Text>{formatTime(booking.startTime)}</Text>
                <Text>-</Text>
                <Text>{formatTime(booking.endTime)}</Text>
              </View>
            </View>
          </View>
          <View className={`mx-4 rounded-md ${statusStyle.bgColor}`}>
            <Text className="text-black text-center">{statusStyle.label}</Text>
          </View>

          <View className="w-full flex flex-row justify-between p-4">
            <TouchableOpacity onPress={goToBusiness}>
              <Card className="w-[70px] bg-primary border-primary">
                <CardContent className="flex p-2 justify-center items-center">
                  <Store size={18} className="text-white" />
                  <Text className="text-xs text-white">Salón</Text>
                </CardContent>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToProfessional}>
              <Card className="w-[70px] bg-primary border-primary">
                <CardContent className="flex p-2 justify-center items-center">
                  <ShieldUser size={18} className="text-white" />
                  <Text className="text-xs text-white">Profesional</Text>
                </CardContent>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={openLocation}>
              <Card className="w-[70px] bg-primary border-primary">
                <CardContent className="flex p-2 justify-center items-center">
                  <MapPinned size={18} className="text-white" />
                  <Text className="text-xs text-white">Ubicación</Text>
                </CardContent>
              </Card>
            </TouchableOpacity>

            <Dialog>
              <DialogTrigger asChild>
                <TouchableOpacity>
                  <Card className="bg-destructive border-destructive w-[70px]">
                    <CardContent className="flex p-2 justify-center items-center">
                      <X size={18} className="text-white" />
                      <Text className="text-xs text-white">Cancelar</Text>
                    </CardContent>
                  </Card>
                </TouchableOpacity>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cancelar Notificación</DialogTitle>
                  <DialogDescription>
                    <View>
                      <Text>¿Estás seguro de que deseas cancelar la cita?</Text>
                    </View>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      className="flex flex-row gap-2"
                      onPress={() => onCancelBooking(booking.id)}
                    >
                      {loading && <LoadingIndicator />}
                      <Text>Continuar</Text>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};
