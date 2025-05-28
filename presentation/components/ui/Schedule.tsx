import { View } from "react-native";
import { Text } from "./text";
import { Card, CardContent } from "./card";
import { Separator } from "./separator";
import { Button } from "./button";
import { Trash2 } from "@/lib/icons/Icons";
import { TimePicker } from "./TimePicker";

interface Props {
  title: string;
  day: string;
  schedule: {
    end: number;
    start: number;
  }[];
  add: (end: number) => void;
  handleDay: (start: number, end: number, day: string, index: number) => void;
  onDelete: (index: number) => void;
}

export const Schedule = ({
  title,
  schedule,
  day,
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
            {/* <IosTimePicker
              start={new Date(item.start)}
              end={new Date(item.end)}
              index={index}
              minDate={
                index === 0 ? undefined : new Date(schedule[index - 1].end)
              }
              handleDay={handleDay}
            /> */}

            <TimePicker
              minTime={index === 0 ? 5.5 : schedule[index - 1].end}
              start={item.start}
              end={item.end}
              handleDay={handleDay}
              index={index}
              day={day}
            />
            <Button
              onPress={() => onDelete(index)}
              variant={"ghost"}
              size={"icon"}
              className="mt-5"
              disabled={index === 0}
            >
              <Trash2 className="text-destructive" />
            </Button>
          </View>
        ))}
      </CardContent>
    </Card>
  );
};
