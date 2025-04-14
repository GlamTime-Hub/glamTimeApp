import { ScrollView, View } from "react-native";
import { BusinessBookingConfirmationCard } from "../shared/BusinessBookingConfirmationCard";
import { Text } from "@/presentation/components/ui/text";

export const Booking = () => {
  const reservation = [
    {
      professional: {
        urlPhoto:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Juan Ceballos",
      },
      service: {
        name: "Corte de cabello",
      },
      slot: {
        date: "5 de abril de 2025",
        startTime: 8,
        endTime: 9.5,
      },
      status: "pending",
    },
    {
      professional: {
        urlPhoto:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Juan Ceballos",
      },
      service: {
        name: "Corte de cabello",
      },
      slot: {
        date: "7 de abril de 2025",
        startTime: 10,
        endTime: 10.5,
      },
    },
    {
      professional: {
        urlPhoto:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Juan Ceballos",
      },
      service: {
        name: "Corte de cabello",
      },
      slot: {
        date: "7 de abril de 2025",
        startTime: 10,
        endTime: 10.5,
      },
    },
    {
      professional: {
        urlPhoto:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Juan Ceballos",
      },
      service: {
        name: "Corte de cabello",
      },
      slot: {
        date: "7 de abril de 2025",
        startTime: 10,
        endTime: 10.5,
      },
    },
    {
      professional: {
        urlPhoto:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Juan Ceballos",
      },
      service: {
        name: "Corte de cabello",
      },
      slot: {
        date: "7 de abril de 2025",
        startTime: 10,
        endTime: 10.5,
      },
    },
    {
      professional: {
        urlPhoto:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Juan Ceballos",
      },
      service: {
        name: "Corte de cabello",
      },
      slot: {
        date: "7 de abril de 2025",
        startTime: 10,
        endTime: 10.5,
      },
    },
    {
      professional: {
        urlPhoto:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Juan Ceballos",
      },
      service: {
        name: "Corte de cabello",
      },
      slot: {
        date: "7 de abril de 2025",
        startTime: 10,
        endTime: 10.5,
      },
    },
  ];

  return (
    <View className="flex-1">
      <Text className="font-bold text-center text-xl mt-4">
        Consulta cuándo y dónde es tu próxima cita.
      </Text>
      <ScrollView className="mb-5">
        <View className="p-4">
          {reservation.map((booking, index) => (
            <BusinessBookingConfirmationCard
              key={index}
              service={booking.service}
              professional={booking.professional}
              slot={booking.slot}
              status={booking.status}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
