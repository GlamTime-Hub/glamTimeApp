import { Platform, View } from "react-native";
import { useMySchedule } from "@/presentation/hooks";
import { IosTimePicker } from "@/presentation/components/ui/IosTimePicker";
import { ScrollView } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { MyScheduleLoading } from "./MyScheduleLoading";
import { LoadingIndicator } from "../shared/LoadingIndicator";

const isIos = Platform.OS === "ios";

export const MySchedule = () => {
  const { schedule, isLoading, loading, handleDay, onSaveSchedule } =
    useMySchedule();

  if (isLoading || !schedule) {
    return <MyScheduleLoading />;
  }

  return (
    <View className="flex-1 p-6">
      <ScrollView showsVerticalScrollIndicator={false} className="mb-2">
        <Text className="text-center font-baloo-bold text-xl">
          Gestiona tus horarios
        </Text>
        {isIos && (
          <View className="flex-1 ">
            <IosTimePicker
              title="Lunes"
              startDate={new Date(schedule.monday.start)}
              endDate={new Date(schedule.monday.end)}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "monday")
              }
            />

            <IosTimePicker
              title="Martes"
              startDate={new Date(schedule.tuesday.start)}
              endDate={new Date(schedule.tuesday.end)}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "tuesday")
              }
            />

            <IosTimePicker
              title="Miercoles"
              startDate={new Date(schedule.wednesday.start)}
              endDate={new Date(schedule.wednesday.end)}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "wednesday")
              }
            />

            <IosTimePicker
              title="Jueves"
              startDate={new Date(schedule.thursday.start)}
              endDate={new Date(schedule.thursday.end)}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "thursday")
              }
            />

            <IosTimePicker
              title="Viernes"
              startDate={new Date(schedule.friday.start)}
              endDate={new Date(schedule.friday.end)}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "friday")
              }
            />

            <IosTimePicker
              title="Sábado"
              startDate={new Date(schedule.saturday.start)}
              endDate={new Date(schedule.saturday.end)}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "saturday")
              }
            />
          </View>
        )}
        {!isIos && <View></View>}
      </ScrollView>
      <Button
        disabled={loading}
        onPress={onSaveSchedule}
        className="flex flex-row gap-2"
      >
        {loading && <LoadingIndicator />}
        <Text>Guardar</Text>
      </Button>
    </View>
  );
};
