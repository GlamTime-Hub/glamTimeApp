import { ScrollView } from "react-native";
import { BookingHistoryCard } from "./BookingHistoryCard";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { useBookingHistory } from "@/presentation/hooks/use-booking-history.hook";
import { BookingLoading } from "./BookingLoading";

export const BookingHistoryList = () => {
  const { bookings, isLoading } = useBookingHistory();

  if (isLoading) {
    return <BookingLoading />;
  }

  if (bookings.length === 0) {
    return (
      <CustomAlert
        title="Info!!!"
        description="No tienes reservas en el historial."
        type="info"
      />
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {bookings?.map((booking) => (
        <BookingHistoryCard
          key={booking.id}
          booking={booking}
          fromProfessional={0}
        />
      ))}
    </ScrollView>
  );
};
