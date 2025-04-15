import { useEffect, useState } from "react";
import { useProfessional } from "./use-professional.hook";
import { useUser } from "./use-user.hook";
import { decimalToDateNumber } from "../utils/decimal-to-date-number.util";
import { timestampToDecimalHour } from "../utils/timestamp-to-decimal-hour.util";
import { updateProfessionalById } from "../../core/actions/professional/update-professional.action";
import Toast from "react-native-toast-message";
import { handleWorkingHours } from "@/core/actions/professional/handle-working-hours.action";
import { useQueryClient } from "@tanstack/react-query";

const defaultDate = new Date();
defaultDate.setHours(8, 0, 0, 0);

export const useMySchedule = () => {
  const { user } = useUser();
  const { professional, isError, isLoading } = useProfessional(user?.id || "");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const [schedule, setSchedule] = useState<
    | {
        monday: { start: number; end: number; isActive: boolean };
        tuesday: { start: number; end: number; isActive: boolean };
        wednesday: { start: number; end: number; isActive: boolean };
        thursday: { start: number; end: number; isActive: boolean };
        friday: { start: number; end: number; isActive: boolean };
        saturday: { start: number; end: number; isActive: boolean };
      }
    | undefined
  >();

  const handleDay = (startTime: number, endTime: number, day: string) => {
    setSchedule((prevSchedule) => {
      if (!prevSchedule) return undefined;

      return {
        ...prevSchedule,
        [day]: {
          start: startTime,
          end: endTime,
        },
      };
    });
  };

  const onSaveSchedule = async () => {
    setLoading(true);
    const scheduleToSave = {
      monday: {
        start: timestampToDecimalHour(schedule!.monday.start),
        end: timestampToDecimalHour(schedule!.monday.end),
      },
      tuesday: {
        start: timestampToDecimalHour(schedule!.tuesday.start),
        end: timestampToDecimalHour(schedule!.tuesday.end),
      },
      wednesday: {
        start: timestampToDecimalHour(schedule!.wednesday.start),
        end: timestampToDecimalHour(schedule!.wednesday.end),
      },
      thursday: {
        start: timestampToDecimalHour(schedule!.thursday.start),
        end: timestampToDecimalHour(schedule!.thursday.end),
      },
      friday: {
        start: timestampToDecimalHour(schedule!.friday.start),
        end: timestampToDecimalHour(schedule!.friday.end),
      },
      saturday: {
        start: timestampToDecimalHour(schedule!.saturday.start),
        end: timestampToDecimalHour(schedule!.saturday.end),
      },
    };

    const { user, ...rest } = professional!;

    const professionalToUpdate = {
      ...rest,
      user: user.id,
      workingHours: scheduleToSave,
    };

    await updateProfessionalById(professionalToUpdate);

    queryClient.invalidateQueries({ queryKey: ["schedule", user?.id] });

    Toast.show({
      type: "success",
      text1: "Horario actualizado",
      text2: "Tu horario ha sido actualizado correctamente.",
    });

    setLoading(false);
  };

  const onActiveDay = async (day: string, isActive: boolean) => {
    const active = {
      professionalId: professional?.id,
      day,
      isActive,
    };

    const labels: { [key: string]: string } = {
      monday: "lunes",
      tuesday: "martes",
      wednesday: "miércoles",
      thursday: "jueves",
      friday: "viernes",
      saturday: "sábado",
    };

    await handleWorkingHours(active);

    queryClient.invalidateQueries({ queryKey: ["schedule", user?.id] });

    Toast.show({
      type: "success",
      text1: "Horario actualizado",
      text2: `El horario del ${labels[day]} ha sido ${
        isActive ? "activado." : "desactivado."
      }`,
    });
  };

  useEffect(() => {
    if (professional) {
      const newSchedule = {
        monday: {
          start: decimalToDateNumber(professional.workingHours.monday.start),
          end: decimalToDateNumber(professional.workingHours.monday.end),
          isActive: professional.workingHours.monday.isActive,
        },
        tuesday: {
          start: decimalToDateNumber(professional.workingHours.tuesday.start),
          end: decimalToDateNumber(professional.workingHours.tuesday.end),
          isActive: professional.workingHours.tuesday.isActive,
        },
        wednesday: {
          start: decimalToDateNumber(professional.workingHours.wednesday.start),
          end: decimalToDateNumber(professional.workingHours.wednesday.end),
          isActive: professional.workingHours.wednesday.isActive,
        },
        thursday: {
          start: decimalToDateNumber(professional.workingHours.thursday.start),
          end: decimalToDateNumber(professional.workingHours.thursday.end),
          isActive: professional.workingHours.thursday.isActive,
        },
        friday: {
          start: decimalToDateNumber(professional.workingHours.friday.start),
          end: decimalToDateNumber(professional.workingHours.friday.end),
          isActive: professional.workingHours.friday.isActive,
        },
        saturday: {
          start: decimalToDateNumber(professional.workingHours.saturday.start),
          end: decimalToDateNumber(professional.workingHours.saturday.end),
          isActive: professional.workingHours.saturday.isActive,
        },
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
    onSaveSchedule,
    onActiveDay,
  };
};
