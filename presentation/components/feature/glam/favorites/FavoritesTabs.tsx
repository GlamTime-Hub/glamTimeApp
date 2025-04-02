import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { Text } from "@/presentation/components/ui/text";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { FavoritesBusinessTab } from "./FavoritesBusinessTab";
import { FavoritesProfessionalTab } from "./FavoritesProfessionalTab";

export const FavoritesTabs = () => {
  const [value, setValue] = useState("business");

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="w-full flex-1 p-4 mx-auto  gap-2"
    >
      <TabsList className="flex-row w-full">
        <TabsTrigger value="business" className="flex-1">
          <Text>Negocios</Text>
        </TabsTrigger>
        <TabsTrigger value="professionals" className="flex-1">
          <Text>Profesionales</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="business" className="flex-1">
        <Card className="flex-1">
          <CardContent className="gap-4  native:gap-2">
            <ScrollView showsVerticalScrollIndicator={false}>
              <FavoritesBusinessTab />
            </ScrollView>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="professionals" className="flex-1">
        <Card className="flex-1">
          <CardContent className="gap-4 native:gap-2">
            <ScrollView showsVerticalScrollIndicator={false}>
              <FavoritesProfessionalTab />
            </ScrollView>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
