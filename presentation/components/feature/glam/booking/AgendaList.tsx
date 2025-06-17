import { useAgenda } from "@/presentation/hooks";
import { BookingLoading } from "./BookingLoading";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { ScrollView } from "react-native";
import { BookingProfessionalCard } from "./BookingProfessionalCard";

export const AgendaList = () => {
  const { bookings, isLoading } = useAgenda();

  if (isLoading) {
    return <BookingLoading />;
  }

  if (bookings?.length === 0) {
    return (
      <CustomAlert
        title="Info!!!"
        description="No tienes ninguna reserva pendiente."
        type="info"
      />
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {bookings?.map((booking) => (
        <BookingProfessionalCard booking={booking} key={booking.id} />
      ))}
    </ScrollView>
  );
};
