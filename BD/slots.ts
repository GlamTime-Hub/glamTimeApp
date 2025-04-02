import { reservas } from "./reservas";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const getAvailableSlots = (
  professional: any,
  service: any,
  startDate = new Date()
) => {
  const dayOfWeek = new Date(startDate)
    .toLocaleString("en-us", { weekday: "long" })
    .toLowerCase();

  const date = formatDate(startDate);

  console.log("dayOfWeek", dayOfWeek);

  const workingHours = professional.workingHours[dayOfWeek];

  console.log("workingHours", workingHours);

  if (!workingHours) {
    return []; // Si el profesional no trabaja ese día, no hay turnos disponibles
  }

  const { start, end } = workingHours;
  const serviceDuration = service.duration; // Duración del servicio en minutos
  console.log("serviceDuration", serviceDuration);
  const bookedAppointments = reservas
    .filter((b: any) => b.date === date)
    .sort((a, b) => a.startTime - b.startTime);
  console.log("bookedAppointments", bookedAppointments);

  const slots: any = [];
  let currentTime = start;

  bookedAppointments.forEach((booking: any) => {
    let { startTime, endTime } = booking;
    if (currentTime + serviceDuration <= startTime) {
      slots.push({
        startTime: currentTime,
        endTime: currentTime + serviceDuration,
        date: formatDate(startDate),
        service,
        professional,
      });
    }
    currentTime = Math.max(currentTime, endTime);
  });

  while (currentTime + serviceDuration <= end) {
    slots.push({
      startTime: currentTime,
      endTime: currentTime + serviceDuration,
      date: formatDate(startDate),
      service,
      professional,
    });
    currentTime += serviceDuration; // Avanzamos al siguiente posible bloque
  }

  return slots;
};

export const getFullAvailableSlots = (professional: any, service: any) => {
  const slots: any = [];

  Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const slotsByDay = getAvailableSlots(professional, service, date);
    console.log("slotsByDay", slotsByDay);

    slots.push({
      date: formatDate(date),
      slots: slotsByDay,
    });
  });

  console.log(slots);

  return slots;
};
