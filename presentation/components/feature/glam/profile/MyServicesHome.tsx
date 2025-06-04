import { Business } from "@/core/interfaces/business.interface";
import { Separator } from "@/presentation/components/ui/separator";
import { Text } from "@/presentation/components/ui/text";
import { ScrollView, View } from "react-native";
import { MyBusinessCard } from "./MyBusinessCard";
import { MyBusinessEmpty } from "./MyBusinessEmpty";
import { router } from "expo-router";
import { MyBusinessLoading } from "./MyBusinessLoading";
import { useBusinessProfessional } from "@/presentation/hooks/use-business-professional.hook";

export const MyServiceHome = () => {
  const { data, isError, isLoading } = useBusinessProfessional();

  if (isError) {
    router.push("/glam/(tabs)/profile/home");
    return;
  }

  if (isLoading) {
    return <MyBusinessLoading />;
  }

  return (
    <View className="flex-1 p-4">
      <View className=" ">
        <Text className="font-baloo-bold text-xl">Gestiona tus servicios</Text>
      </View>
      <Separator className="my-2" />
      <Text className="text-md text-muted-foreground">
        Mantén actualizados los servicios que ofreces en los negocios que
        trabajas.
      </Text>

      {data.length ? (
        <View className="flex-1 ">
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((business: Business) => (
              <MyBusinessCard
                key={business.id}
                business={business}
                fromProfessional={true}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <MyBusinessEmpty />
      )}
    </View>
  );
};
