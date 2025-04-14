import { ScrollView, Text, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";

export const ContactMessage = () => {
  return (
    <View className="flex-1 p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card className="flex-1 ">
          <CardContent>
            <View className="items-center justify-center py-10">
              <Text className="text-center text-lg text-gray-500">
                Aún no has recibido reseñas.
              </Text>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </View>
  );
};
