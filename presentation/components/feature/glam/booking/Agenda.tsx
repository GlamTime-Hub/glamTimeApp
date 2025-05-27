import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { Text } from "@/presentation/components/ui/text";
import { useAgenda } from "@/presentation/hooks";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { BookingLoading } from "./BookingLoading";
import { BookingProfessionalCard } from "./BookingProfessionalCard";

export const Agenda = () => {
  const { bookings, isLoading, loading, session } = useAgenda();

  const [value, setValue] = useState("booking");

  const bookingConfirmed = bookings?.filter(
    (booking) => booking.status === "confirmed"
  );
  const history = bookings?.filter((booking) => booking.status !== "confirmed");

  if (!session) {
    return (
      <View className="p-4">
        <CustomAlert
          title="Info!!!"
          description="Iniciar sesión para ver tu agenda."
          type="info"
        />
      </View>
    );
  }

  if (isLoading) {
    return <BookingLoading />;
  }

  return (
    <View className="flex-1">
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
                description="No tienes ninguna reserva pendiente."
                type="info"
              />
            )}

            <ScrollView showsVerticalScrollIndicator={false}>
              {bookingConfirmed?.map((booking) => (
                <BookingProfessionalCard booking={booking} key={booking.id} />
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
                <Text key={booking.id}></Text>
              ))}
            </ScrollView>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  );
};
