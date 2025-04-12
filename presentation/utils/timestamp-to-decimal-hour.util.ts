export const timestampToDecimalHour = (timestamp: number): number => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const decimal = hours + minutes / 60;
  return Math.round(decimal * 100) / 100;
};
