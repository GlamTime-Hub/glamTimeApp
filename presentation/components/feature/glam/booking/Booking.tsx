import { ScrollView, View } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { useBooking } from "@/presentation/hooks";
import { BookingCard } from "./BookingCard";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { BookingLoading } from "./BookingLoading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { useState } from "react";

export const Booking = () => {
  const { bookings, isLoading, loading, session, onFeedback, onCancelBooking } =
    useBooking();
  const [value, setValue] = useState("booking");

  if (!session) {
    return (
      <View className="p-4">
        <CustomAlert
          title="Info!!!"
          description="Iniciar sesión para ver tus reservas."
          type="info"
        />
      </View>
    );
  }

  if (isLoading) {
    return <BookingLoading />;
  }

  const bookingConfirmed = bookings?.filter(
    (booking) => booking.status === "confirmed"
  );
  const history = bookings?.filter((booking) => booking.status !== "confirmed");

  return (
    <View className="flex-1 ">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full flex-1 p-4 mx-auto  gap-2"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="booking" className="flex-1">
            <Text>Reservas</Text>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            <Text>Historial</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="booking" className="flex-1">
          <View className="flex-1">
            {bookingConfirmed?.length === 0 && (
              <CustomAlert
                title="Info!!!"
                description="No has realizado ninguna reserva."
                type="info"
              />
            )}

            <ScrollView showsVerticalScrollIndicator={false}>
              {bookingConfirmed?.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  loading={loading}
                  onCancelBooking={() => onCancelBooking(booking)}
                />
              ))}
            </ScrollView>
          </View>
        </TabsContent>
        <TabsContent value="history" className="flex-1">
          <View className="flex-1">
            {history?.length === 0 && (
              <CustomAlert
                title="Info!!!"
                description="No tienes reservas en el historial."
                type="info"
              />
            )}

            <ScrollView showsVerticalScrollIndicator={false}>
              {history?.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  loading={loading}
                  onFeedback={onFeedback}
                />
              ))}
            </ScrollView>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  );
};
