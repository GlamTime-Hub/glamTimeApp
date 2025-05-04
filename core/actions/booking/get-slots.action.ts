import { Professional } from "@/core/interfaces/professional.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Slot } from "@/core/interfaces/slot.interface";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const getSlots = (
  professional: Professional | null,
  service: SubCategory | null,
  startDate = new Date()
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

  const { start, end } = workingHours;
  const serviceDuration =
    (service?.service && service?.service.duration / 60) || 0; // Duración del servicio en minutos
  console.log("serviceDuration", serviceDuration);
  /* const bookedAppointments = reservas
      .filter((b: any) => b.date === date)
      .sort((a, b) => a.startTime - b.startTime); */

  const bookedAppointments: any[] = [];

  const slots: Slot[] = [];
  let currentTime = start;

  bookedAppointments.forEach((booking: any) => {
    let { startTime, endTime } = booking;
    if (currentTime + serviceDuration <= startTime) {
      slots.push({
        startTime: currentTime,
        endTime: currentTime + serviceDuration,
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
      startTime: currentTime,
      endTime: currentTime + serviceDuration,
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
    currentTime += serviceDuration; // Avanzamos al siguiente posible bloque
  }

  return slots;
};
