import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Text } from "./text";
import { useState } from "react";
import { Card, CardContent } from "./card";
import { Separator } from "./separator";

interface Props {
  title: string;
  startDate: Date;
  endDate: Date;

  setTime: (startTime: number, endTime: number) => void;
}

export const IosTimePicker = ({
  startDate,
  endDate,
  title,
  setTime,
}: Props) => {
  const [startTime, setStartTime] = useState<Date>(new Date(startDate));
  const [endTime, setEndTime] = useState<Date>(new Date(endDate));

  const onChangeStartTime = (_: any, selectedTime: Date | undefined) => {
    if (!selectedTime) return;
    const currentTime = selectedTime;

    setStartTime(currentTime);
    setTime(new Date(currentTime).getTime(), new Date(endTime).getTime());
  };

  const onChangeEndTime = (_: any, selectedTime: Date | undefined) => {
    if (!selectedTime) return;
    const currentTime = selectedTime;
    setEndTime(currentTime);
    setTime(startTime.getTime(), currentTime.getTime());
  };

  return (
    <Card className="my-4">
      <CardContent>
        <View className="flex items-center">
          <Text className="my-2 font-baloo-bold text-2xl">{title}</Text>
          <Separator />
          <View className="flex flex-row gap-2 justify-between items-center">
            <View>
              <Text className="font-bold text-center">Desde</Text>
              <DateTimePicker
                value={startTime}
                mode="time"
                display="default"
                onChange={onChangeStartTime}
                is24Hour={false}
                minuteInterval={30}
                accentColor="#E91E63"
              />
            </View>
            <View>
              <Text className="font-bold text-center">Hasta</Text>
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
      </CardContent>
    </Card>
  );
};
