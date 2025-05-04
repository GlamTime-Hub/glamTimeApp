import { TouchableOpacity, View } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { Slot } from "@/core/interfaces/slot.interface";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { formatCurrency } from "@/presentation/utils/format-currency.util";
import { formatTime } from "@/presentation/utils/format-time.util";

interface Props {
  slot: Slot;

  callback: () => void;
}

export const BusinessProfessionalSlot = ({ slot, callback }: Props) => {
  return (
    <TouchableOpacity onPress={callback}>
      <Card className="my-2">
        <CardContent className="p-4">
          <Text className="text-center font-baloo-bold text-2xl">
            {slot.service.name}
          </Text>
          <Text className="text-center text-xl">{`$${formatCurrency(
            `${slot.service.price}`
          )}`}</Text>
          <View className="flex flex-row gap-2 justify-center">
            <Text className="text-xl">{formatTime(slot.startTime)}</Text>
            <Text className="text-xl">{"-"}</Text>
            <Text className="text-xl">{formatTime(slot.endTime)}</Text>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
