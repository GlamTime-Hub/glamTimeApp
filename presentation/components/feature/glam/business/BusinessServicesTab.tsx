import { TouchableOpacity, View } from "react-native";

import { Service, SubCategory } from "@/core/interfaces/service.interface";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { CustomCollapsible } from "@/presentation/components/ui/CustomCollapsible";
import { Text } from "@/presentation/components/ui/text";
import { useBusinessServices } from "@/presentation/hooks/use-business-services.hook";
import { formatCurrency } from "@/presentation/utils/format-currency.util";
import { BusinessServicesTabLoading } from "./BusinessServicesTabLoading";

export const BusinessServicesTab = ({
  id,
  fromProfessional = false,
}: {
  id: string;
  fromProfessional: boolean;
}) => {
  const { services, isLoading, onBookingService } = useBusinessServices(
    id,
    true,
    fromProfessional
  );

  if (isLoading) {
    return <BusinessServicesTabLoading />;
  }

  return (
    <View>
      {services?.map((service: Service) => (
        <Card key={service.id} className="my-2">
          <CardContent className="p-0 ">
            <CustomCollapsible title={service.name}>
              {service.subCategories.map((subcategory: SubCategory) => (
                <TouchableOpacity
                  onPress={() => onBookingService(subcategory)}
                  key={subcategory.id}
                >
                  <Card className="my-2">
                    <CardContent className="py-5">
                      <Text className="font-baloo-bold text-2xl text-center text-primary">
                        {subcategory.name}
                      </Text>
                      <View className="flex flex-row gap-2 justify-center">
                        <Text className="text-xl font-baloo-bold text-primary">
                          Precio:
                        </Text>
                        <Text className="text-xl">
                          {`$ ${formatCurrency(
                            `${subcategory.service.price}`
                          )}`}
                        </Text>
                      </View>
                      <View className="flex flex-row justify-center gap-2">
                        <Text className="text-xl font-baloo-bold text-primary">
                          Duración:
                        </Text>
                        <Text className="text-xl">
                          {`${subcategory.service.duration} minutos`}
                        </Text>
                      </View>
                    </CardContent>
                  </Card>
                </TouchableOpacity>
              ))}
            </CustomCollapsible>
          </CardContent>
        </Card>
      ))}
    </View>
  );
};
