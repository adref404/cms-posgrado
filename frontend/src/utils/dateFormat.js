const MESES_CORTOS = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

const MESES_LARGOS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const parseFecha = (fecha) => fecha.split("-").map(Number);

// "10 mar 2026"
export const formatFechaCorta = (fecha) => {
  if (!fecha) return "";
  const [year, month, day] = parseFecha(fecha);
  return `${day} ${MESES_CORTOS[month - 1]} ${year}`;
};

// "10 de marzo de 2026"
export const formatFechaLarga = (fecha) => {
  if (!fecha) return "";
  const [year, month, day] = parseFecha(fecha);
  return `${day} de ${MESES_LARGOS[month - 1]} de ${year}`;
};

export const getDiaMes = (fecha) => {
  const [, month, day] = parseFecha(fecha);
  return { dia: day, mes: MESES_CORTOS[month - 1].toUpperCase() };
};
