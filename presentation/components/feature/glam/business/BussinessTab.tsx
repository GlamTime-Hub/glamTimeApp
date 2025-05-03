import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { Text } from "@/presentation/components/ui/text";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { BusinessServicesTab } from "./BusinessServicesTab";
import { BusinessProfessionalTab } from "./BusinessProfessionalTab";

export const BusinessTab = ({ id }: { id: string }) => {
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
        <TabsTrigger value="professionals" className="flex-1">
          <Text>Profesionales</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="services">
        <View className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <BusinessServicesTab id={id} />
          </ScrollView>
        </View>
      </TabsContent>
      <TabsContent value="professionals">
        <View className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <BusinessProfessionalTab id={id} />
          </ScrollView>
        </View>
      </TabsContent>
    </Tabs>
  );
};
