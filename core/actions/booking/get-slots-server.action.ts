import axiosClient from "@/core/api/axios-client";
import { Professional } from "@/core/interfaces/professional.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Slot } from "@/core/interfaces/slot.interface";
import { SlotMapper } from "@/core/mappers/slot.mapper";

export const getSlotsServerAction = async (
  professional: Professional | null,
  service: SubCategory | null,
  slotDate: Date
) => {
  try {
    const { data } = await axiosClient.post("booking/get-slots", {
      professional,
      service,
      slotDate,
    });

    const slots: Slot[] = data.data.map((slot: any) =>
      SlotMapper.fromSlotDBToSlot(slot)
    );

    return {
      status: true,
      data: slots,
    };
  } catch (error: any) {
    const message =
      error.status === 409
        ? "409"
        : "Ha ocurrido un error inesperado.\npor favor contacte con soporte";
    throw new Error(message);
  }
};
