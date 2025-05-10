import { ScrollView, View } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { useBooking } from "@/presentation/hooks";
import { BookingCard } from "./BookingCard";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { BookingLoading } from "./BookingLoading";

export const Booking = () => {
  const { bookings, isLoading, loading, session } = useBooking();

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

  if (bookings?.length === 0) {
    return (
      <View className="p-4">
        <CustomAlert
          title="Info!!!"
          description="No has realizado ninguna reserva."
          type="info"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 ">
      <Text className="font-baloo-bold text-center text-xl p-4">
        Consulta cuándo y dónde es tu próxima cita.
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1">
          {bookings?.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              loading={loading}
              onCancelBooking={() => console.log(1)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
