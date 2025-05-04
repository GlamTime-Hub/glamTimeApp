import { Platform, View, ScrollView } from "react-native";
import { useMySchedule } from "@/presentation/hooks";
import { IosTimePicker } from "@/presentation/components/ui/IosTimePicker";
import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { MyScheduleLoading } from "./MyScheduleLoading";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { MyScheduleEmpty } from "./MyScheduleEmpty";

const isIos = Platform.OS === "ios";

export const MySchedule = () => {
  const {
    professional,
    schedule,
    isLoading,
    loading,
    handleDay,
    onSaveSchedule,
    onActiveDay,
  } = useMySchedule();

  if (isLoading) {
    return <MyScheduleLoading />;
  }

  if (!professional || !schedule) {
    return <MyScheduleEmpty />;
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
              isActive={schedule.monday.isActive}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "monday")
              }
              callback={async (isActive: boolean) =>
                onActiveDay("monday", isActive)
              }
            />

            <IosTimePicker
              title="Martes"
              startDate={new Date(schedule.tuesday.start)}
              endDate={new Date(schedule.tuesday.end)}
              isActive={schedule.tuesday.isActive}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "tuesday")
              }
              callback={async (isActive: boolean) =>
                onActiveDay("tuesday", isActive)
              }
            />

            <IosTimePicker
              title="Miercoles"
              startDate={new Date(schedule.wednesday.start)}
              endDate={new Date(schedule.wednesday.end)}
              isActive={schedule.wednesday.isActive}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "wednesday")
              }
              callback={async (isActive: boolean) =>
                onActiveDay("wednesday", isActive)
              }
            />

            <IosTimePicker
              title="Jueves"
              startDate={new Date(schedule.thursday.start)}
              endDate={new Date(schedule.thursday.end)}
              isActive={schedule.thursday.isActive}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "thursday")
              }
              callback={async (isActive: boolean) =>
                onActiveDay("thursday", isActive)
              }
            />

            <IosTimePicker
              title="Viernes"
              startDate={new Date(schedule.friday.start)}
              endDate={new Date(schedule.friday.end)}
              isActive={schedule.friday.isActive}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "friday")
              }
              callback={async (isActive: boolean) =>
                onActiveDay("friday", isActive)
              }
            />

            <IosTimePicker
              title="Sábado"
              startDate={new Date(schedule.saturday.start)}
              endDate={new Date(schedule.saturday.end)}
              isActive={schedule.saturday.isActive}
              setTime={(startTime, endTime) =>
                handleDay(startTime, endTime, "saturday")
              }
              callback={async (isActive: boolean) =>
                onActiveDay("saturday", isActive)
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
