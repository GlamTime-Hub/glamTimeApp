import { AvailableDay } from "@/core/interfaces/available-day.interface";

const formatDate = (date: Date): AvailableDay => {
  const day = date.getDate();
  const rawMonth = date.toLocaleString("es-ES", { month: "long" });
  const month = rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1);
  const year = date.getFullYear();
  const fullDate = `${day} de ${month} de ${year}`;

  return {
    day,
    month,
    year,
    fullDate,
    date,
  };
};

export const getAvailableDays = (): AvailableDay[] => {
  const slots: AvailableDay[] = [];

  Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    slots.push(formatDate(date));
  });

  return slots;
};
