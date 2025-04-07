import { ScrollView, View } from "react-native";
import { MyBusinessCard } from "./MyBusinessCard";
import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { router } from "expo-router";

export const MyBusiness = () => {
  return (
    <View className="flex-1 px-4 my-4">
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold text-xl">Gestiona tus negocios</Text>
        <Button
          variant={"outline"}
          size={"sm"}
          onPress={() =>
            router.push({
              pathname: "/glam/(tabs)/profile/my-business/detail/[id]",
              params: { id: "new" },
            })
          }
        >
          <Text>Agregar Negocio</Text>
        </Button>
      </View>
      <Separator className="my-2" />

      <View className="flex-1 ">
        <ScrollView showsVerticalScrollIndicator={false}>
          <MyBusinessCard />
          <MyBusinessCard />
          <MyBusinessCard />
        </ScrollView>
      </View>
    </View>
  );
};
