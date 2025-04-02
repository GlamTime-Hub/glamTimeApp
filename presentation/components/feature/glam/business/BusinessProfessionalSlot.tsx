import { TouchableOpacity, View } from "react-native";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { formatTime } from "../../../../utils/format-time.util";
import { Separator } from "@/presentation/components/ui/separator";
import { useBusinessBookingStore } from "@/presentation/store/useBusinessBooking.store";
import { cn } from "@/lib/util";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  slot: any;

  callback: () => void;
}

export const BusinessProfessionalSlot = ({ slot, callback }: Props) => {
  const { slot: slotSelected } = useBusinessBookingStore();

  const { isDarkColorScheme } = useColorScheme();

  const isSelected =
    slotSelected &&
    slot.startTime === slotSelected.startTime &&
    slot.endTime === slotSelected.endTime &&
    slot.date === slotSelected.date;

  const colorText =
    !isSelected && isDarkColorScheme ? "text-white" : "text-black";

  return (
    <TouchableOpacity onPress={callback}>
      <View className={cn(isSelected ? " bg-green-200 rounded" : "", "px-6")}>
        <View className="flex my-2 flex-row justify-center items-center">
          <View>
            <View className="flex  flex-row gap-2">
              <Text className={`font-bold ${colorText}`}>
                {formatTime(slot.startTime)}
              </Text>
              <Text className={`font-bold ${colorText}`}>-</Text>
              <Text className={`font-bold ${colorText}`}>
                {formatTime(slot.endTime)}
              </Text>
            </View>
          </View>
        </View>
        {!isSelected && <Separator />}
      </View>
    </TouchableOpacity>
  );
};
