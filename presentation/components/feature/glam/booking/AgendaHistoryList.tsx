import { ScrollView } from "react-native";
import { BookingHistoryCard } from "./BookingHistoryCard";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { BookingLoading } from "./BookingLoading";
import { useAgendaHistory } from "@/presentation/hooks/use-agenda-history.hook";

export const AgendaHistoryList = () => {
  const { bookings, isLoading } = useAgendaHistory();

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
          fromProfessional={1}
        />
      ))}
    </ScrollView>
  );
};
