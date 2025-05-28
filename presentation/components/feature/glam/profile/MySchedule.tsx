import { View, ScrollView } from "react-native";
import { useMySchedule } from "@/presentation/hooks";
import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { MyScheduleLoading } from "./MyScheduleLoading";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { MyScheduleEmpty } from "./MyScheduleEmpty";
import { Schedule } from "@/presentation/components/ui/Schedule";

export const MySchedule = () => {
  const {
    professional,
    schedule,
    isLoading,
    loading,
    handleDay,
    onSaveSchedule,
    addTime,
    onDelete,
  } = useMySchedule();

  if (isLoading) {
    return <MyScheduleLoading />;
  }

  if (!professional || !schedule) {
    return <MyScheduleEmpty />;
  }

  return (
    <View className="flex-1 p-4 justify-between">
      <ScrollView showsVerticalScrollIndicator={false} className="mb-2">
        <Text className="text-center font-baloo-bold text-xl">
          Gestiona tus horarios
        </Text>
        <View className="flex-1 ">
          <Schedule
            title="Lunes"
            schedule={schedule.monday}
            add={(end) => addTime(end, "monday")}
            handleDay={handleDay}
            onDelete={(index) => onDelete("monday", index)}
            day="monday"
          />
          <Schedule
            title="Martes"
            schedule={schedule.tuesday}
            add={(end) => addTime(end, "tuesday")}
            handleDay={handleDay}
            onDelete={(index) => onDelete("tuesday", index)}
            day="tuesday"
          />

          <Schedule
            title="Miercoles"
            schedule={schedule.wednesday}
            add={(end) => addTime(end, "wednesday")}
            handleDay={handleDay}
            onDelete={(index) => onDelete("wednesday", index)}
            day="wednesday"
          />

          <Schedule
            title="Jueves"
            schedule={schedule.thursday}
            add={(end) => addTime(end, "thursday")}
            handleDay={handleDay}
            onDelete={(index) => onDelete("thursday", index)}
            day="thursday"
          />

          <Schedule
            title="Viernes"
            schedule={schedule.friday}
            add={(end) => addTime(end, "friday")}
            handleDay={handleDay}
            onDelete={(index) => onDelete("friday", index)}
            day="friday"
          />

          <Schedule
            title="Sábado"
            schedule={schedule.saturday}
            add={(end) => addTime(end, "saturday")}
            handleDay={handleDay}
            onDelete={(index) => onDelete("saturday", index)}
            day="saturday"
          />
          <Schedule
            title="Domingo"
            schedule={schedule.sunday}
            add={(end) => addTime(end, "sunday")}
            handleDay={handleDay}
            onDelete={(index) => onDelete("sunday", index)}
            day="sunday"
          />
        </View>
      </ScrollView>
      <View className="">
        <Button
          disabled={loading}
          onPress={onSaveSchedule}
          className="flex flex-row gap-2 "
        >
          {loading && <LoadingIndicator />}
          <Text>Guardar</Text>
        </Button>
      </View>
    </View>
  );
};
