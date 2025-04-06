import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { View } from "react-native";

export const Error = () => {
  return (
    <View className="p-6 flex justify-center items-center">
      <Card>
        <CardContent className="p-0">
          <Text className="text-xl font-bold my-2">
            Upss!!! Algo ha ido mal
          </Text>
          <Text className="text-lg my-2">Por favor intente mas tarde</Text>
        </CardContent>
      </Card>
    </View>
  );
};
