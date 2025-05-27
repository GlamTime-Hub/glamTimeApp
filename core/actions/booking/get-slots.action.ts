import { Booking } from "@/core/interfaces/booking.interface";
import { Professional } from "@/core/interfaces/professional.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Slot } from "@/core/interfaces/slot.interface";
import { formatDate } from "@/presentation/utils/format-date.util";

/* const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
 */
export const getSlots = (
  professional: Professional | null,
  service: SubCategory | null,
  startDate = new Date(),
  currentBookings: Booking[] = []
): Slot[] => {
  const dayOfWeek = new Date(startDate)
    .toLocaleString("en-us", { weekday: "long" })
    .toLowerCase() as
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday";

  const date = formatDate(startDate);

  const workingHours = professional?.workingHours[dayOfWeek];

  if (!workingHours) {
    return []; // Si el profesional no trabaja ese día, no hay turnos disponibles
  }

  const slots: Slot[] = [];

  const serviceDuration =
    (service?.service && service?.service.duration / 60) || 0;
  const bookedAppointments = currentBookings
    .filter((b: Booking) => b.fullDate === date)
    .sort((a, b) => a.startTime - b.startTime);

  workingHours.forEach(({ start, end }) => {
    let currentTime = start;

    bookedAppointments.forEach((booking: any) => {
      let { startTime, endTime } = booking;
      if (currentTime + serviceDuration <= startTime) {
        slots.push({
          startTime: Math.floor(currentTime * 10) / 10,
          endTime: Math.floor((currentTime + serviceDuration) * 10) / 10,
          fullDate: formatDate(startDate),
          date: startDate,
          service: {
            subCategory: service?.id || "",
            name: service?.name || "",
            categoryId: service?.categoryId || "",
            price: service?.service?.price || 0,
            id: service?.service.id || "",
          },
          professional: {
            id: professional?.id,
            businessId: professional?.businessId,
          },
        });
      }
      currentTime = Math.max(currentTime, endTime);
    });

    while (currentTime + serviceDuration <= end) {
      slots.push({
        startTime: Math.floor(currentTime * 10) / 10,
        endTime: Math.floor((currentTime + serviceDuration) * 10) / 10,
        fullDate: formatDate(startDate),
        date: startDate,
        service: {
          subCategory: service?.id || "",
          name: service?.name || "",
          categoryId: service?.categoryId || "",
          price: service?.service?.price || 0,
          id: service?.service.id || "",
        },
        professional: {
          id: professional?.id,
          businessId: professional?.businessId,
        },
      });
      currentTime += serviceDuration;
    }
  });

  const currentDate = new Date();
  const currentFormatDate = formatDate(currentDate);
  const currentHour = currentDate.getHours() + currentDate.getMinutes() / 60;

  return slots.filter(
    (slot) =>
      (slot.fullDate === currentFormatDate && slot.startTime > currentHour) ||
      slot.fullDate !== currentFormatDate
  );
};
