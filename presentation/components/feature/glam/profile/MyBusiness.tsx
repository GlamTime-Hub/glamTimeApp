import { ScrollView, View } from "react-native";
import { MyBusinessCard } from "./MyBusinessCard";
import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { router } from "expo-router";
import { useBusiness } from "@/presentation/hooks";
import { MyBusinessLoading } from "./MyBusinessLoading";
import { Business } from "@/core/interfaces/business.interface";

export const MyBusiness = () => {
  const { data, isError, isLoading } = useBusiness();

  if (isError) {
    router.push("/glam/(tabs)/profile/home");
    return;
  }

  if (isLoading) {
    return <MyBusinessLoading />;
  }

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
          {data.map((business: Business) => (
            <MyBusinessCard key={business.id} business={business} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
