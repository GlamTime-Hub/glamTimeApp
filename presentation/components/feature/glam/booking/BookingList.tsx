import { useBooking } from "@/presentation/hooks";
import { BookingLoading } from "./BookingLoading";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { ScrollView } from "react-native";
import { BookingCard } from "./BookingCard";

export const BookingList = () => {
  const { bookings, isLoading, loading, onCancelBooking } = useBooking();

  if (isLoading) {
    return <BookingLoading />;
  }

  if (bookings?.length === 0) {
    return (
      <CustomAlert
        title="Info!!!"
        description="No has realizado ninguna reserva."
        type="info"
      />
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {bookings?.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          loading={loading}
          isHistory={false}
          onCancelBooking={() => onCancelBooking(booking)}
        />
      ))}
    </ScrollView>
  );
};
