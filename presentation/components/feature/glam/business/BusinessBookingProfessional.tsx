import { ScrollView, View } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { BusinessProfessionalCard } from "./BusinessProfessionalCard";
import { useBookingProfessional } from "@/presentation/hooks";
import { BusinessBookingProfessionalLoading } from "./BusinessBookingProfessionalLoading";

export const BusinessBookingProfessional = () => {
  const { professionals, isLoading, onSelectProfessional } =
    useBookingProfessional();

  if (isLoading) {
    return <BusinessBookingProfessionalLoading />;
  }

  return (
    <View className="flex-1 p-6">
      <Text className="text-center font-bold text-2xl">
        Un paso más y tu reserva estará lista
      </Text>
      <Text className="text-center font-bold text-xl my-2">
        ¿Con quién quieres tu cita?
      </Text>

      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {professionals?.map((prof) => (
            <BusinessProfessionalCard
              key={prof.id}
              professional={prof}
              callback={() => onSelectProfessional(prof)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
