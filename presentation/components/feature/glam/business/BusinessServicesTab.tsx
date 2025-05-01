import { View } from "react-native";

import { Service, SubCategory } from "@/core/interfaces/service.interface";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { CustomCollapsible } from "@/presentation/components/ui/CustomCollapsible";
import { Text } from "@/presentation/components/ui/text";
import { useBusinessServices } from "@/presentation/hooks/use-business-services.hook";
import { formatCurrency } from "@/presentation/utils/format-currency.util";
import { BusinessServicesTabLoading } from "./BusinessServicesTabLoading";

export const BusinessServicesTab = ({ id }: { id: string }) => {
  const { services, isLoading } = useBusinessServices(id, true);

  if (isLoading) {
    return <BusinessServicesTabLoading />;
  }

  return (
    <View>
      {services.map((service: Service) => (
        <Card key={service.id} className="my-2">
          <CardContent className="p-0 ">
            <CustomCollapsible title={service.name}>
              {service.subCategories.map((subcategory: SubCategory) => (
                <Card className="my-2" key={subcategory.id}>
                  <CardContent className="py-5">
                    <Text className="font-baloo-bold text-2xl">
                      {subcategory.name}{" "}
                    </Text>
                    <View className="flex flex-row gap-2">
                      <Text className="text-xl font-baloo-bold">Precio:</Text>
                      <Text className="text-xl">
                        {`$ ${formatCurrency(`${subcategory.service.price}`)}`}
                      </Text>
                    </View>
                    <View className="flex flex-row gap-2">
                      <Text className="text-xl font-baloo-bold">Duración:</Text>
                      <Text className="text-xl">
                        {`${subcategory.service.duration} minutos`}
                      </Text>
                    </View>

                    <Button className="mt-2">
                      <Text>Reservar</Text>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </CustomCollapsible>
          </CardContent>
        </Card>
      ))}
    </View>
  );
};
