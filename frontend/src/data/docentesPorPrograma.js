import { programasPorCiclo } from "./matricula";

// Cruza los docentes que dictan curso en cada programa (según los horarios
// reales en data/matricula.js, programasPorCiclo) con la Plana Docente
// (hooks/usePlanaDocente.js), para poder filtrar la Plana Docente por
// programa.
//
// Los nombres no siempre coinciden exactamente entre ambas fuentes (orden,
// tildes, nombres completos vs. abreviados), así que la coincidencia es por
// palabras: todas las palabras del nombre del horario deben aparecer en el
// nombre completo del docente. Si no hay coincidencia clara, ese docente del
// horario simplemente no se vincula (mejor no vincular que vincular mal).
//
// Antes esto se calculaba una sola vez al cargar el módulo (planaDocente
// era un arreglo estático importado). Ahora la Plana Docente llega de
// Supabase de forma asíncrona, así que se calcula bajo demanda —
// PlanaDocentePage.jsx lo llama dentro de un useMemo() una vez que ya
// tiene los docentes cargados.

const normalizar = (str) =>
  str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

export const getClaveDocente = (docente) => docente.codigo || docente.orcid;

const coincide = (nombreHorario, docente) => {
  const nombreCompleto = normalizar(`${docente.nombres} ${docente.apellidos}`);
  const palabras = normalizar(nombreHorario)
    .split(/\s+/)
    .filter((p) => p.length > 2);
  return palabras.length > 0 && palabras.every((palabra) => nombreCompleto.includes(palabra));
};

// planaDocente -> { programasFiltro, clavesPorDocente }
//   programasFiltro:   lista de programas (clave + nombre) tal como aparecen
//                      en los horarios, en el orden en que se van
//                      encontrando, sin duplicados entre ciclos.
//   clavesPorDocente:  codigo/orcid del docente -> array de claves de
//                      programa en las que dicta curso.
export const construirFiltroProgramas = (planaDocente) => {
  const programasFiltro = [];
  const clavesVistas = new Set();
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

          const key = getClaveDocente(docenteMatch);
          if (!mapa.has(key)) mapa.set(key, new Set());
          mapa.get(key).add(programa.clave);
        });
      });
    });
  });

  const clavesPorDocente = Object.fromEntries(
    [...mapa.entries()].map(([key, claves]) => [key, [...claves]])
  );

  return { programasFiltro, clavesPorDocente };
};
