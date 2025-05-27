import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { Text } from "@/presentation/components/ui/text";
import { useState } from "react";
import { BusinessProfessionalComments } from "./BusinessProfessionalComments";
import { ScrollView, View } from "react-native";
import { BusinessServicesTab } from "./BusinessServicesTab";

interface Props {
  id: string;
  businessId: string;
}

export const BusinessProfessionalTab = ({ id, businessId }: Props) => {
  const [value, setValue] = useState("services");

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="w-full flex-1 mx-auto  gap-2"
    >
      <TabsList className="flex-row w-full">
        <TabsTrigger value="services" className="flex-1">
          <Text>Servicios</Text>
        </TabsTrigger>
        <TabsTrigger value="comments" className="flex-1">
          <Text>Comentarios</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="services" className="flex-1">
        <View className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <BusinessServicesTab id={businessId} fromProfessional={true} />
          </ScrollView>
        </View>
      </TabsContent>
      <TabsContent value="comments" className="flex-1">
        <View className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <BusinessProfessionalComments professionalId={id} />
          </ScrollView>
        </View>
      </TabsContent>
    </Tabs>
  );
};
