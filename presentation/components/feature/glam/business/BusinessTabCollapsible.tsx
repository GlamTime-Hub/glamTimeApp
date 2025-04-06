import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Href, router } from "expo-router";
import { useBusinessBookingStore } from "@/presentation/store/use-business-booking.store";
import { CustomCollapsible } from "@/presentation/components/ui/CustomCollapsible";
import { Separator } from "@/presentation/components/ui/separator";

interface Props {
  title: string;
  services?: any[];
  fromBusiness: boolean;
}

export const BusinessTabCollapsible = ({
  title,
  fromBusiness,
  services,
}: Props) => {
  const { addService } = useBusinessBookingStore();

  const onBooking = (service: any) => {
    const urlNavigation: Href = fromBusiness
      ? "/glam/(tabs)/business/detail/booking/professional"
      : "/glam/(tabs)/business/detail/booking/slots";

    addService(service);
    router.push(urlNavigation);
  };

  return (
    <CustomCollapsible title={title}>
      <Card className="px-0">
        <CardContent className="p-4">
          {services?.map((service) => (
            <View key={service.id}>
              <View className="flex flex-row mb-2 justify-between items-center">
                <View>
                  <Text className="text-lg">{service.subcategory}</Text>
                  <Text className="text-sm font-bold">${service.price}</Text>
                </View>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  onPress={() => onBooking(service)}
                >
                  <Text>Reservar</Text>
                </Button>
              </View>
              <Separator />
            </View>
          ))}
        </CardContent>
      </Card>
    </CustomCollapsible>
  );
};
