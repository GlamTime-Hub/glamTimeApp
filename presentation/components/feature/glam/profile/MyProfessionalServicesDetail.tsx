import { MyBusinessMyServicesLoading } from "./MyBusinessMyServicesLoading";
import { ScrollView, View } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { Separator } from "@/presentation/components/ui/separator";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { CustomCollapsible } from "@/presentation/components/ui/CustomCollapsible";
import { MyProfessionalServiceCard } from "./MyProfessionalServiceCard";
import { useProfessionalServices } from "@/presentation/hooks/use-professional-services.hook";
import {
  ProfessionalService,
  SubCategoryWithService,
} from "@/core/interfaces/professional-service.interface";

export const MyProfessionalServiceDetail = () => {
  const { services, isLoading, onActiveProfessionalService } =
    useProfessionalServices();

  if (isLoading) {
    return <MyBusinessMyServicesLoading />;
  }

  return (
    <View className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="my-2 font-baloo-bold" numberOfLines={2}>
          Gestiona los servicios que ofreces.
        </Text>
        <Separator className="mb-2" />
        {services?.map((service: ProfessionalService) => (
          <Card key={service.id} className="my-2">
            <CardContent className="p-0 ">
              <CustomCollapsible title={service.name}>
                {service.subCategories.map(
                  (subcategory: SubCategoryWithService) => (
                    <Card className="my-2" key={subcategory.id}>
                      <CardContent>
                        <MyProfessionalServiceCard
                          subcategory={subcategory}
                          callback={(checked) =>
                            onActiveProfessionalService(subcategory, checked)
                          }
                          loading={true}
                        />
                      </CardContent>
                    </Card>
                  )
                )}
              </CustomCollapsible>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};
