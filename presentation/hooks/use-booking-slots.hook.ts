import { getAvailableDays } from "@/core/actions/booking/get-available-days.action";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { AvailableDay } from "@/core/interfaces/available-day.interface";
import { useEffect, useState } from "react";
import { getSlots } from "@/core/actions/booking/get-slots.action";
import { Slot } from "@/core/interfaces/slot.interface";
import { router } from "expo-router";

export const useBookingSlots = () => {
  const { slot, professional, service, addSlot } = useBusinessBookingStore();
  const availableDays = getAvailableDays();

  const [currentDay, setCurrentDay] = useState<AvailableDay | null>(
    availableDays[0]
  );

  const [currentSlots, setCurrentSlots] = useState<Slot[]>([]);

  const onSelectSlot = (slot: Slot) => {
    addSlot(slot);
    router.push("/glam/(tabs)/business/detail/booking/confirmation");
  };

  const onChangeDay = (slot: AvailableDay) => {
    setCurrentDay(slot);
    const slots = getSlots(professional, service, slot.date);
    setCurrentSlots(slots);
  };

  useEffect(() => {
    if (availableDays) {
      const slots = getSlots(professional, service, availableDays[0].date);
      setCurrentSlots(slots);
    }
  }, []);

  return {
    availableDays,
    professional,
    currentSlots,
    currentDay,
    onSelectSlot,
    onChangeDay,
  };
};
