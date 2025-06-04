import { Card, CardContent } from "@/presentation/components/ui/card";
import { CustomCollapsible } from "@/presentation/components/ui/CustomCollapsible";
import { Text } from "@/presentation/components/ui/text";
import { useBusinessServices } from "@/presentation/hooks/use-business-services.hook";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { MyBusinessMyServicesCard } from "./MyBusinessMyServicesCard";
import { Service, SubCategory } from "@/core/interfaces/service.interface";
import { MyBusinessMyServicesLoading } from "./MyBusinessMyServicesLoading";
import { Separator } from "@/presentation/components/ui/separator";

export const MyBusinessMyServices = () => {
  const { businessId, businessType } = useLocalSearchParams();

  const { services, isLoading, activeServiceIsLoading, onActiveService } =
    useBusinessServices(
      businessId as string,
      false,
      false,
      businessType as string
    );

  if (isLoading) {
    return <MyBusinessMyServicesLoading />;
  }

  return (
    <View className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="my-2 font-baloo-bold" numberOfLines={2}>
          Gestiona los servicios que ofreces en tu negocio.
        </Text>
        <Separator className="mb-2" />
        {services?.map((service: Service) => (
          <Card key={service.id} className="my-2">
            <CardContent className="p-0 ">
              <CustomCollapsible title={service.name}>
                {service.subCategories.map((subcategory: SubCategory) => (
                  <Card className="my-2" key={subcategory.id}>
                    <CardContent>
                      <MyBusinessMyServicesCard
                        subcategory={subcategory}
                        businessId={businessId as string}
                        callback={onActiveService}
                        loading={activeServiceIsLoading}
                      />
                    </CardContent>
                  </Card>
                ))}
              </CustomCollapsible>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};
