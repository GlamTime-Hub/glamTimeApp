export const formatCurrency = (value: string) => {
  const number = parseInt(value.replace(/\D/g, ""), 10) || 0;
  return number.toLocaleString("es-CO");
};
