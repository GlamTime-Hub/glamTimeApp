import { ScrollView, View } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { useBooking } from "@/presentation/hooks";
import { BookingCard } from "./BookingCard";

export const Booking = () => {
  const { bookings } = useBooking();

  console.log("bookings", bookings);

  return (
    <View className="flex-1 ">
      <Text className="font-baloo-bold text-center text-xl p-4">
        Consulta cuándo y dónde es tu próxima cita.
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1">
          {bookings?.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
