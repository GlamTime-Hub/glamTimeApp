import { TouchableOpacity, View } from "react-native";
import { Text } from "./text";
import { Card, CardContent } from "./card";
import { Separator } from "./separator";
import { Button } from "./button";
import { Trash2 } from "@/lib/icons/Icons";
import { AndroidTimePicker } from "./AndroidTimePicker";

interface Props {
  title: string;
  schedule: {
    end: number;
    start: number;
  }[];
  add: (end: number) => void;
  handleDay: (start: number, end: number, day: string, index: number) => void;
  onDelete: (index: number) => void;
}

export const AndroidSchedule = ({
  title,
  schedule,
  add,
  handleDay,
  onDelete,
}: Props) => {
  return (
    <Card className="my-4">
      <CardContent>
        <View className="flex flex-row justify-between items-center my-2">
          <Text className=" font-baloo-bold text-2xl">{title}</Text>
          <Button
            size={"sm"}
            onPress={() => add(schedule[schedule.length - 1].end)}
          >
            <Text>Agregar franja</Text>
          </Button>
        </View>
        <Separator />

        {schedule.map((item, index) => (
          <View
            key={title + index + item.start + item.end}
            className="flex-row gap-2 items-center justify-center"
          >
            <AndroidTimePicker
              start={new Date(item.start)}
              end={new Date(item.end)}
              index={index}
              minDate={
                index === 0 ? undefined : new Date(schedule[index - 1].end)
              }
              handleDay={handleDay}
            />
            <TouchableOpacity
              onPress={() => onDelete(index)}
              className="mt-5 ml-10"
              disabled={index === 0}
            >
              <Trash2 className="text-destructive" />
            </TouchableOpacity>
          </View>
        ))}
      </CardContent>
    </Card>
  );
};
