import { View } from "react-native";
import { useState } from "react";

import { Text } from "@/presentation/components/ui/text";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import useAuthStore from "@/core/store/auth.store";
import { BookingList } from "./BookingList";
import { BookingHistoryList } from "./BookingHistoryList";

export const Booking = () => {
  const { session } = useAuthStore();
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
            <BookingList />
          </View>
        </TabsContent>
        <TabsContent value="history" className="flex-1">
          <View className="flex-1">
            <BookingHistoryList />
          </View>
        </TabsContent>
      </Tabs>
    </View>
  );
};
