import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { Text } from "@/presentation/components/ui/text";
import { useState } from "react";
import { BusinessTabCollapsible } from "./BusinessTabCollapsible";
import { BusinessProfessionalList } from "./BusinessProfessionalList";
import { ScrollView } from "react-native";

interface Props {
  services: any;
  professionals: any;
}

export const BusinessTab = ({ services, professionals }: Props) => {
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
        <Card className="flex-1">
          <CardContent className="gap-4  native:gap-2">
            <ScrollView showsVerticalScrollIndicator={false}>
              {Object.keys(services).map((category) => (
                <BusinessTabCollapsible
                  key={category}
                  title={category}
                  fromBusiness={true}
                  services={services[category]}
                />
              ))}
            </ScrollView>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="professionals">
        <Card className="flex-1">
          <CardContent className="gap-4 native:gap-2 px-2">
            <ScrollView showsVerticalScrollIndicator={false}>
              <BusinessProfessionalList professionals={professionals} />
            </ScrollView>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
