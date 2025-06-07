import { TouchableOpacity, View } from "react-native";

import { Card, CardContent } from "@/presentation/components/ui/card";
import { CustomCollapsible } from "@/presentation/components/ui/CustomCollapsible";
import { Text } from "@/presentation/components/ui/text";
import { formatCurrency } from "@/presentation/utils/format-currency.util";
import { BusinessServicesTabLoading } from "./BusinessServicesTabLoading";
import { useColorScheme } from "@/lib/useColorScheme";
import { useBusinessProfessionalServices } from "@/presentation/hooks/use-business-professional-services.hook";
import {
  ProfessionalService,
  SubCategoryWithService,
} from "@/core/interfaces/professional-service.interface";

interface Props {
  professionalId: string;
  businessId: string;
}

export const BusinessProfessionalServicesTab = ({
  professionalId,
  businessId,
}: Props) => {
  const { services, isLoading, onBookingService } =
    useBusinessProfessionalServices(professionalId, businessId);

  const { titleColor } = useColorScheme();

  if (isLoading) {
    return <BusinessServicesTabLoading />;
  }

  return (
    <View>
      {services?.map((service: ProfessionalService) => (
        <Card key={service.id} className="my-2">
          <CardContent className="p-0 ">
            <CustomCollapsible title={service.name}>
              {service.subCategories.map(
                (subcategory: SubCategoryWithService) => (
                  <TouchableOpacity
                    onPress={() => onBookingService(subcategory)}
                    key={subcategory.id}
                  >
                    <Card className="my-2">
                      <CardContent className="py-5">
                        <Text
                          className={`font-baloo-bold text-2xl text-center text-primary ${titleColor}`}
                        >
                          {subcategory.name}
                        </Text>
                        <View className="flex flex-row gap-2 justify-center">
                          <Text
                            className={`font-baloo-bold ml-2 text-xl text-primary ${titleColor}`}
                          >
                            Precio:
                          </Text>
                          <Text className="text-xl text-muted-foreground">
                            {`$ ${formatCurrency(
                              `${subcategory.service.price}`
                            )}`}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-center gap-2">
                          <Text
                            className={`font-baloo-bold ml-2 text-xl text-primary ${titleColor}`}
                          >
                            Duración:
                          </Text>
                          <Text className="text-xl text-muted-foreground">
                            {`${subcategory.service.duration} minutos`}
                          </Text>
                        </View>
                      </CardContent>
                    </Card>
                  </TouchableOpacity>
                )
              )}
            </CustomCollapsible>
          </CardContent>
        </Card>
      ))}
    </View>
  );
};
