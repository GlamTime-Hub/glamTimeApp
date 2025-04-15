import { View } from "react-native";
import * as Updates from "expo-updates";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { router } from "expo-router";

export const Error = () => {
  const fullReload = async () => {
    await Updates.reloadAsync();
    router.push("/glam/(tabs)/home");
  };

  return (
    <View className="p-6 flex justify-center items-center">
      <Card>
        <CardContent className="">
          <Text className="text-xl font-baloo-bold my-2">
            Upss!!! Algo ha ido mal
          </Text>
          <Text className="text-lg my-2">Por favor intente mas tarde</Text>
          <Button onPress={fullReload}>
            <Text className="text-lg my-2">Recargar</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};
