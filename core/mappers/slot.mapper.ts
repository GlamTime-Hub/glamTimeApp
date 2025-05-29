import { Slot } from "../interfaces/slot.interface";

export class SlotMapper {
  static fromSlotDBToSlot(slot: any): Slot {
    return {
      date: new Date(slot.date),
      endTime: slot.endTime,
      fullDate: slot.fullDate,
      professional: {
        businessId: slot.professional.businessId,
        id: slot.professional.id,
      },
      service: {
        categoryId: slot.service.categoryId,
        id: slot.service.id,
        name: slot.service.name,
        price: slot.service.price,
        subCategory: slot.service.subCategory,
      },
      startTime: slot.startTime,
    };
  }
}
