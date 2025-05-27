import { useEffect, useState } from "react";
import { useProfessional } from "./use-professional.hook";
import { decimalToDateNumber } from "../utils/decimal-to-date-number.util";
import { timestampToDecimalHour } from "../utils/timestamp-to-decimal-hour.util";
import { updateProfessionalById } from "../../core/actions/professional/update-professional.action";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/use-user.store";
import { useLocalSearchParams } from "expo-router";

const defaultDate = new Date();
defaultDate.setHours(8, 0, 0, 0);

export const useMySchedule = () => {
  const { user } = useUserStore();
  const { businessId } = useLocalSearchParams();

  const { professional, isError, isLoading } = useProfessional(
    user?.id || "",
    businessId as string
  );
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const [schedule, setSchedule] = useState<
    | {
        monday: { start: number; end: number }[];
        tuesday: { start: number; end: number }[];
        wednesday: { start: number; end: number }[];
        thursday: { start: number; end: number }[];
        friday: { start: number; end: number }[];
        saturday: { start: number; end: number }[];
        sunday: { start: number; end: number }[];
      }
    | undefined
  >();

  const handleDay = (
    startTime: number,
    endTime: number,
    day: string,
    index: number
  ) => {
    setSchedule((prevSchedule: any) => {
      const newSchedule = { ...prevSchedule };

      if (newSchedule[day]) {
        newSchedule[day][index] = {
          start: startTime,
          end: endTime,
        };
      }

      return newSchedule;
    });
  };

  const addTime = (end: number, day: string) => {
    const newEnd = timestampToDecimalHour(end);

    setSchedule((prevSchedule: any) => {
      return {
        ...prevSchedule,
        [day]: [
          ...(prevSchedule ? prevSchedule[day] : []),
          {
            start: decimalToDateNumber(newEnd),
            end: decimalToDateNumber(newEnd + 1),
          },
        ],
      };
    });
  };

  const onDelete = (day: string, index: number) => {
    setSchedule((prevSchedule: any) => {
      const newSchedule = { ...prevSchedule };

      if (newSchedule[day]) {
        newSchedule[day].splice(index, 1);
      }

      return newSchedule;
    });
  };

  const onSaveSchedule = async () => {
    setLoading(true);
    const scheduleToSave = {
      monday:
        schedule?.monday.map((monday) => ({
          start: timestampToDecimalHour(monday.start),
          end: timestampToDecimalHour(monday.end),
        })) || [],
      tuesday:
        schedule?.tuesday.map((tuesday) => ({
          start: timestampToDecimalHour(tuesday.start),
          end: timestampToDecimalHour(tuesday.end),
        })) || [],
      wednesday:
        schedule?.wednesday.map((wednesday) => ({
          start: timestampToDecimalHour(wednesday.start),
          end: timestampToDecimalHour(wednesday.end),
        })) || [],
      thursday:
        schedule?.thursday.map((thursday) => ({
          start: timestampToDecimalHour(thursday.start),
          end: timestampToDecimalHour(thursday.end),
        })) || [],
      friday:
        schedule?.friday.map((friday) => ({
          start: timestampToDecimalHour(friday.start),
          end: timestampToDecimalHour(friday.end),
        })) || [],
      saturday:
        schedule?.saturday.map((saturday) => ({
          start: timestampToDecimalHour(saturday.start),
          end: timestampToDecimalHour(saturday.end),
        })) || [],
      sunday:
        schedule?.sunday.map((sunday) => ({
          start: timestampToDecimalHour(sunday.start),
          end: timestampToDecimalHour(sunday.end),
        })) || [],
    };

    const { user, ...rest } = professional!;

    const professionalToUpdate = {
      ...rest,
      user: user.id,
      workingHours: scheduleToSave,
      businessId,
    };

    await updateProfessionalById(professionalToUpdate);

    queryClient.invalidateQueries({
      queryKey: ["schedule", `${user.id}-${businessId}`],
    });

    Toast.show({
      type: "success",
      text1: "Horario actualizado",
      text2: "Tu horario ha sido actualizado correctamente.",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (professional) {
      const newSchedule = {
        monday: professional.workingHours.monday.map((monday) => ({
          start: decimalToDateNumber(monday.start),
          end: decimalToDateNumber(monday.end),
        })),
        tuesday: professional.workingHours.tuesday.map((tuesday) => ({
          start: decimalToDateNumber(tuesday.start),
          end: decimalToDateNumber(tuesday.end),
        })),
        wednesday: professional.workingHours.wednesday.map((wednesday) => ({
          start: decimalToDateNumber(wednesday.start),
          end: decimalToDateNumber(wednesday.end),
        })),
        thursday: professional.workingHours.thursday.map((thursday) => ({
          start: decimalToDateNumber(thursday.start),
          end: decimalToDateNumber(thursday.end),
        })),
        friday: professional.workingHours.friday.map((friday) => ({
          start: decimalToDateNumber(friday.start),
          end: decimalToDateNumber(friday.end),
        })),
        saturday: professional.workingHours.saturday.map((saturday) => ({
          start: decimalToDateNumber(saturday.start),
          end: decimalToDateNumber(saturday.end),
        })),
        sunday: professional.workingHours.sunday.map((sunday) => ({
          start: decimalToDateNumber(sunday.start),
          end: decimalToDateNumber(sunday.end),
        })),
      };

      setSchedule(newSchedule);
    }
  }, [professional]);

  return {
    professional,
    isError,
    isLoading,
    schedule,
    loading,
    handleDay,
    addTime,
    onSaveSchedule,
    onDelete,
  };
};
