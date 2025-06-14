import { ScrollView, View } from "react-native";
import { MyBusinessCard } from "./MyBusinessCard";
import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { router } from "expo-router";
import { useProfileBusiness } from "@/presentation/hooks";
import { MyBusinessLoading } from "./MyBusinessLoading";
import { Business } from "@/core/interfaces/business.interface";
import { MyBusinessEmpty } from "./MyBusinessEmpty";

export const MyBusiness = () => {
  const { data, isError, isLoading } = useProfileBusiness();

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
        <Text className="font-baloo-bold text-xl">Gestiona tus negocios</Text>
        <Button
          size={"sm"}
          onPress={() =>
            router.push({
              pathname:
                "/glam/(tabs)/profile/my-business/business-profile/[id]",
              params: { id: "new" },
            })
          }
        >
          <Text>Agregar Negocio</Text>
        </Button>
      </View>
      <Separator className="my-2" />

      {data.length ? (
        <View className="flex-1 ">
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((business: Business) => (
              <MyBusinessCard key={business.id} business={business} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <MyBusinessEmpty />
      )}
    </View>
  );
};
