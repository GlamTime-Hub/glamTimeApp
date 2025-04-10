import { Platform, View } from "react-native";
import { useMySchedule } from "@/presentation/hooks";
import { IosTimePicker } from "@/presentation/components/ui/IosTimePicker";

const isIos = Platform.OS === "ios";

export const MySchedule = () => {
  const { schedule, handleDay } = useMySchedule();

  return (
    <View>
      {isIos && (
        <View>
          <IosTimePicker
            title="Lunes"
            timeStart={schedule["monday"]["start"]}
            timeEnd={schedule["monday"]["end"]}
            setTime={(time, type) => handleDay(time, type, "monday")}
          />
        </View>
      )}
      {!isIos && <View></View>}
    </View>
  );
};
