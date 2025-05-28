import { View } from "react-native";

import { Text } from "./text";
import { useState } from "react";
import { WheelTimePicker } from "./WheelTimePicker";

interface Props {
  minTime: number;
  end: number;
  start: number;
  index: number;
  day: string;
  handleDay: (start: number, end: number, day: string, index: number) => void;
}

export const TimePicker = ({
  end,
  start,
  minTime,
  index,
  handleDay,
  day,
}: Props) => {
  const [startTime, setStartTime] = useState<number>(start);
  const [endTime, setEndTime] = useState<number>(end);

  const onChangeStartTime = (start: number) => {
    if (!start) return;
    handleDay(start, endTime, day, index);
    setStartTime(start);
  };

  const onChangeEndTime = (end: number) => {
    if (!end) return;
    handleDay(startTime, end, day, index);
    setEndTime(end);
  };

  return (
    <View className="flex items-center">
      <View className="flex flex-row gap-2 justify-between items-center">
        <View className="my-2">
          <Text className="font-baloo-bold text-center">Desde</Text>
          <WheelTimePicker
            minTime={minTime}
            maxTime={23.5}
            initialTime={start}
            onChange={onChangeStartTime}
          />
        </View>
        <View>
          <Text className="font-baloo-bold text-center">Hasta</Text>
          <WheelTimePicker
            minTime={startTime}
            maxTime={23.5}
            initialTime={end}
            onChange={onChangeEndTime}
          />
        </View>
      </View>
    </View>
  );
};
