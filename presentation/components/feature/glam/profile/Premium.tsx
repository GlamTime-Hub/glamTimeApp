import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { usePremium } from "@/presentation/hooks";
import { View } from "react-native";
import { PremiumLoading } from "./PremiumLoading";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { PremiumRequestPending } from "./PremiumRequestPending";

export const Premium = () => {
  const { data, isLoading, loading, requestPremium } = usePremium();

  console.log("data", data);

  if (isLoading) {
    return <PremiumLoading />;
  }

  if (data.data) {
    return <PremiumRequestPending isActive={data.data.active} />;
  }

  return (
    <View className="flex-1 flex justify-between p-4">
      <Card>
        <CardContent className="py-4">
          <Text className="font-baloo-bold text-xl text-center">
            Querio ser premium
          </Text>
          <Text className="my-6 text-justify">
            Ser premium implica que podrás administrar tus negocios y
            profesionales, gestionar los servicios que tu negocio ofrece y poder
            ofrecerlos a los usuarios.
          </Text>
        </CardContent>
      </Card>
      <Button className="flex flex-row gap-2" onPress={requestPremium}>
        {loading && <LoadingIndicator />}
        <Text>Enviar Solicitud</Text>
      </Button>
    </View>
  );
};
