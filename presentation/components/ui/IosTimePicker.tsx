import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Text } from "./text";
import { useState } from "react";
import { Card, CardContent } from "./card";
import { Separator } from "./separator";
import { Switch } from "./switch";
import { LoadingIndicator } from "../feature";

interface Props {
  title: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  callback: (active: boolean) => Promise<void>;

  setTime: (startTime: number, endTime: number) => void;
}

export const IosTimePicker = ({
  startDate,
  endDate,
  title,
  isActive,
  setTime,
  callback,
}: Props) => {
  const [startTime, setStartTime] = useState<Date>(new Date(startDate));
  const [endTime, setEndTime] = useState<Date>(new Date(endDate));
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(isActive);

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

  const onCheckedChange = async () => {
    setLoading(true);
    await callback(!active);
    setActive(!active);
    setLoading(false);
  };

  return (
    <Card className="my-4">
      <CardContent>
        <View className="flex flex-row justify-between items-center">
          <Text className="my-2 font-baloo-bold text-2xl">{title}</Text>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Switch
              disabled={loading}
              checked={active}
              onCheckedChange={onCheckedChange}
            />
          )}
        </View>
        <Separator />
        <View className="flex items-center">
          <View className="flex flex-row gap-2 justify-between items-center">
            <View className="my-2">
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
