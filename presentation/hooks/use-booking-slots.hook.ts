import { getAvailableDays } from "@/core/actions/booking/get-available-days.action";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { AvailableDay } from "@/core/interfaces/available-day.interface";
import { useEffect, useState } from "react";
import { Slot } from "@/core/interfaces/slot.interface";
import { router } from "expo-router";
import { getSlotsServerAction } from "@/core/actions/booking/get-slots-server.action";

export const useBookingSlots = () => {
  const { professional, service, addSlot } = useBusinessBookingStore();
  const [loading, setLoading] = useState<boolean>(false);
  const availableDays = getAvailableDays();

  const [currentDay, setCurrentDay] = useState<AvailableDay | null>(
    availableDays[0]
  );

  const [currentSlots, setCurrentSlots] = useState<Slot[]>([]);

  const onSelectSlot = (slot: Slot) => {
    addSlot(slot);
    router.push("/glam/(tabs)/business/detail/booking/confirmation");
  };

  const onChangeDay = async (slot: AvailableDay) => {
    setCurrentDay(slot);
    setLoading(true);

    const slots = await getSlotsServerAction(professional, service, slot.date);

    setCurrentSlots(slots.data);

    setLoading(false);
  };

  useEffect(() => {
    const getInitSlots = async () => {
      setLoading(true);

      const slots = await getSlotsServerAction(
        professional,
        service,
        availableDays[0].date
      );

      setCurrentSlots(slots.data);
      setLoading(false);
    };

    if (availableDays) {
      getInitSlots();
    }
  }, []);

  return {
    loading,
    availableDays,
    professional,
    currentSlots,
    currentDay,
    onSelectSlot,
    onChangeDay,
  };
};
