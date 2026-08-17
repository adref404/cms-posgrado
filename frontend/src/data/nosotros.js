// Contenido institucional — Facultad de Educación UNMSM
// Fuente: Plan Estratégico de la Facultad de Educación 2024-2027,
// aprobado mediante RR. N.° 004060-2024-R/UNMSM (18/03/2024)
import {
  MdVolunteerActivism,
  MdTaskAlt,
  MdVerifiedUser,
  MdGroups,
  MdFavorite,
  MdBalance,
  MdGpsFixed,
  MdPeople,
  MdShield,
  MdStar,
  MdPolicy,
  MdHowToVote,
  MdAutorenew,
  MdScience,
} from "react-icons/md";

export const mision =
  "Formar integralmente profesionales y especialistas en educación en los niveles de pre y posgrado. Fomentar el pensamiento crítico y la generación de conocimiento basado en la investigación científica y el uso de las herramientas tecnológicas más actuales. Asimismo, promover el respeto a la interculturalidad e inclusión, la responsabilidad social y la identidad nacional.";

export const misionImagen =
  "https://us.123rf.com/450wm/perkmeup/perkmeup0702/perkmeup070200123/765607-a-pile-of-open-books-and-a-notebook-ready-to-start-studying.jpg?ver=6";

export const vision =
  "Ser referente nacional e internacional en la formación de profesionales e investigadores en pre y posgrado en Educación, ofreciendo una educación integral de calidad.";

export const visionImagen =
  "https://imgcomercial.glr.pe/1000x590/comercial/original/2026/03/23/69c131ac9e47f60d3f02d60b.webp";

export const valoresIntro =
  "Los valores en la Facultad de Educación corresponden a características que poseen los miembros de nuestra comunidad y que les permiten desenvolverse y desarrollarse en un entorno que agrupa aspectos éticos y capacidades, que guían su comportamiento, para el logro de objetivos. Estos valores son:";

export const valores = [
  {
    title: "Solidaridad",
    icono: MdVolunteerActivism,
    description:
      "Hacer el bien común, apoyando a las personas en situación desafortunada.",
  },
  {
    title: "Responsabilidad",
    icono: MdTaskAlt,
    description:
      "Cualidad y valor del ser humano que le permite comprometerse y actuar de forma correcta cumpliendo sus obligaciones.",
  },
  {
    title: "Integridad",
    icono: MdVerifiedUser,
    description:
      "Unidad permanente de los miembros de la institución, de pensar y actuar en concordancia con los valores institucionales.",
  },
  {
    title: "Equidad e inclusión social",
    icono: MdGroups,
    description:
      "Respetar los derechos, responsabilidades y oportunidades de las mujeres y los hombres, e integrar a las personas sin exclusiones por motivos de ubicación geográfica, sexo, edad, creencias y culturas.",
  },
  {
    title: "Consciencia Social",
    icono: MdFavorite,
    description:
      "Capacidad para percibir, reconocer, comprender y actuar ante los problemas y las necesidades que tienen las personas de nuestra comunidad, entidad y grupo social.",
  },
  {
    title: "Respeto, dignidad, tolerancia y libertad",
    icono: MdBalance,
    description:
      "Respeto: consideración y valoración especial que sentimos por los miembros de la comunidad universitaria y la sociedad.\nDignidad: respeto a nuestros semejantes por sobre cualquier condición.\nTolerancia: respeto a las personas, a sus creencias, costumbres, etnias y culturas.\nLibertad: expresar opiniones e ideas, con el respeto hacia los demás.",
  },
  {
    title: "Pertinencia",
    icono: MdGpsFixed,
    description:
      "Definir las necesidades sociales y emocionales con los contenidos educativos.",
  },
  {
    title: "Pertenencia",
    icono: MdPeople,
    description: "Desarrollar fidelidad y lealtad para con la institución.",
  },
  {
    title: "Fortaleza",
    icono: MdShield,
    description:
      "Salir adelante en los desafíos que pone la vida y superar los obstáculos que van apareciendo en ella, manteniendo la integridad de cuerpo y alma, logrando ser cada vez más poderosos y resistentes.",
  },
];

export const principios = [
  {
    title: "Excelencia",
    icono: MdStar,
    description:
      "Compromiso de hacer bien las cosas logrando cada vez mejores niveles en la práctica.",
  },
  {
    title: "Transparencia",
    icono: MdPolicy,
    description: "Ser claro, evidente, no expresarse con ambigüedad.",
  },
  {
    title: "Democracia y Participación",
    icono: MdHowToVote,
    description:
      "Convivencia social con libre participación, justicia, igualdad y equidad.",
  },
  {
    title: "Resiliencia Institucional",
    icono: MdAutorenew,
    description:
      "Capacidad que tiene la institución y la comunidad universitaria para adaptarse a los cambios, a fin de restablecer o mantener sus actividades, encaminadas hacia un crecimiento organizacional.",
  },
  {
    title: "Cientificidad",
    icono: MdScience,
    description:
      "Evidencia como soporte para la toma de decisiones de la gobernanza pública.",
  },
];

// photo: URL opcional. Sin foto todavía → se muestra un avatar con iniciales.
// cargos: una autoridad puede tener más de un cargo (ej. Miguel Inga es
// Vicedecano de Investigación y Posgrado Y Director de la Unidad de
// Posgrado) — se listan todos debajo de la misma foto, en vez de repetir la
// tarjeta con la misma imagen dos veces.
export const autoridades = [
  {
    name: "Dr. Edgar Froilán Damian Nuñez",
    photo: "https://luiscavibotsample.s3.sa-east-1.amazonaws.com/assets/universidad/decanos/DR.+EDGAR+DAMIAN+NU%C3%91EZ+-+EDUCACION.jpg",
    cargos: [
      { unit: "Decanato", role: "Decano", email: "decanoedu@unmsm.edu.pe" },
    ],
  },
  {
    name: "Dr. Hernando Díaz Andía",
    photo: "https://media.licdn.com/dms/image/v2/C5603AQHhWY591hPeHg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517428614119?e=2147483647&v=beta&t=8rg0tvqB2Z8sZTi6OOgSiJ1vrTUDZLrAwfa6cWa598o",
    cargos: [
      { unit: "Vicedecanato Académico", role: "Vicedecano Académico", email: "viceacademico.educacion@unmsm.edu.pe" },
    ],
  },
  {
    name: "Dr. Miguel Gerardo Inga Arias",
    photo: "https://media.licdn.com/dms/image/v2/C4D03AQHv0EOBG5Pjcw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1640536570895?e=2147483647&v=beta&t=L70ZguZ7mzIPJ7OJHZgLZAYQ7MtWMn45c_NeRXEPr3g",
    cargos: [
      { unit: "Vicedecanato de Investigación y Posgrado", role: "Vicedecano", email: "vicedecanatoinvestigacion.fe@unmsm.edu.pe" },
      { unit: "Unidad de Posgrado", role: "Director", email: "upg.educacion@unmsm.edu.pe" },
    ],
  },
  {
    name: "Dr. Ángel Anibal Mamani Ramos",
    photo: "https://ctivitae.concytec.gob.pe/appDirectorioCTI/UploadFotoPath.do?tipo=visualizar_archivo&id_investigador=20822&ruta=/documents/docInvestigadores/20822/imagenes/IMG_9469.JPG&content_type=image/jpeg",
    cargos: [
      { unit: "Instituto de Investigación Educativas", role: "Director", email: "iie.educacion@unmsm.edu.pe" },
    ],
  },
  // {
  //   unit: "Oficina de Calidad Académica y Acreditación (OCAA)",
  //   role: "Jefa",
  //   name: "Dra. Reyna Luisa Cruz Shuan",
  //   email: null,
  //   photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmFrOgdm4V2yZNYnJ6Mko0jntM31cOa2BbtM8Bia1ikQ&s=10",
  // },
];

export const fuenteInstitucional =
  "Tomado del Plan Estratégico de la Facultad de Educación 2024-2027, aprobado mediante RR. N.° 004060-2024-R/UNMSM, de fecha 18/03/2024 — Oficina de Calidad Académica y Acreditación (OCAA), Facultad de Educación.";
