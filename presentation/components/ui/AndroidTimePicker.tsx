import { View } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "./text";
import { useColorScheme } from "@/lib/useColorScheme";
import { Button } from "./button";
import { Timer } from "@/lib/icons/Icons";

interface Props {
  title: string;
  time: Date;

  setTime: (time: Date) => void;
}

export const AndroidTimePicker = ({ title, time, setTime }: Props) => {
  const [show, setShow] = useState(false);

  const { isDarkColorScheme } = useColorScheme();

  const borderStyle = isDarkColorScheme ? "border-gray-700" : "border-gray-300";

  const onChange = (_: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
  };

  return (
    <View className="flex-1">
      <Text className="my-2">{title}</Text>
      <View className="flex flex-row gap-2">
        <Text className={`border-2 ${borderStyle}`}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
        <Button variant={"ghost"} onPress={() => setShow(true)} size={"icon"}>
          <Timer className="text-foreground" size={24} />
        </Button>
        {show && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onChange}
            is24Hour={false}
            accentColor="#E91E63"
          />
        )}
      </View>
    </View>
  );
};
