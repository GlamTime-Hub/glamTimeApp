import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Text } from "./text";

interface Props {
  title: string;
  timeStart: Date;
  timeEnd: Date;

  setTime: (time: Date, type: string) => void;
}

export const IosTimePicker = ({
  timeStart,
  timeEnd,
  title,
  setTime,
}: Props) => {
  console.log("timeEnd", timeEnd);
  console.log("timeStart", timeStart);

  const onChange = (selectedTime: any, type: string) => {
    const currentTime = selectedTime;
    console.log("onChange", currentTime);

    if (type === "start" && currentTime > timeEnd) return;
    if (type === "end" && currentTime < timeStart) return;

    console.log("cojones", currentTime);
    console.log("cojones 2", timeEnd);

    setTime(currentTime, type);
  };

  return (
    <View className="flex-1">
      <Text className="my-2">{title}</Text>
      <View className="flex flex-row gap-2">
        <DateTimePicker
          value={timeStart}
          mode="time"
          display="default"
          onChange={(_, selectedTime) => onChange(selectedTime, "start")}
          is24Hour={false}
          accentColor="#E91E63"
        />

        <DateTimePicker
          value={timeEnd}
          mode="time"
          display="default"
          onChange={(_, selectedTime) => onChange(selectedTime, "end")}
          is24Hour={false}
          accentColor="#E91E63"
        />
      </View>
    </View>
  );
};
