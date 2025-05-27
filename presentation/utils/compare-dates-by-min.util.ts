import { differenceInMinutes, isBefore } from "date-fns";

export const isMoreThan = (date: Date, minutes: number): boolean => {
  const now = new Date();

  if (isBefore(date, now)) {
    const diffInMinutes = differenceInMinutes(now, date);
    return diffInMinutes > minutes;
  }

  return false;
};
