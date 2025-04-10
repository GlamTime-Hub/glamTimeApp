import { useState } from "react";
import Toast from "react-native-toast-message";

export const useMySchedule = () => {
  const [schedule, setSchedule] = useState<{
    [key: string]: { start: Date; end: Date };
  }>({
    monday: {
      start: new Date(),
      end: new Date(),
    },
  });

  const handleDay = (time: Date, type: string, day: string) => {
    const currentDay = schedule[day];

    console.log("currentDay", currentDay);
    console.log("type", type);
    console.log("day", day);
    console.log("time", time);

    if (type === "start" && time > currentDay.end) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "La hora de inicio no puede ser mayor que la hora de fin",
      });
      console.log(1);
      return;
    }

    if (type === "end" && time < currentDay.start) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "La hora de fin no puede ser menor que la hora de inicio",
      });
      console.log(2);
      return;
    }

    setSchedule((prev) => {
      console.log("prev", prev);
      return {
        ...prev,
        [day]: {
          start: type === "start" ? time : prev[day].start,
          end: type === "end" ? time : prev[day].end,
        },
      };
    });
  };

  return { schedule, handleDay };
};
