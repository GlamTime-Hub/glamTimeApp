export const formatTime = (time: number) => {
  let horas = Math.floor(time);
  const minutos = Math.round((time % 1) * 60);
  const periodo = horas >= 12 ? "PM" : "AM";

  horas = horas % 12 || 12;

  return `${horas}:${String(minutos).padStart(2, "0")} ${periodo}`;
};
