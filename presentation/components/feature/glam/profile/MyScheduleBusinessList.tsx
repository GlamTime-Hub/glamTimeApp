import { useScheduleBusiness } from "@/presentation/hooks/use-schedule-business.hook";
import { View } from "react-native";
import { MyScheduleBusinessLoading } from "./MyScheduleBusinessLoading";
import { MyScheduleBusinessCard } from "./MyScheduleBusinessCard";
import { Text } from "@/presentation/components/ui/text";
import { Separator } from "@/presentation/components/ui/separator";

export const MyScheduleBusinessList = () => {
  const { business, isLoading } = useScheduleBusiness();

  if (isLoading) {
    return <MyScheduleBusinessLoading />;
  }

  return (
    <View className="flex-1 p-4 ">
      <Text>Gestiona tus horarios en los negocios que trabajas.</Text>
      <Separator className="my-2" />
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
