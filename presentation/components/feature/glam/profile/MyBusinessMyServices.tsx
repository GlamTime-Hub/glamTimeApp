import { Card, CardContent } from "@/presentation/components/ui/card";
import { CustomCollapsible } from "@/presentation/components/ui/CustomCollapsible";
import { Text } from "@/presentation/components/ui/text";
import { useBusinessServices } from "@/presentation/hooks/use-business-services.hook";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { MyBusinessMyServicesCard } from "./MyBusinessMyServicesCard";
import { Service, SubCategory } from "@/core/interfaces/service.interface";
import { MyBusinessMyServicesLoading } from "./MyBusinessMyServicesLoading";

export const MyBusinessMyServices = () => {
  const { businessId } = useLocalSearchParams();

  const { services, isLoading, activeServiceIsLoading, onActiveService } =
    useBusinessServices(businessId as string, false);

  if (isLoading) {
    return <MyBusinessMyServicesLoading />;
  }

  return (
    <View className="flex-1 p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="my-2 font-bold text-lg" numberOfLines={2}>
          Gestiona los servicios que ofreces en tu negocio
        </Text>
        <Card>
          <CardContent className="px-0">
            {services.map((service: Service) => (
              <CustomCollapsible title={service.name} key={service.id}>
                <Card>
                  <CardContent>
                    {service.subCategories.map((subcategory: SubCategory) => (
                      <MyBusinessMyServicesCard
                        key={subcategory.id}
                        subcategory={subcategory}
                        businessId={businessId as string}
                        callback={onActiveService}
                        loading={activeServiceIsLoading}
                      />
                    ))}
                  </CardContent>
                </Card>
              </CustomCollapsible>
            ))}
          </CardContent>
        </Card>
      </ScrollView>
    </View>
  );
};
