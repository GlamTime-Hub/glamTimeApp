import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Text } from "./text";
import { useState } from "react";

interface Props {
  minDate: Date | undefined;
  end: Date;
  start: Date;
  index: number;
  handleDay: (start: number, end: number, day: string, index: number) => void;
}

export const IosTimePicker = ({
  end,
  start,
  minDate,
  index,
  handleDay,
}: Props) => {
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
      <View className="flex flex-row gap-2 justify-between items-center">
        <View className="my-2">
          <Text className="font-baloo-bold text-center">Desde</Text>
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
        </View>
        <View>
          <Text className="font-baloo-bold text-center">Hasta</Text>
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
        </View>
      </View>
    </View>
  );
};
