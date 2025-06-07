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
import { isMoreThan } from "@/presentation/utils/compare-dates-by-min.util";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  booking: BookingDetail;
  loading: boolean;
  onCancelBooking?: (id: string) => void;
  onFeedback?: (id: string, bookingId: string, isBusiness: boolean) => void;
}

const Label = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { titleColor } = useColorScheme();

  return (
    <View className="flex flex-row gap-2">
      <Text className={`text-primary font-baloo-bold ${titleColor}`}>
        {title}:
      </Text>
      <Text className="text-muted-foreground">{description}</Text>
    </View>
  );
};

export const BookingCard = ({
  booking,
  loading,
  onCancelBooking,
  onFeedback,
}: Props) => {
  const { titleColor } = useColorScheme();

  const openLocation = async () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${booking.business.location.address}@${booking.business.location.lat},${booking.business.location.lng}`,
      android: `geo:0,0?q=${booking.business.location.lat},${booking.business.location.lng}(${booking.business.location.address})`,
    });

    await Linking.openURL(url!);
  };

  const goToProfessional = () => {
    router.push({
      pathname:
        "/glam/(tabs)/business/detail/professional-detail/[professionalId]",
      params: {
        professionalId: booking.professional.id,
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

  const isMore = isMoreThan(booking.date, 30);

  return (
    <View className="flex-1 mb-2">
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
              <Text className={`text-primary font-baloo-bold ${titleColor}`}>
                Hora:
              </Text>
              <View className="flex flex-row gap-2">
                <Text className="text-muted-foreground">
                  {formatTime(booking.startTime)}
                </Text>
                <Text className="text-muted-foreground">-</Text>
                <Text className="text-muted-foreground">
                  {formatTime(booking.endTime)}
                </Text>
              </View>
            </View>
          </View>

          {booking.status === "completed" && !booking.hasBusinessReview && (
            <Button
              className="mb-2 mx-4 mt-4"
              onPress={() =>
                onFeedback && onFeedback(booking.business.id, booking.id, true)
              }
            >
              <Text>Calificar negocio</Text>
            </Button>
          )}

          {booking.status === "completed" && !booking.hasProfessionalReview && (
            <Button
              className="mx-4 mb-2"
              variant={"secondary"}
              onPress={() =>
                onFeedback &&
                onFeedback(booking.professional.id, booking.id, false)
              }
            >
              <Text>Calificar profesional</Text>
            </Button>
          )}

          {booking.status === "cancelled" && (
            <View>
              <Text className="text-red-500 text-center font-baloo-bold my-2">
                {booking.reason}
              </Text>
            </View>
          )}

          {booking.status === "confirmed" && (
            <View className="w-full flex flex-row justify-around p-4">
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

              {!isMore && (
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
                      <DialogTitle>Cancelar Reserva</DialogTitle>
                      <DialogDescription>
                        <View>
                          <Text>
                            ¿Estás seguro de que deseas cancelar la reserva?
                          </Text>
                        </View>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          className="flex flex-row gap-2"
                          onPress={() =>
                            onCancelBooking && onCancelBooking(booking.id)
                          }
                        >
                          {loading && <LoadingIndicator />}
                          <Text>Continuar</Text>
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </View>
          )}
        </CardContent>
      </Card>
    </View>
  );
};
