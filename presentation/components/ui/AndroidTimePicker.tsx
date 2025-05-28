import { TouchableOpacity, View } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "./text";
import { useColorScheme } from "@/lib/useColorScheme";
import { Button } from "./button";
import { Timer } from "@/lib/icons/Icons";

interface Props {
  minDate: Date | undefined;
  end: Date;
  start: Date;
  index: number;
  handleDay: (start: number, end: number, day: string, index: number) => void;
}

export const AndroidTimePicker = ({
  end,
  start,
  minDate,
  index,
  handleDay,
}: Props) => {
  const [show, setShow] = useState({ since: false, until: false });

  const { isDarkColorScheme } = useColorScheme();
  const borderStyle = isDarkColorScheme ? "border-gray-700" : "border-gray-300";

  const [startTime, setStartTime] = useState<Date>(new Date(start));
  const [endTime, setEndTime] = useState<Date>(new Date(end));

  const onChangeStartTime = (_: any, selectedTime: Date | undefined) => {
    if (!selectedTime) return;
    const currentTime = selectedTime;
    handleDay(
      new Date(currentTime).getTime(),
      endTime.getTime(),
      "monday",
      index
    );
    setStartTime(currentTime);
  };

  const onChangeEndTime = (_: any, selectedTime: Date | undefined) => {
    if (!selectedTime) return;
    const currentTime = selectedTime;
    handleDay(
      startTime.getTime(),
      new Date(currentTime).getTime(),
      "monday",
      index
    );
    setEndTime(currentTime);
  };

  return (
    <View className="flex items-center">
      <View className="flex flex-row gap-4 justify-between items-center">
        <View className="my-2">
          <Text className="font-baloo-bold text-center">Desde</Text>
          <View className="flex-row gap-2">
            <Text>
              {startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <TouchableOpacity
              onPress={() => setShow((state) => ({ ...state, since: true }))}
            >
              <Timer className="text-foreground" size={24} />
            </TouchableOpacity>
          </View>
          {show.since && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={onChangeStartTime}
              is24Hour={false}
              minuteInterval={30}
              accentColor="#E91E63"
              minimumDate={minDate}
            />
          )}
        </View>
        <View>
          <Text className="font-baloo-bold text-center">Hasta</Text>
          <View className="flex-row gap-2">
            <Text>
              {endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <TouchableOpacity
              onPress={() => setShow((state) => ({ ...state, until: true }))}
            >
              <Timer className="text-foreground" size={24} />
            </TouchableOpacity>

            {show.until && (
              <DateTimePicker
                value={endTime}
                minimumDate={startTime}
                mode="time"
                display="default"
                onChange={onChangeEndTime}
                is24Hour={false}
                minuteInterval={30}
                accentColor="#E91E63"
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
