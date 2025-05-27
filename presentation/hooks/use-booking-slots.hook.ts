import { getAvailableDays } from "@/core/actions/booking/get-available-days.action";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { AvailableDay } from "@/core/interfaces/available-day.interface";
import { useEffect, useState } from "react";
import { getSlots } from "@/core/actions/booking/get-slots.action";
import { Slot } from "@/core/interfaces/slot.interface";
import { router } from "expo-router";
import { getBookingByProfessionalAction } from "@/core/actions/booking/get-bookings-by-professional.action";

export const useBookingSlots = () => {
  const { professional, service, addSlot } = useBusinessBookingStore();
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

    const { data: bookings } = await getBookingByProfessionalAction(
      professional?.id!,
      professional?.businessId!
    );

    const slots = getSlots(professional, service, slot.date, bookings);
    setCurrentSlots(slots);
  };

  useEffect(() => {
    const getInitSlots = async () => {
      const { data: bookings } = await getBookingByProfessionalAction(
        professional?.id!,
        professional?.businessId!
      );

      const slots = getSlots(
        professional,
        service,
        availableDays[0].date,
        bookings
      );
      setCurrentSlots(slots);
    };

    if (availableDays) {
      getInitSlots();
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
