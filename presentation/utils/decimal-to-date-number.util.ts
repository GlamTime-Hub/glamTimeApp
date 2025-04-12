export const decimalToDateNumber = (decimal: number): number => {
  const date = new Date();
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  date.setHours(hours, minutes, 0, 0);
  return date.getTime();
};
