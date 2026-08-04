import { programasPorCiclo } from "./matricula";
import { planaDocente } from "./planaDocente";

// Cruza los docentes que dictan curso en cada programa (según los horarios
// reales en data/matricula.js, programasPorCiclo) con los registros de
// data/planaDocente.js, para poder filtrar la Plana Docente por programa.
//
// Los nombres no siempre coinciden exactamente entre ambas fuentes (orden,
// tildes, nombres completos vs. abreviados), así que la coincidencia es por
// palabras: todas las palabras del nombre del horario deben aparecer en el
// nombre completo del docente. Si no hay coincidencia clara, ese docente del
// horario simplemente no se vincula (mejor no vincular que vincular mal).

const normalizar = (str) =>
  str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

const claveDocente = (docente) => docente.codigo || docente.orcid;

const coincide = (nombreHorario, docente) => {
  const nombreCompleto = normalizar(`${docente.nombres} ${docente.apellidos}`);
  const palabras = normalizar(nombreHorario)
    .split(/\s+/)
    .filter((p) => p.length > 2);
  return palabras.length > 0 && palabras.every((palabra) => nombreCompleto.includes(palabra));
};

// Lista de programas (clave + nombre) tal como aparecen en los horarios,
// en el orden en que se van encontrando, sin duplicados entre ciclos.
export const programasFiltro = [];
const clavesVistas = new Set();

// codigo/orcid del docente -> Set de claves de programa en las que dicta curso
const mapa = new Map();

Object.values(programasPorCiclo).forEach((ciclo) => {
  if (!ciclo) return;
  Object.values(ciclo).forEach((grupos) => {
    grupos.forEach((programa) => {
      if (!clavesVistas.has(programa.clave)) {
        clavesVistas.add(programa.clave);
        programasFiltro.push({ clave: programa.clave, nombre: programa.nombre });
      }

      programa.cursos.forEach((curso) => {
        const docenteMatch = planaDocente.find((d) => coincide(curso.docente, d));
        if (!docenteMatch) return;

        const key = claveDocente(docenteMatch);
        if (!mapa.has(key)) mapa.set(key, new Set());
        mapa.get(key).add(programa.clave);
      });
    });
  });
});

// codigo/orcid del docente -> array de claves de programa
export const clavesPorDocente = Object.fromEntries(
  [...mapa.entries()].map(([key, claves]) => [key, [...claves]])
);

export const getClaveDocente = claveDocente;
