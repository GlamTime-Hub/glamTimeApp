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
import { BusinessProfessionalComments } from "./BusinessProfessionalComments";
import { ScrollView } from "react-native";

interface Props {
  services: any;
  comments?: any;
}

export const BusinessProfessionalTab = ({ services }: Props) => {
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
        <Card className="flex-1">
          <CardContent className="gap-4 flex-1 my-4 native:gap-2">
            <ScrollView showsVerticalScrollIndicator={false}>
              {Object.keys(services).map((category) => (
                <BusinessTabCollapsible
                  key={category}
                  title={category}
                  fromBusiness={false}
                  services={services[category]}
                />
              ))}
            </ScrollView>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="comments" className="flex-1">
        <Card className="mb-10 flex-1 ">
          <CardContent className="gap-4 flex-1 native:gap-2">
            <BusinessProfessionalComments />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
