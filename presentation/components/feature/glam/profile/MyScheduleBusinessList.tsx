import { useScheduleBusiness } from "@/presentation/hooks/use-schedule-business.hook";
import { View } from "react-native";
import { MyScheduleBusinessLoading } from "./MyScheduleBusinessLoading";
import { MyScheduleBusinessCard } from "./MyScheduleBusinessCard";
import { Text } from "@/presentation/components/ui/text";
import { Separator } from "@/presentation/components/ui/separator";
import { useColorScheme } from "@/lib/useColorScheme";

export const MyScheduleBusinessList = () => {
  const { business, isLoading } = useScheduleBusiness();
  const { titleColor } = useColorScheme();

  if (isLoading) {
    return <MyScheduleBusinessLoading />;
  }

  return (
    <View className="flex-1 p-4 ">
      <Text className={`font-baloo-bold ${titleColor}`} numberOfLines={2}>
        Gestiona tus horarios
      </Text>
      <Separator className="my-2" />
      <Text className="text-md text-muted-foreground">
        Mantén actualizados los horarios para que los clientes puedan agendar
        citas.
      </Text>

      <View className="flex gap-2">
        {business?.map((business) => (
          <MyScheduleBusinessCard
            key={business.id}
            businessProfessional={business}
          />
        ))}
      </View>
    </View>
  );
};
