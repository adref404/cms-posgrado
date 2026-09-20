-- ============================================================
-- Grupos de Investigación — Lote 2 (17 grupos, ~328 integrantes)
-- Posgrado Educación UNMSM — pegar completo en el SQL Editor de Supabase
-- y ejecutar UNA sola vez.
--
-- Requiere que YA hayas corrido antes, en este orden:
--   1) supabase-plana-docente.sql
--   2) supabase-grupos-investigacion.sql   (crea las tablas + el grupo ADGEGERN)
--
-- Este archivo NO vuelve a crear tablas ni políticas (ya existen) y NO
-- incluye a ADGEGERN de nuevo (ya está cargado) — solo agrega los 17
-- grupos restantes de tu exportación de RAIS: CD, EC, AMASE, EDUKPRIM,
-- EDUMOT, EDUCACIN, GRIITS, EDUCOMP, IESPORTE, INDIMAT, INDORERAC,
-- MACFIDE, IPE, MAESTROS, METODOS, PSICOEDU y CITECSO.
--
-- Igual que con ADGEGERN: ningún integrante queda enlazado a Plana
-- Docente (docente_id = null para todos). Varios de estos docentes SÍ
-- están ya en plana_docente (aparecen en varios grupos a la vez, es
-- normal), pero enlazarlos automáticamente por coincidencia de nombre es
-- arriesgado (nombres parecidos mal enlazados) — hazlo tú desde el panel
-- (/admin/grupos-investigacion/.../integrantes), donde ya puedes buscar y
-- enlazar con confianza. Tampoco se guarda el DNI de nadie.
-- ============================================================

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Conocimiento y Desarrollo',
  'CD',
  'Registrado',
  'Somos un equipo multidisciplinario comprometido con la calidad educativa. Para ello, desarrollamos investigaciones que permitan diagnosticar la realidad educativa nacional y elaboramos propuestas que permitan mejorarla en sus aspectos sustanciales. Los integrantes de este grupo de investigación participan en actividades académicas y de responsabilidad social que evidencien la necesidad de ubicar las necesidades educativas en la agenda pública nacional.',
  'Promover la educación de calidad en los niveles básico y superior. Desarrollar políticas públicas educativas que promuevan el desarrollo nacional. Crear espacios de diálogo y debate que evidencien la importancia de la actividad educativa. Realizar investigaciones que diagnostiquen las necesidades de los actores educativos en los ámbitos local, regional y nacional. Fomentar la investigación como actividad permanente.',
  'Conferencias y seminarios especializados. Asesorías de tesis. Consultorías a entidades públicas y privadas. Capacitaciones al magisterio. Estudios sociométricos y psicométricos.',
  ARRAY['E.3.3.2.', 'E.3.1.7.', 'E.3.3.5.', 'E.6.0.30', 'E.6.0.23', 'E.6.0.16'],
  ARRAY['Desarrollo socioeconómico y educación', 'Gestión educativa', 'Políticas educativas públicas y demanda laboral', 'TIC y educación', 'Investigación e innovación', 'Educación superior'],
  'cgonzalest@unmsm.edu.pe',
  '6197000',
  'Unidad de Investigación - Facultad de Educación - UNMSM',
  'Av. Universitaria s/n, Facultad de Educación - 3er piso',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Jorge Leoncio', 'Rivera Muñoz', 'Docente permanente', 'Educación', 'Titular', 1),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Yolvi Javier', 'Ocaña Fernandez', 'Docente permanente', 'Educación', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Jorge Luis', 'Jaime Cárdenas', 'Externo', null, 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Miguel Angel', 'Quispe Saavedra', 'Egresado posgrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Pedro Rodolfo', 'Rojas Silva', 'Docente permanente', 'Educación', 'Titular', 5),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Maria Elena', 'Villanueva Chaucas', 'Estudiante posgrado', 'Letras y Ciencias Humanas', 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Evelyn Ysolina', 'Rondon Jara', 'Externo', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'July Blanca', 'Rivera Zamudio', 'Estudiante pregrado', 'Educación', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Jakelin Solina', 'Miraval Marquez', 'Estudiante posgrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Catie', 'Gonzalez Tovar', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 10),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Alberto Salvador', 'Palacios Jimenez', 'Estudiante posgrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Angel', 'Salvatierra Melgar', 'Docente permanente', 'Educación', 'Titular', 12),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Luis Alberto', 'Nuñez Lira', 'Docente permanente', 'Educación', 'Titular', 13),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Dalia Isabel Kassandra', 'León Flores', 'Estudiante pregrado', 'Educación', 'Adherente', 14),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Piero Alonso', 'Espinoza Quispe', 'Estudiante pregrado', 'Educación', 'Adherente', 15),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Andrea', 'Felipe Morales', 'Externo', null, 'Adherente', 16),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'David', 'Caldevilla Morales', 'Externo', null, 'Adherente', 17),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Luis Antonio', 'Mamani Castillo', 'Estudiante pregrado', 'Educación', 'Adherente', 18),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Pablo Daniel', 'Aguedo Vallejos', 'Estudiante pregrado', 'Educación', 'Adherente', 19),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Migumi Fiorella', 'Alva Atencio', 'Estudiante pregrado', 'Educación', 'Adherente', 20),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Gabriela Del Rosario', 'Malpartida Soria', 'Estudiante pregrado', 'Educación', 'Adherente', 21),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Luis Angel', 'Alfaro Allende', 'Externo', null, 'Adherente', 22),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Jeffer Jean Paul', 'More Ramos', 'Estudiante pregrado', 'Educación', 'Adherente', 23),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Luis Alex', 'Valenzuela Fernández', 'Externo', null, 'Adherente', 24),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Celia Andrea', 'Muñoz Flores', 'Estudiante pregrado', 'Educación', 'Adherente', 25),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'María Del Carmen', 'Bonilla Tumialán', 'Externo', null, 'Adherente', 26),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Oriana', 'Rivera Lozada De Bonilla', 'Docente permanente', 'Educación', 'Titular', 27),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Ricardo David', 'Cuenca Pareja', 'Docente permanente', 'Educación', 'Titular', 28),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Mario Wilfredo', 'Gonzales Flores', 'Estudiante posgrado', 'Educación', 'Adherente', 29),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Eduardo Ernesto', 'Durand Hipólito', 'Estudiante posgrado', 'Educación', 'Adherente', 30),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Isabel', 'Menacho Vargas', 'Docente permanente', 'Educación', 'Titular', 31),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Micaela', 'Centeno Castañeda', 'Estudiante pregrado', 'Educación', 'Adherente', 32),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Adita María', 'Simeón Aguirre', 'Estudiante posgrado', 'Educación', 'Adherente', 33),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Florencio', 'Flores Ccanto', 'Externo', null, 'Adherente', 34),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Emily Nicol', 'Ysla Alvarado', 'Estudiante posgrado', 'Educación', 'Adherente', 35),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Alberto Alejandro', 'Shuan Chavez', 'Estudiante posgrado', 'Educación', 'Adherente', 36),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Andres', 'Vilca Cabanillas', 'Estudiante pregrado', 'Educación', 'Adherente', 37),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Ingrid Lisbeth', 'Villalva Córdova', 'Estudiante pregrado', 'Educación', 'Adherente', 38),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Laura Ingrid', 'Mendoza Concha', 'Estudiante pregrado', 'Letras y Ciencias Humanas', 'Adherente', 39),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Cristóbal', 'Suárez-Guerrero', 'Externo', null, 'Adherente', 40),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Narciso', 'López Sevillano', 'Estudiante posgrado', 'Educación', 'Adherente', 41),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Nadia Danna', 'Ayala Soca', 'Estudiante pregrado', 'Educación', 'Adherente', 42),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Valeria Isabel', 'Quiñones Alejos', 'Estudiante pregrado', 'Educación', 'Adherente', 43),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Romualdo Bryan', 'Soncco Salinas', 'Estudiante posgrado', 'Educación', 'Adherente', 44),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Maribel Cecilia', 'Rangel Magallanes', 'Externo', null, 'Adherente', 45),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Dante', 'Sembrera Cruz', 'Estudiante pregrado', 'Educación', 'Adherente', 46),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Jackelyne Aurora', 'Manco Miranda', 'Estudiante', 'Psicología', 'Adherente', 47),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Lesly Marina', 'Villegas Aguilar', 'Estudiante', 'Psicología', 'Adherente', 48),
  ((select id from grupos_investigacion where nombre_corto = 'CD'), null, 'Abel Alejandro', 'Tasayco Jala', 'Externo', null, 'Adherente', 49);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Educiencia',
  'EC',
  'Registrado',
  'El GI EDUCIENCIA se ha formado como consecuencia del trabajo conjunto que realizamos, como docentes e investigadores, en la UPG de la Facultad de Educación. Los miembros del GI venimos reuniéndonos periódicamente desde hace más de dos años, lo que nos ha permitido identificar los principales problemas de investigación pedagógica y adoptar una serie de criterios para brindar asesoramiento en la elaboración de tesis de graduandos de maestría y doctorado en educación. Cada uno de sus integrantes tiene amplia trayectoria en la docencia y la investigación. Uno de los principales logros alcanzados es el reconocimiento que el Vicerrectorado de Investigación de la UNMSM otorgó al coordinador del GI por su condición de investigador científico con publicaciones. Los otros integrantes del GI han publicado artículos científicos en revistas indexadas, así como textos universitarios de sus respectivas especialidades. El trabajo conjunto del grupo se ha materializado en el incremento significativo del número de graduados en los programas de maestría y doctorado en educación, como consecuencia de la gestión del coordinador en su condición de Director de la UPG de Educación. Los integrantes del GI asesoran tesis de doctorado en educación de profesores universitarios ecuatorianos que realizan estudios de cuarto nivel en la UNMSM.',
  'El GI EDUCIENCIA se propone identificar los principales factores que influyen en la calidad del servicio educativo del tercer y cuarto nivel educativo, y plantear alternativas viables para superar la crisis de la educación nacional. Se propone poner en debate las innovaciones curriculares centradas en competencias y sus efectos en la calidad de la formación profesional. Otro de sus objetivos es identificar las competencias, tanto generales como específicas, que deben adquirir los futuros profesionales de la educación. También busca elevar el número de participantes en estudios de cuarto nivel educativo, como la alternativa más viable de educación continua.',
  'Los miembros del GI EDUCIENCIA brindan servicios de asesoramiento de tesis a estudiantes de cuarto nivel educativo. Además, realizan conferencias y congresos de temática pertinente.',
  ARRAY['E.3.2.3.', 'E.3.1.6.', 'E.3.2.7.', 'E.6.0.16', 'E.6.0.24', 'E.6.0.4'],
  ARRAY['Educación superior', 'Desarrollo científico y tecnológico en la formación docente', 'Problemática universitaria', 'Educación superior', 'Neurociencias y aprendizaje', 'Desarrollo científico y tecnológico en la formación docente'],
  'francis.diaz@unmsm.edu.pe',
  '6197000',
  'Sala de profesores',
  'Av. Germán Amézaga s/n, cuadra 57 de la Av. Colonial',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Elias Jesus', 'Mejia Mejia', 'Docente permanente', 'Educación', 'Titular', 1),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Abelardo Rodolfo', 'Campana Concha', 'Docente permanente', 'Educación', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Francis', 'Diaz Flores', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 3),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Mónica Arizú', 'Herrera Bendezú', 'Estudiante posgrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Julia', 'Teves Quispe', 'Docente permanente', 'Educación', 'Titular', 5),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Julio Cesar', 'Huaman Cruz', 'Estudiante pregrado', 'Educación', 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Piero Raphael Walter', 'Valdez Yánac', 'Estudiante posgrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Maria Maritza', 'Retamozo Zegarra', 'Docente permanente', 'Educación', 'Titular', 8),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Yázid Paolo', 'Benites Guerrero', 'Estudiante pregrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'EC'), null, 'Brian Andreé', 'Meneses Claudio', 'Externo', null, 'Adherente', 10);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'La educación holística, la educación del futuro',
  'AMASE',
  'Registrado',
  'Nuestro trabajo se plasmará con la perspectiva de una lectura holística para la comprensión lectora de los estudiantes del 1er ciclo de la Facultad de Educación de nuestra universidad, con el objetivo de optimizar el rendimiento académico de los estudiantes de pregrado universitario.',
  'Optimizar el rendimiento académico de los estudiantes de pregrado de la Facultad de Educación de la UNMSM.',
  'Servicios de tutoría a los estudiantes del 1er ciclo de la Facultad de Educación.',
  ARRAY['E.3.3.1.', 'E.6.0.6', 'E.6.0.13', 'E.6.0.23'],
  ARRAY['Educación comparada', 'Didáctica y currículo universitario', 'Educación Intercultural, didáctica y desempeño docente', 'Investigación e innovación'],
  'avilchezh@unmsm.edu.pe',
  '6197000',
  'Instituto de Investigaciones Educativas',
  'Germán Amezaga s/n - Lima',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Ana Maria Isabel', 'Vilchez Huerto', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Luz Roxana', 'Vigil Guerrero', 'Docente permanente', 'Educación', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Cyntia Prisilla', 'Revolledo Campos', 'Estudiante posgrado', 'Educación', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Guiliana Tessy Estrella', 'Alvarez Andrade', 'Estudiante posgrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Diana', 'Mori Gonzales', 'Externo', null, 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Dulio', 'Oseda Gago', 'Docente permanente', 'Educación', 'Titular', 6),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Cromancio Felipe', 'Aguirre Chavez', 'Docente permanente', 'Educación', 'Titular', 7),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Ruth Katherine', 'Mendivel Geronimo', 'Docente permanente', 'Educación', 'Titular', 8),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Jessica Paola', 'Palacios Garay De Rodriguez', 'Docente permanente', 'Educación', 'Titular', 9),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Rosa Maria', 'De La Cruz Garcia', 'Estudiante posgrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Jose Luis', 'Sangama Sanchez', 'Estudiante posgrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Rosa Maria', 'Benavente Ayquipa', 'Docente permanente', 'Educación', 'Titular', 12),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Yudith Ivonne', 'Alata Cusy', 'Docente permanente', 'Educación', 'Titular', 13),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Joseph Santiago', 'Martin Vergara', 'Docente permanente', 'Educación', 'Titular', 14),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Susana Ines', 'Damian Buleje', 'Estudiante posgrado', 'Educación', 'Adherente', 15),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Maximo Abel', 'Rodriguez Taboada', 'Externo', null, 'Adherente', 16),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Eloy Eladio', 'Ayala Falcon', 'Docente permanente', 'Educación', 'Titular', 17),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Rosalí Miguel', 'Chávez Fernández', 'Estudiante posgrado', 'Educación', 'Adherente', 18),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Silvio Cesar', 'Aylas Gonzales', 'Estudiante posgrado', 'Educación', 'Adherente', 19),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Lucy Del Pilar', 'Aguado Ventura', 'Estudiante posgrado', 'Educación', 'Adherente', 20),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Fidel Jesús', 'Urbano Jimenez', 'Estudiante posgrado', 'Educación', 'Adherente', 21),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Jose', 'Olivera Espinoza', 'Docente permanente', 'Educación', 'Titular', 22),
  ((select id from grupos_investigacion where nombre_corto = 'AMASE'), null, 'Milagros Del Carmen', 'Gonzales Miñán', 'Docente permanente', 'Psicología', 'Titular', 23);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Estimulación de las funciones cognitivas y psicolingüísticas en niños del nivel de primaria en el Perú',
  'EDUKPRIM',
  'Registrado',
  'La situación educativa que presentan los niños del Perú, tanto los de zona urbana como los de zona rural, revela niveles de deficiencia en habilidades y competencias humanas, tales como el lenguaje oral, la lectura, la escritura y el cálculo; hechos que marcarán su futuro desarrollo como ser humano. En ese sentido, el presente grupo intenta abordar distintos aspectos relacionados con la evaluación, el diagnóstico y la intervención en las habilidades y competencias mencionadas, diseñando instrumentos, evaluando funciones y elaborando y aplicando programas de intervención psicoeducativa en niños del nivel de educación primaria, orientado a elevar el nivel educativo y de aprendizaje en esta población de estudio. Se parte del principio de que mientras más temprana sea la intervención en las habilidades y competencias afectadas —debido principalmente a una falta de estimulación sociocultural y educativa adecuada— se garantizará una mejor recuperación, que contribuirá a un desarrollo integral del ser humano, capaz de afrontar en mejores condiciones las demandas educativas y sociales del siglo XXI. En nuestra Facultad de Educación, históricamente orientada hacia la educación secundaria, a partir del año 2000 se empezó a tomar conciencia de la importancia de abordar la intervención educativa en el nivel de educación primaria, como forma de prevenir futuros problemas de aprendizaje y garantizar que el niño peruano desarrolle al máximo sus potencialidades, especialmente las relacionadas con los aspectos cognitivos y psicolingüísticos.',
  '1) Evaluar el estado de desarrollo de las habilidades cognitivas y psicolingüísticas de niños de zona urbana y de zona rural, especialmente de los sectores marginales. 2) Elaborar, validar o adaptar instrumentos relacionados al desarrollo de las habilidades cognitivas y psicolingüísticas, tomando en cuenta los postulados de la psicología cognitiva y la neurociencia. 3) Diseñar y aplicar programas de intervención en las habilidades cognitivas y psicolingüísticas, especialmente en niños del nivel de educación inicial y primaria.',
  '1) Capacitación a autoridades educativas y docentes a nivel regional y nacional sobre el desarrollo de las habilidades cognitivas y psicolingüísticas de los niños en el Perú. 2) Ofrecer instrumentos y programas de intervención orientados a mejorar las habilidades y competencias fundamentales en la educación primaria. 3) Ofrecer modelos y sistemas educativos a gobiernos locales, regionales o nacional, diseñados a partir de la orientación especializada de la psicología cognitiva y la neurociencia.',
  ARRAY['B.5.6.2.', 'E.3.2.2.', 'E.3.3.5.', 'E.6.0.7', 'E.6.0.13', 'E.6.0.24'],
  ARRAY['Neuropsicoeducación', 'Educación básica', 'Políticas educativas públicas y demanda laboral', 'Educación básica', 'Educación Intercultural, didáctica y desempeño docente', 'Neurociencias y aprendizaje'],
  'esther.velarde@unmsm.edu.pe',
  '6197000',
  'Dirección del Departamento Académico',
  'Facultad de Educación',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Esther Mariza', 'Velarde Consoli', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Margareth', 'Pujay Huete', 'Estudiante pregrado', 'Educación', 'Adherente', 2),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Dulce Estefania', 'Iglesias Landa', 'Estudiante pregrado', 'Educación', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Olinda Jesus', 'Salazar Bazan', 'Estudiante posgrado', 'Psicología', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Ivan Angel', 'Encalada Diaz', 'Docente permanente', 'Educación', 'Titular', 5),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Pablo Jesús', 'García Aguirre', 'Estudiante posgrado', 'Educación', 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Victor Enrique', 'Lizama Mendoza', 'Docente permanente', 'Educación', 'Titular', 7),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Luzmila Susana', 'Sifuentes Leon', 'Estudiante pregrado', 'Educación', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Carol Fernanda', 'Puma Castillo', 'Estudiante pregrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Jazmin Nikole', 'Valverde Tinco', 'Estudiante pregrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Liliana Cristina Mirian', 'Cuadrado Silva', 'Estudiante pregrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Isabel Marleni', 'Jimenez Durand', 'Estudiante pregrado', 'Educación', 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Bianca Najaira', 'Cadenillas Arrieta', 'Estudiante pregrado', 'Educación', 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Li Chaska Aracelly', 'Charca Mendoza', 'Estudiante pregrado', 'Educación', 'Adherente', 14),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Franco David', 'Lopez Silupu', 'Estudiante pregrado', 'Educación', 'Adherente', 15),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Gabriela Karely', 'Espinal Farfan', 'Estudiante pregrado', 'Educación', 'Adherente', 16),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Lizzet Mirian', 'Zegarra Alejos', 'Estudiante pregrado', 'Educación', 'Adherente', 17),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Milagros Vanessa', 'Pauccara Galindo', 'Estudiante pregrado', 'Educación', 'Adherente', 18),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Xiomara Gabriela', 'Reyes Moreno', 'Estudiante pregrado', 'Educación', 'Adherente', 19),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Sofia Belen', 'Soria Rodriguez', 'Estudiante pregrado', 'Educación', 'Adherente', 20),
  ((select id from grupos_investigacion where nombre_corto = 'EDUKPRIM'), null, 'Karla Norith', 'Huamaní Correa', 'Estudiante posgrado', 'Educación', 'Adherente', 21);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Investigaciones en la Educación Física',
  'EDUMOT',
  'Registrado',
  'El grupo de investigación Edumotricidad se forma a partir de las relaciones interpersonales de los docentes de la Escuela Profesional de Educación Física, quienes, abocados en su labor educativa, observan las dificultades que enfrentan los estudiantes de pregrado de la facultad —en especial los de educación física— en la investigación. Por ese motivo nos agrupamos con la misión de asesorar en la elaboración de sus proyectos, revisión de su marco teórico, construcción de sus instrumentos, acopio de información, procesamiento estadístico de sus datos, interpretación de los resultados y elaboración de las conclusiones del informe final de tesis.',
  'El grupo Edumotricidad se propone fomentar la investigación en la Escuela Profesional de Educación Física, generar debates en el área de investigación, crear las condiciones pertinentes para la producción de conocimientos en la especialidad de educación física, fortaleciendo las capacidades de interpretación y toma de decisiones en la formación profesional del docente de educación física.',
  'Asesorías, tutorías y acompañamiento en el área de la investigación, además de la organización de eventos académicos: conferencias, seminarios, talleres, congresos nacionales e internacionales y coloquios.',
  ARRAY['E.3.1.6.', 'E.3.1.3.', 'E.6.0.17', 'E.6.0.14', 'E.6.0.13'],
  ARRAY['Desarrollo científico y tecnológico en la formación docente', 'Educación Intercultural, didáctica y desempeño docente', 'Educación y actividad física corporal', 'Educación para la salud', 'Educación Intercultural, didáctica y desempeño docente'],
  'edamiann@unmsm.edu.pe',
  '619700',
  'Departamento Académico de Educación Física',
  'Av. Venezuela s/n',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Edgar Froilan', 'Damian Nuñez', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Luis Martin', 'Chavez Alvan', 'Docente permanente', 'Educación', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Hamber Luis', 'Andonayre Munayco', 'Docente permanente', 'Educación', 'Titular', 3),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Nalda Guadalupe', 'Damian Nuñez', 'Estudiante posgrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Neptali Antony', 'Reyes Cabrera', 'Externo', null, 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Jimmy', 'Diaz Manrique', 'Docente permanente', 'Educación', 'Titular', 6),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Xavier', 'Fuentes Avila', 'Docente permanente', 'Educación', 'Titular', 7),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Mitchell Alberto', 'Alarcon Diaz', 'Docente permanente', 'Educación', 'Titular', 8),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Marco Antonio', 'Tejada Mendoza', 'Docente permanente', 'Educación', 'Titular', 9),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Quiterio', 'Trujillo Reyna', 'Docente permanente', 'Educación', 'Titular', 10),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Ada Justa', 'De La Cruz Ordoñez', 'Docente permanente', 'Educación', 'Titular', 11),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Cesar Daniel', 'Escuza Mesias', 'Docente permanente', 'Educación', 'Titular', 12),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Marco Antonio', 'Morales Bedoya', 'Docente permanente', 'Educación', 'Titular', 13),
  ((select id from grupos_investigacion where nombre_corto = 'EDUMOT'), null, 'Pamela Fernanda', 'Varas Zapata', 'Estudiante pregrado', 'Educación', 'Adherente', 14);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Perspectivas de la Educación',
  'EDUCACIN',
  'Registrado',
  'La investigación científica educativa se constituye en un campo de mejores posibilidades de calidad e innovación con el uso de las TIC, que viabilizan la producción teórica, la experimentación y la aplicación de enfoques educativos, metodología y tecnología, en el contexto de la diversidad y complejidad que su sistema presenta en el estudio de los objetos que se asumen en su naturaleza multidisciplinaria. Dentro de esta visión de la calidad educativa —brújula orientadora de nuestras decisiones temáticas durante 26 años de investigación institucional— hemos trabajado la investigación curricular, el perfil profesional, y la investigación y evaluación en el desarrollo de capacidades. En los últimos siete años, las TIC en la didáctica de la educación superior, en la formación profesional, y las competencias e integración de las TIC.',
  'Desarrollar la investigación educativa, mejorar la calidad de la educación y el aprendizaje, e innovar con estrategias metodológicas y aplicación de las TIC.',
  'Asesoría de tesis de posgrado, desarrollo de cursos de posgrado, juicio de expertos, jurado en la sustentación de tesis, tutoría para el desarrollo de tesis de pre y posgrado en la institución o en otras externas, y asesoría para la elaboración de artículos de investigación.',
  ARRAY['E.3.2.3.', 'E.3.2.6.', 'E.3.3.1.', 'E.6.0.8', 'E.6.0.16', 'E.6.0.30'],
  ARRAY['Educación superior', 'Didáctica y currículo universitario', 'Educación comparada', 'Educación comparada', 'Educación superior', 'TIC y educación'],
  'mnunezf@unmsm.edu.pe',
  '6197000',
  'Sala de profesores',
  'Pabellón Académico de la Facultad de Educación',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Maria Isabel', 'Nuñez Flores', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Melissa Estefani', 'Ferrer Aguilar', 'Estudiante pregrado', 'Educación', 'Adherente', 2),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Linda', 'Shardin Flores', 'Estudiante posgrado', 'Educación', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Sonia', 'Quiñones Rodriguez', 'Estudiante posgrado', null, 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Juan', 'Loayza Loayza', 'Docente permanente', 'Educación', 'Titular', 5),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Cynthia Lizette', 'Hurtado Espinoza', 'Externo', null, 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Lucy Janet', 'Castañeda Malagon', 'Externo', null, 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Yolanda', 'Ramirez Villacorta', 'Docente permanente', 'Educación', 'Titular', 8),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Claudia Desiré', 'Díaz Cjahua', 'Estudiante posgrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Alejandro Ivan', 'Villacorta Sialer', 'Estudiante posgrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Fiorela Milagros', 'Diaz Tayña', 'Estudiante pregrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCACIN'), null, 'Soledad', 'Paucar Sullca', 'Externo', null, 'Adherente', 12);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Grupo de Investigación e Innovación para la Transformación Social',
  'GRIITS',
  'Registrado',
  'El Grupo de Investigación e Innovación para la Transformación Social es un conjunto de profesionales que trabajamos con enfoque colaborativo y creativo para investigar, generar conocimiento y brindar alternativas de solución a problemáticas identificadas, a través de proyectos de innovación e investigación con distintos enfoques y diseños según nuestras líneas de investigación. Nuestro sueño: mejorar la vida de las personas transformando la educación y la sociedad a través de la investigación.',
  'Generar nuevo conocimiento a través de investigaciones originales y publicar los resultados en revistas científicas. Fomentar la colaboración entre miembros del grupo y con otros grupos de investigación. Contribuir a la formación académica de estudiantes de pregrado y posgrado, brindándoles oportunidades para participar en proyectos de investigación. Participar y colaborar en proyectos internos y externos, con y sin financiamiento. Buscar soluciones innovadoras a problemas específicos en el área de investigación. Contribuir al desarrollo profesional de los miembros del grupo fortaleciendo sus habilidades y experiencia en investigación, y contribuir con la comunidad realizando proyectos de su interés.',
  'Producción científica (publicación de artículos, libros, capítulos de libros), iniciativas de patentes y paquetes tecnológicos. Asesorías a estudiantes de pregrado y posgrado. Participación en eventos nacionales e internacionales para difundir las investigaciones del grupo. Proyectos de investigación en cooperación con instituciones diversas. Organización de congresos según líneas de investigación. Talleres y capacitaciones a instituciones con necesidades relacionadas a procesos metodológicos de investigación.',
  ARRAY['E.6.0.23', 'E.6.0.30', 'E.6.0.2'],
  ARRAY['Investigación e innovación', 'TIC y educación', 'Calidad de la educación'],
  'dfusterg@unmsm.edu.pe',
  '051-619-7000',
  'Instituto de Investigaciones',
  'Av. Germán Amézaga Nro. 375, Lima 1, Perú',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Doris Elida', 'Fuster Guillen', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Manuel Alberto', 'Sedamano Ballesteros', 'Docente permanente', 'Educación', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Milagritos Josefina', 'Saavedra Jaramillo De Sedamano', 'Docente permanente', 'Educación', 'Titular', 3),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Jelly Katherine', 'Lugo Bustillos', 'Externo', null, 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Celia Angélica', 'Cordova Estrella', 'Externo', null, 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Ricardo', 'De La Cruz Rioja', 'Estudiante posgrado', 'Educación', 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Pilarcita', 'Bolaños Gonzalez', 'Estudiante pregrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Luis Carlos', 'López Quiñones', 'Estudiante pregrado', 'Educación', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Víctor Manuel', 'Reyes', 'Externo', null, 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Yoselin Andrea', 'Huapaya Capcha', 'Estudiante posgrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Nelson Hernán', 'Hidalgo Cajavilca', 'Estudiante posgrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Kiara Sofia', 'Tiburcio Saldaña', 'Estudiante pregrado', 'Educación', 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Ana Lucrecia', 'Galvez Diaz', 'Estudiante pregrado', 'Educación', 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'GRIITS'), null, 'Ysabella Del Rocio', 'Bellido Llerena', 'Estudiante pregrado', 'Educación', 'Adherente', 14);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Educación Comparada',
  'EDUCOMP',
  'Registrado',
  'El grupo de investigación EDUCOMP reúne docentes y estudiantes de pregrado y posgrado interesados en desarrollar estudios sobre políticas educativas comparadas a nivel local, regional, nacional e internacional. Los estudiantes de pregrado que lo integran ya venían colaborando con el coordinador de este grupo en proyectos de investigación. Nos interesa especialmente la gestión y la calidad educativa desde una perspectiva comparada, de manera que podamos contribuir al desarrollo de propuestas de mejoramiento de los servicios educativos que ofrecen las instituciones.',
  '1) Promover líneas de investigación sobre Educación Comparada, para el desarrollo de proyectos, tesis y publicaciones. 2) Establecer las condiciones para crear una Sociedad Peruana de Educación Comparada, similar a la que existe en otros países.',
  'Publicaciones sobre políticas educativas comparadas. Asesorías y consultorías en asuntos de evaluación de la calidad educativa y la gestión en educación, desde una perspectiva comparatista.',
  ARRAY['E.3.3.1.', 'E.6.0.3', 'E.6.0.8', 'E.6.0.10'],
  ARRAY['Educación comparada', 'Corrientes pedagógicas', 'Educación comparada', 'Educación de adultos'],
  'kdelgados@unmsm.edu.pe',
  '6197000',
  'Vicedecanato de Investigación y Posgrado',
  'Ciudad Universitaria',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Lucero Del Pilar', 'Pajuelo Vargas', 'Estudiante pregrado', 'Educación', 'Adherente', 1),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Pamela Melisa', 'Diaz Aburto', 'Estudiante pregrado', 'Educación', 'Adherente', 2),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Aide Milagros', 'Morales Gibaja', 'Estudiante pregrado', 'Educación', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Maria Luisa', 'Flores Urpe', 'Docente permanente', 'Educación', 'Titular', 4),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Ofelia Carmen', 'Santos Jimenez', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 5),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Shirly Gavidia', 'Ríos Pozo', 'Estudiante posgrado', 'Educación', 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Karina Merly', 'Astucuri Aguilar', 'Estudiante posgrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Zaida Ruth', 'Quezada Villazana', 'Estudiante pregrado', 'Educación', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Miriam Maricruz', 'Cadillo Rodrìguez', 'Estudiante posgrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Maria Del Rosario', 'Landin Miranda', 'Externo', null, 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Vanessa Milagros', 'Cabezas Salazar', 'Estudiante pregrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Cristian', 'Perez Centeno', 'Externo', null, 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Gabriel Adalberto', 'Vela Quico', 'Externo', null, 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Karol Ghisvel', 'Naula Julca', 'Estudiante pregrado', 'Educación', 'Adherente', 14),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Marsi', 'Huamán Noa', 'Estudiante pregrado', 'Educación', 'Adherente', 15),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Alexandra Jesús', 'Ruiz Pariasca', 'Estudiante pregrado', 'Educación', 'Adherente', 16),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Richard Ruddy', 'Rivas Olivas', 'Estudiante pregrado', 'Educación', 'Adherente', 17),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Nena Yasmin', 'Alcántara Pacasi', 'Estudiante pregrado', 'Educación', 'Adherente', 18),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Alberto Jesús', 'Campos Vargas', 'Estudiante pregrado', 'Educación', 'Adherente', 19),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Rosa Susana', 'Cabrera Espinoza', 'Estudiante pregrado', 'Educación', 'Adherente', 20),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Nadeshka Nikole', 'Tipula Godoy', 'Estudiante pregrado', 'Educación', 'Adherente', 21),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Lizbeth Xiomara', 'Rodriguez Garcia', 'Estudiante pregrado', 'Educación', 'Adherente', 22),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Xu-Li María', 'Quispe Cuadros', 'Estudiante pregrado', 'Educación', 'Adherente', 23),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Rosa Luz', 'Agüero Murrieta', 'Externo', null, 'Adherente', 24),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Nicole Alexia', 'Reyes Selaya', 'Estudiante pregrado', 'Educación', 'Adherente', 25),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Brissa Jahaira', 'Ramos Llamoca', 'Estudiante pregrado', 'Educación', 'Adherente', 26),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Diego Joaquín', 'Ugaz Ruesta', 'Estudiante pregrado', 'Educación', 'Adherente', 27),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Saira Ximena', 'Yaringaño Alanguia', 'Estudiante pregrado', 'Educación', 'Adherente', 28),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Nelly Stephanie', 'Ramos Guivar', 'Estudiante pregrado', 'Educación', 'Adherente', 29),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Ursula Isabel', 'Romani Miranda', 'Estudiante pregrado', 'Educación', 'Adherente', 30),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Reyda Luz', 'Montalvo Moreno', 'Estudiante pregrado', 'Educación', 'Adherente', 31),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Estiven Matias', 'Vilchez Anastacio', 'Estudiante pregrado', 'Educación', 'Adherente', 32),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Ayrton Alex', 'Romero Zevallos', 'Estudiante pregrado', 'Educación', 'Adherente', 33),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Maria Emperatriz', 'Escalante Lopez', 'Docente permanente', 'Educación', 'Titular', 34),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Jose Luis', 'Solis Toscano', 'Estudiante pregrado', 'Educación', 'Adherente', 35),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Maria Leonor', 'Cedeño Sempertegui', 'Externo', null, 'Adherente', 36),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Hugo Maximo', 'Candela Linares', 'Docente permanente', 'Educación', 'Titular', 37),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Yenncy Petronila', 'Ramirez Maldonado', 'Externo', null, 'Adherente', 38),
  ((select id from grupos_investigacion where nombre_corto = 'EDUCOMP'), null, 'Fermín Eduardo', 'Martillo Santander', 'Externo', null, 'Adherente', 39);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Grupo de Investigación Especializado en Pedagogía del Deporte',
  'IESPORTE',
  'Registrado',
  'El Grupo de Investigación Especializado en Pedagogía del Deporte (IESPORTE) centra su atención en las Ciencias del Deporte desde la sistematización, organización, aplicación y evaluación de procedimientos pedagógicos. Concebimos que para el entendimiento de este fenómeno es necesario un abordaje desde un paradigma en particular o de pluriparadigmas de manera general. El grupo considera importantes los múltiples escenarios del deporte y sus significados contemporáneos, en momentos de iniciación, especialización o formación deportiva, poniendo atención a la teoría y la práctica como unidad dialéctica para comprender y transformar el fenómeno deportivo en su conjunto. El reto del grupo es convertirse en un grupo de investigación con excelencia dentro de un clima de trabajo sinérgico, capaz de construir propuestas que impacten positivamente en la formación y cualificación de los técnicos deportivos y profesionales vinculados al deporte nacional e internacional.',
  'Caracterizar la práctica pedagógica en los profesionales y técnicos deportivos. Diseñar propuestas de investigación en relación a los modelos pedagógicos deportivos, construcción de currículos y formas de evaluación. Rediseñar y actualizar los currículos y planes de estudio de centros de formación vinculados al deporte. Diseñar e implementar sistemas de formación y evaluación del perfil del técnico deportivo y profesional vinculado al deporte. Investigar la pedagogía del deporte vinculándola con otras ciencias del deporte, como la metrología deportiva, la biomecánica, la fisiología y la bioquímica deportivas. Proponer modelos tecnológicos con impacto en el proceso de enseñanza-aprendizaje del deporte.',
  'Capacitar al potencial deportivo, profesores de educación física, técnicos deportivos y toda persona vinculada al deporte nacional e internacional. Proyectar y extender socialmente a la universidad para beneficiar a la comunidad. Investigar en la esfera de las Ciencias del Deporte, especialmente la Pedagogía del Deporte.',
  ARRAY['E.6.0.17', 'E.6.0.24', 'E.6.0.23'],
  ARRAY['Educación y actividad física corporal', 'Neurociencias y aprendizaje', 'Investigación e innovación'],
  'sislaa@unmsm.edu.pe',
  '992040590',
  'Oficina de Estudios Generales de la Facultad de Educación',
  'Ciudad Universitaria, Facultad de Educación',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'IESPORTE'), null, 'Sandy Dorian', 'Isla Alcoser', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'IESPORTE'), null, 'Norma Jimena', 'Malca Arrieta', 'Estudiante pregrado', 'Educación', 'Adherente', 2),
  ((select id from grupos_investigacion where nombre_corto = 'IESPORTE'), null, 'Teofilo', 'Huayllaquispe Palomino', 'Docente permanente', 'Educación', 'Titular', 3),
  ((select id from grupos_investigacion where nombre_corto = 'IESPORTE'), null, 'Richard William', 'Sandoval Magalhaes', 'Docente permanente', 'Educación', 'Titular', 4),
  ((select id from grupos_investigacion where nombre_corto = 'IESPORTE'), null, 'Ramiro Norberto', 'Quintana Otero', 'Docente permanente', 'Educación', 'Titular', 5),
  ((select id from grupos_investigacion where nombre_corto = 'IESPORTE'), null, 'Magno Romualdo', 'Paredez Cadillo', 'Docente permanente', 'Educación', 'Titular', 6);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Investigación en Didáctica de las Matemáticas',
  'INDIMAT',
  'Registrado',
  'Ante la constante problemática del aprendizaje del curso de matemática, constatada en la EBR con los resultados de la Evaluación Censal (ECE) y del Programa Internacional para la Evaluación de Estudiantes (PISA), donde los resultados fueron bastante magros, nuestro grupo busca investigar e innovar nuevas metodologías de enseñanza que nos permitan afrontar con éxito el proceso de enseñanza-aprendizaje, tanto en el nivel secundario como superior. Se estudiará el impacto que tiene en la Didáctica de las Matemáticas la utilización de diversos modelos pedagógicos y el uso constante de materiales educativos contextualizados, que consideramos pilares de un adecuado aprendizaje significativo, tanto en lo cognitivo como en lo valorativo. Se considerarán estrategias motivadoras en las sesiones de clase, para que los educandos desarrollen de manera reflexiva y divertida diferentes situaciones problemáticas de su vida real.',
  'Objetivo general: determinar, dentro del curso de Didáctica de las Matemáticas, las mejores estrategias para la enseñanza de la matemática que favorezcan su aprendizaje significativo. Objetivos específicos: determinar la relación entre la utilización de varios modelos pedagógicos y el aprendizaje significativo de la matemática; examinar el grado de relación entre el uso constante de materiales educativos y cada una de las competencias matemáticas.',
  'El grupo de investigación Investigación en Didáctica de las Matemáticas (INDIMAT) está en todo momento dispuesto a cruzar información con otras investigaciones similares, dentro o fuera de la universidad, con miras a perfeccionar el desempeño de los futuros profesionales que nuestro país requiere.',
  ARRAY['E.6.0.21', 'E.6.0.23', 'E.6.0.2'],
  ARRAY['Gestión educativa', 'Investigación e innovación', 'Calidad de la educación'],
  'fchaucav@unmsm.edu.pe',
  '6197000',
  'Unidad de Práctica Preprofesional',
  'Av. Amézaga s/n',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'INDIMAT'), null, 'Fidel Antonio', 'Chauca Vidal', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'INDIMAT'), null, 'Modesto Isidoro', 'Giles Nonalaya', 'Docente permanente', 'Educación', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'INDIMAT'), null, 'Freddy Jesus', 'Huamani Arredondo', 'Docente permanente', 'Educación', 'Titular', 3),
  ((select id from grupos_investigacion where nombre_corto = 'INDIMAT'), null, 'Alvaro Guillermo', 'Molero Farman', 'Estudiante pregrado', 'Educación', 'Adherente', 4);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Influencia del Docente en el Rendimiento Académico del Alumno',
  'INDOREAC',
  'Registrado',
  'El grupo de investigación se ha constituido por profesores y estudiantes de la Universidad Nacional Mayor de San Marcos. Nos hemos conocido como colegas en el ejercicio de la docencia y en reuniones académicas llevadas a cabo en nuestro centro laboral. Los estudiantes que forman parte de nuestro grupo son alumnos destacados de nuestra Facultad de Educación. Nuestros colaboradores externos son ex-estudiantes del Posgrado.',
  'Determinar el grado de incidencia del docente en el rendimiento académico de sus estudiantes, precisando, dentro de los múltiples factores que pueden producir aprendizaje en el alumno, la influencia del docente. Centrándonos en el factor docente, mediremos cada uno de los sub-factores, tales como el dominio de la materia que enseña, la metodología de enseñanza, la relación afectiva con el alumno y la experiencia, entre otros. Conociendo la influencia del docente en el rendimiento, se puede orientar mejor la formación de los futuros docentes.',
  'Como tarea colateral, el grupo tiene planificado llevar a cabo dos cursos de perfeccionamiento: a) Los fundamentos epistemológicos y metodológicos de la investigación educacional; b) Los métodos de enseñanza en el aprendizaje escolar.',
  ARRAY['E.3.1.7.', 'E.6.0.17', 'E.6.0.4', 'E.6.0.2'],
  ARRAY['Gestión educativa', 'Educación y actividad física corporal', 'Desarrollo científico y tecnológico en la formación docente', 'Calidad de la educación'],
  'cbarrigah@unmsm.edu.pe',
  '6197000',
  'Instituto de Investigaciones Educativas',
  'Calle Amézaga s/n, Lima',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Carlos', 'Barriga Hernandez', 'Docente permanente', 'Educación', 'Titular', 1),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Hugo Enrique', 'Asian Canchis', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 2),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Salomon Marcos', 'Berrocal Villegas', 'Docente permanente', 'Educación', 'Titular', 3),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Edwin Francisco', 'Palomino Davila', 'Estudiante posgrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Henry Jhon Kevin', 'Palomino Pinto', 'Estudiante pregrado', 'Ingeniería Industrial', 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Luz Doris', 'Sanchez Pinedo', 'Externo', null, 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Nelly Elizabeth', 'Quiroz Meza', 'Estudiante posgrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Neptali Antony', 'Reyes Cabrera', 'Externo', null, 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Cecilia Alicia', 'Abensur Pinasco', 'Docente permanente', 'Educación', 'Titular', 9),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Julio Cesar', 'Heredia Domenech', 'Estudiante posgrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Abel Fernando', 'Ruiz Aguilar', 'Estudiante posgrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Valeriano Rubén', 'Flores Rosas', 'Externo', null, 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Willner', 'Montalvo Fritas', 'Externo', null, 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Carmen Rosa', 'Berrocal Villegas', 'Externo', null, 'Adherente', 14),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Jose Del Carmen', 'Abad Castillo', 'Docente permanente', 'Medicina', 'Titular', 15),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'María Elena', 'Rodrigo Rojas', 'Externo', null, 'Adherente', 16),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Max Alejandro', 'Huaranja Montaño', 'Externo', null, 'Adherente', 17),
  ((select id from grupos_investigacion where nombre_corto = 'INDOREAC'), null, 'Silvia Raquel', 'Ramirez Linares', 'Estudiante pregrado', 'Educación', 'Adherente', 18);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Ciencias de la Motricidad, Actividad Física y Deporte',
  'MACFIDE',
  'Registrado',
  'El GI tiene como propósito liderar en el país y en Latinoamérica la promoción y difusión de la investigación científica en motricidad, actividad física y deporte, a través de publicaciones de artículos científicos, libros, eventos científicos, consultorías y asesorías, contribuyendo al desarrollo científico y sostenible de la Universidad Nacional Mayor de San Marcos y del país. El GI cuenta con profesionales calificados como investigadores CONCYTEC, que lideran la publicación de artículos y libros científicos en el país en este ámbito de estudio, con investigaciones indexadas en Scopus y Web of Science, y un gran número de investigaciones proyectadas para su estudio y publicación.',
  'Organizar y participar en eventos científicos nacionales e internacionales (congresos, conferencias, simposios, etc.). Realizar consultorías a organismos gubernamentales y no gubernamentales, nacionales e internacionales. Realizar asesorías a estudiantes de pre y posgrado para la elaboración de tesis y artículos científicos en el ámbito nacional e internacional. Realizar asesorías a profesionales de las líneas de estudio y afines para la elaboración y publicación de artículos científicos y libros.',
  'Asesoría a estudiantes de pre y posgrado para la elaboración de tesis en el ámbito nacional e internacional. Asesoría a estudiantes de pre y posgrado para la elaboración y publicación de artículos en revistas científicas nacionales e internacionales indexadas en Scopus y Web of Science. Asesoría a profesionales de las líneas de estudio y afines para la publicación de artículos y libros científicos. Capacitación mediante eventos científicos: congresos, conferencias, simposios, etc. Consultoría para la concreción de proyectos de investigación para organismos gubernamentales y no gubernamentales, nacionales e internacionales.',
  ARRAY['E.3.2.4.', 'E.3.1.6.', 'E.3.5.2.', 'E.6.0.17', 'E.6.0.14', 'E.6.0.2'],
  ARRAY['Educación y actividad física corporal', 'Desarrollo científico y tecnológico en la formación docente', 'Calidad de la educación', 'Educación y actividad física corporal', 'Educación para la salud', 'Calidad de la educación'],
  'amamanir@unmsm.edu.pe',
  '989030871',
  'Sala de docentes de la Escuela Profesional de Educación Física - UNMSM',
  'Calle Germán Amézaga N.º 375 - Ciudad Universitaria UNMSM - Lima 1',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Angel Anibal', 'Mamani Ramos', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Ernesto Andrés', 'Reyes Gonzalez', 'Estudiante pregrado', 'Educación', 'Adherente', 2),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Jhonny Jesús', 'Lava Gálvez', 'Estudiante pregrado', 'Letras y Ciencias Humanas', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Adrian', 'Bernal Velasquez', 'Docente permanente', 'Educación', 'Titular', 4),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Paloma Magdalena', 'Montoya Castillo', 'Estudiante pregrado', 'Educación', 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Fernando Renato', 'Roncal Serpa', 'Estudiante pregrado', 'Educación', 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Carlos Alonso', 'Reyes Peralta', 'Estudiante pregrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'José Rodrigo', 'Barandiarán Ayquipa', 'Estudiante pregrado', 'Educación', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Jorge Alber', 'Quisocala Ramos', 'Externo', null, 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Marcia Rafaella', 'Solari Santander', 'Estudiante pregrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Ada Geraldine', 'Campos Meza', 'Estudiante pregrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Abigail Solange', 'Sánchez Olaya', 'Estudiante pregrado', 'Educación', 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Darwin Ronald', 'López Himán', 'Estudiante pregrado', 'Educación', 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Fernando José', 'Panizo Pimentel', 'Estudiante posgrado', 'Educación', 'Adherente', 14),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Rony Renzo', 'Aquino Lopez', 'Estudiante posgrado', 'Educación', 'Adherente', 15),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'José Felix', 'Márquez Rojas', 'Estudiante pregrado', 'Educación', 'Adherente', 16),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Luis Martin', 'Botton Estrada', 'Estudiante posgrado', 'Educación', 'Adherente', 17),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Sarahi Yanira', 'Luna Ramos', 'Estudiante pregrado', 'Educación', 'Adherente', 18),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Solange Stefania', 'Lopez Arce', 'Estudiante pregrado', 'Educación', 'Adherente', 19),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Rafaela', 'Zavala Bustios', 'Estudiante pregrado', 'Educación', 'Adherente', 20),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Joel Alexander', 'Vivar Cueva', 'Estudiante pregrado', 'Educación', 'Adherente', 21),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Axel Alfonso', 'Torres Galiano', 'Estudiante pregrado', 'Educación', 'Adherente', 22),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Fernando Manuel Samuel', 'Espinoza Lopez', 'Estudiante pregrado', 'Educación', 'Adherente', 23),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Estephanie Yazmin', 'Silva Flores', 'Estudiante pregrado', 'Educación', 'Adherente', 24),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Dayanna Gianella', 'Huamán Guiño', 'Estudiante pregrado', 'Educación', 'Adherente', 25),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Janice Rosseanne', 'Díaz Chacón', 'Estudiante pregrado', 'Educación', 'Adherente', 26),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Renato Martín', 'Najarro Mora', 'Estudiante pregrado', 'Educación', 'Adherente', 27),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Lucia Mireya', 'Soria Villanueva', 'Docente permanente', 'Educación', 'Titular', 28),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Freddy Alejandro', 'Soto Zedano', 'Docente permanente', 'Educación', 'Titular', 29),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Henry', 'Quispe Cruz', 'Externo', null, 'Adherente', 30),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Miguel Aquilino', 'Diaz Barboza', 'Docente permanente', 'Educación', 'Titular', 31),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Carlos Wyly', 'Dextre Mendoza', 'Docente permanente', 'Educación', 'Titular', 32),
  ((select id from grupos_investigacion where nombre_corto = 'MACFIDE'), null, 'Hernando', 'Diaz Andia', 'Docente permanente', 'Educación', 'Titular', 33);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Investigando para Educar',
  'IPE',
  'Registrado',
  'Somos un grupo multidisciplinario conformado por docentes y estudiantes de pre y posgrado que nos reunimos con la finalidad de participar en el diálogo pedagógico, desde nuestro quehacer institucional, educativo e investigativo. La dinámica de la sociedad actual plantea un escenario educativo que exige la formación de un nuevo docente con características adicionales: capaz de percibir las diferentes formas y posibilidades de aprendizaje del estudiante, que hable el lenguaje de la información y la tecnología, que repiense el proceso educativo y gestione las habilidades socioemocionales desde su espacio pedagógico. Por estas razones decidimos unir esfuerzos con la mirada puesta en el futuro de la educación.',
  'Contribuir al mejoramiento de la calidad educativa a través de los aportes generados por nuestros trabajos de investigación. Conformar equipos multidisciplinarios de investigación en temas pedagógicos. Desarrollar e implementar estrategias de investigación con la participación de estudiantes de pre y posgrado.',
  'Realizar webinars relacionados a la problemática pedagógica actual. Asesorar a estudiantes de pre y posgrado en sus trabajos de investigación para la obtención de un grado académico o título universitario. Actualizar a docentes y estudiantes en el manejo de herramientas informáticas aplicadas a la enseñanza e investigación. Realizar congresos y seminarios sobre el desempeño docente. Elaborar proyectos sobre habilidades sociales y emocionales de los integrantes de la comunidad educativa.',
  ARRAY['E.3.2.7.', 'E.6.0.30', 'E.6.0.26', 'E.6.0.6'],
  ARRAY['Problemática universitaria', 'TIC y educación', 'Problemática universitaria', 'Didáctica y currículo universitario'],
  'dmacazanaf_af@unmsm.edu.pe',
  '6197000',
  'Dirección de la Escuela de Educación Física',
  'Ciudad Universitaria',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Dante Manuel', 'Macazana Fernandez', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Eli Romeo', 'Carrillo Vasquez', 'Docente permanente', 'Educación', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Juan Carlos', 'Cámac Fernández', 'Estudiante posgrado', 'Educación', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Norka Ines', 'Obregon Alzamora', 'Estudiante posgrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Erick Félix', 'Quesquén Alarcón', 'Estudiante posgrado', 'Educación', 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Alejandra Dulvina', 'Romero Diaz', 'Docente permanente', 'Educación', 'Titular', 6),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'César Arturo', 'Aguilar Pawelczyk', 'Estudiante posgrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Daniel Rubén', 'Tacca Huamán', 'Externo', null, 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Luz Marina', 'Sito Justiniano', 'Externo', null, 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Maria Del Rosario', 'Sante Anchante', 'Estudiante pregrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Alessandra Del Pilar', 'Estrada Marcelo', 'Estudiante pregrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Fredy Romulo', 'Marcellini Morales', 'Externo', null, 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Victor Hugo', 'Saavedra Sandoval', 'Estudiante posgrado', 'Educación', 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Mary Liz', 'Mendoza Hidalgo', 'Externo', null, 'Adherente', 14),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Yajaira Lizbeth', 'Apolinario Duran', 'Estudiante pregrado', 'Educación', 'Adherente', 15),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Ronald Jesus', 'Yaya Neyra', 'Estudiante pregrado', 'Educación', 'Adherente', 16),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Naysha Geraldiny', 'Coronado Trujillo', 'Estudiante pregrado', 'Educación', 'Adherente', 17),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Henry Jesus', 'Landa Piminchumo', 'Estudiante pregrado', 'Educación', 'Adherente', 18),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Brian Josue', 'Vega Gonzales', 'Estudiante pregrado', 'Educación', 'Adherente', 19),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Sandra Lucero', 'Pizzán Tomanguillo', 'Estudiante posgrado', 'Ciencias Administrativas', 'Adherente', 20),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Génesis Belén', 'Guevara Carrasco', 'Estudiante pregrado', 'Ciencias Administrativas', 'Adherente', 21),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Juan Carlos', 'Cabrejos Ramos', 'Docente permanente', 'Educación', 'Titular', 22),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Juan Carlos', 'Sanchez Sanchez', 'Estudiante pregrado', 'Educación', 'Adherente', 23),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Paul Sebastián', 'Volz Oporto', 'Externo', null, 'Adherente', 24),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Leidy Lucero', 'Rivas Galvez', 'Estudiante pregrado', 'Educación', 'Adherente', 25),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Miguel Angel', 'Faustino Sanchez', 'Docente permanente', 'Ingeniería Geológica, Minera, Metalúrgica y Geográfica', 'Titular', 26),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Enrique Sebastian', 'Huasasquiche Bravo', 'Estudiante pregrado', 'Educación', 'Adherente', 27),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Ofelia Angela', 'Borja García', 'Estudiante posgrado', 'Psicología', 'Adherente', 28),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Pierre Sean', 'Rojas Padilla', 'Estudiante pregrado', 'Ciencias Administrativas', 'Adherente', 29),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Jesús Abel', 'Mejia Cavero', 'Estudiante pregrado', 'Educación', 'Adherente', 30),
  ((select id from grupos_investigacion where nombre_corto = 'IPE'), null, 'Oscar Luis', 'Calle Perez', 'Externo', null, 'Adherente', 31);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Aportes de los profesores de la Facultad de Educación en la formación docente, Universidad Nacional Mayor de San Marcos',
  'MAESTROS',
  'Registrado',
  'El grupo de investigación MAESTROS está formado por docentes egresados de la Facultad de Educación, mayoritariamente de la década de 1960, unidos por la especialidad y la experiencia de docentes de alto nivel académico. Las ideas generadas a partir de esa interacción se revitalizaron desde noviembre de 2016, motivadas también por las exigencias de una formación docente de calidad. Los colegas que nos reunimos tenemos larga experiencia en investigaciones y publicaciones relacionadas con el tema. El coordinador, Mag. Alberto Vásquez Tasayco, ha dirigido 8 proyectos SIN-SIN en el Instituto de Investigación de la Facultad de Educación. Los profesores Nelly Vidalón del Carpio y Fidel Peltroche Pacheco han participado también como miembros en diversos estudios relacionados con esta investigación. Los demás miembros estudian o han estudiado en la Facultad de Educación, en pre y posgrado. El tema de investigación lleva por título: Aportes de los profesores de la Facultad de Educación en la formación docente, Universidad Nacional Mayor de San Marcos, periodo 1946-1980.',
  'Reconocer y justificar la labor profesional docente de los formadores de educadores en la Facultad de Educación. Generar un listado de maestros de la Facultad de Educación en el periodo 1946-1980. Afirmar la identidad profesional docente a partir de la experiencia del ejercicio vocacional de los maestros de la Facultad de Educación.',
  'Organizar dos mesas redondas sobre la función docente en la formación de profesores. El trabajo será difundido para generar cultura organizacional docente en la Facultad de Educación.',
  ARRAY['E.3.2.7.', 'E.6.0.2', 'E.6.0.9', 'E.6.0.23'],
  ARRAY['Problemática universitaria', 'Calidad de la educación', 'Educación comunitaria', 'Investigación e innovación'],
  'avasquezt@unmsm.edu.pe',
  '981912186',
  null,
  'Mz. N Lote 13, Calle B, Urb. 200 Millas - Callao',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Alberto', 'Vasquez Tasayco', 'Externo', 'Educación', 'Adherente', 1),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Gonzalo Alfonso', 'Lovera Huamán', 'Estudiante pregrado', 'Educación', 'Adherente', 2),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Reyna Luisa', 'Cruz Shuan', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 3),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Axel Anthony', 'Flores Lopez', 'Estudiante pregrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Vilma Beatriz', 'Medina Acero', 'Docente permanente', 'Educación', 'Titular', 5),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Hildebrando', 'Gutierrez Sanchez', 'Docente permanente', 'Educación', 'Titular', 6),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Sthefani Elena', 'Garay Ramirez', 'Docente permanente', 'Educación', 'Titular', 7),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Lilia Lucia', 'Baez Rodriguez', 'Docente permanente', 'Educación', 'Titular', 8),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Billy Julio', 'Condorcahuana Roca', 'Estudiante pregrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Angie María', 'Valenzuela Contreras', 'Estudiante pregrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Kevin Jhair', 'Villanueva Trinidad', 'Estudiante pregrado', 'Educación', 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'MAESTROS'), null, 'Gonzalo Alberto', 'Pacheco Lay', 'Docente permanente', 'Educación', 'Titular', 12);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Educación de Calidad',
  'METODOS',
  'Registrado',
  'Somos un grupo de investigación de la Facultad de Educación, dedicados a la investigación para la mejora de los aprendizajes, aplicando métodos y estrategias de enseñanza activas para promover una educación de calidad.',
  'Analizar y desarrollar acciones que permitan a los docentes brindar una buena enseñanza.',
  'Asesoría, revisión de tesis, seminarios, mesas redondas y paneles educativos.',
  ARRAY['E.3.2.3.', 'E.6.0.2', 'E.6.0.16'],
  ARRAY['Educación superior', 'Calidad de la educación', 'Educación superior'],
  'ebarrientosj@unmsm.edu.pe',
  '6197000',
  'Sala de profesores',
  'German Amezaga s/n, Cercado de Lima',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Lizbeth Ethel', 'Estrada Alvarez', 'Estudiante pregrado', 'Educación', 'Adherente', 1),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Jesahel Yanette', 'Vildoso Villegas', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 2),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Juan Victor', 'Ramos Panduro', 'Estudiante posgrado', 'Educación', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Virgilio', 'Vildoso Gonzales', 'Externo', null, 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Oscar Alfredo', 'Colque Ricce', 'Docente permanente', 'Educación', 'Titular', 5),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Eleocadio Dionisio', 'Tirado Paz', 'Externo', null, 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Andrea Marilyn', 'Llanos Garcia', 'Estudiante pregrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Kiara Teresa', 'Flores Tello', 'Estudiante pregrado', 'Educación', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Nayeli', 'Gil Ururi', 'Estudiante pregrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Matias Alonso', 'Segura Suarez', 'Estudiante pregrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Patricia María', 'Zelaya Icaza', 'Externo', null, 'Adherente', 11),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'Angelica Dora', 'Caceres Mari', 'Docente permanente', 'Letras y Ciencias Humanas', 'Titular', 12),
  ((select id from grupos_investigacion where nombre_corto = 'METODOS'), null, 'José Andres', 'Chavarría Mantarí', 'Estudiante pregrado', 'Educación', 'Adherente', 13);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Investigación Psicoeducativa',
  'PSICOEDU',
  'Registrado',
  'El grupo de investigación Investigación Psicoeducativa está integrado por profesores de la Facultad de Educación de ambas escuelas profesionales, provenientes de diferentes especialidades. En los últimos años hemos desarrollado diversas investigaciones en el campo de nuestra especialidad, principalmente en temas vinculados a los factores que inciden en el desarrollo educativo, psicoeducativo, social y emocional de los estudiantes, así como en la relación cuerpo-sujeto-cultura que permite la construcción de la personalidad desde etapas tempranas de la vida y a lo largo de todo el proceso de desarrollo humano. Las investigaciones realizadas han sido publicadas en varias revistas a nivel nacional e internacional.',
  'Contribuir al desarrollo de nuestra profesión realizando investigaciones que amplíen el conocimiento de las variables psicológicas y educativas que intervienen en el proceso de enseñanza-aprendizaje y en el desarrollo humano.',
  'Consultoría en temas psicoeducativos.',
  ARRAY['E.3.2.3.', 'E.6.0.17', 'E.6.0.24', 'E.6.0.15'],
  ARRAY['Educación superior', 'Educación y actividad física corporal', 'Neurociencias y aprendizaje', 'Educación presencial y no presencial'],
  'gcorvettoc@unmsm.edu.pe',
  '955617318',
  'Instituto de Investigación',
  'Ciudad Universitaria, Facultad de Educación',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Daniel Rubén', 'Tacca Huamán', 'Externo', null, 'Adherente', 1),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Carlos Alberto', 'Giles Abarca', 'Docente permanente', 'Educación', 'Titular', 2),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Lucio Maximo', 'Valer Lopera', 'Docente permanente', 'Educación', 'Titular', 3),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Hugo', 'Condori Melendez', 'Estudiante posgrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Stephanie', 'Tapia Flores', 'Estudiante pregrado', 'Educación', 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Carlos Elias', 'Sánchez Tuesta', 'Estudiante pregrado', 'Educación', 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'German Cesar', 'Hernandez Montalvo', 'Estudiante posgrado', 'Educación', 'Adherente', 7),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Pilar Julia', 'Paucar Miranda', 'Estudiante posgrado', 'Educación', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Martín Vidal', 'Villegas Pereyra', 'Estudiante pregrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Erika Marlene', 'Palomino Simón', 'Estudiante posgrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Giovanni Jeffrey', 'Corvetto Castro', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 11),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Rosario Alicia', 'Carrillo Vásquez', 'Estudiante pregrado', 'Educación', 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Mary Liz', 'Mendoza Hidalgo', 'Estudiante posgrado', 'Educación', 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'PSICOEDU'), null, 'Miriam Viviana', 'Ñañez Silva', 'Estudiante posgrado', 'Educación', 'Adherente', 14);

insert into grupos_investigacion (nombre, nombre_corto, estado, presentacion, objetivos, servicios, lineas_codigos, lineas_investigacion, correo_coordinador, telefono, oficina, direccion, orden) values (
  'Ciencia Tecnología y Sociedad',
  'CITECSO',
  'Registrado',
  'Grupo de profesionales y estudiantes interesados en buscar nuevas formas de aprender a enseñar, con el objetivo de que las buenas prácticas docentes contribuyan al logro de aprendizajes oportunos. Partimos de la observación de insatisfacción estudiantil respecto a la falta de innovación docente y a las estrategias tradicionales, buscando despertar el interés por el estudio y formar al profesional que la sociedad espera.',
  'Investigar estrategias activas para el logro de los aprendizajes. Elaborar y promover jornadas de reflexión entre docentes. Promover encuentros, mesas redondas y paneles sobre metodologías activas de aprendizaje. Elaborar una guía de buenas prácticas docentes en la universidad.',
  'Asesoramiento. Actualización y revisión de proyectos innovadores. Capacitación a docentes. Capacitación a estudiantes.',
  ARRAY['E.3.1.6.', 'E.3.2.6.', 'C.0.3.18.', 'E.6.0.30', 'E.6.0.12', 'E.6.0.6'],
  ARRAY['Desarrollo científico y tecnológico en la formación docente', 'Didáctica y currículo universitario', 'Informática y Educación', 'TIC y educación', 'Educación inicial', 'Didáctica y currículo universitario'],
  'tula.sanchez1@unmsm.edu.pe',
  '6197000',
  'Sala de profesores',
  'Av. Amézaga s/n, Cercado de Lima',
  (select coalesce(max(orden), 0) + 1 from grupos_investigacion)
);

insert into grupo_investigacion_integrantes (grupo_id, docente_id, nombres, apellidos, vinculo_unmsm, facultad, tipo_integrante, orden) values
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Tula Carola', 'Sanchez Garcia', 'Docente permanente', 'Educación', 'Titular (Coordinador)', 1),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Diana Victoria', 'Fernandez Manrique', 'Estudiante pregrado', 'Educación', 'Adherente', 2),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'David Alfredo', 'Villanueva Cárdenas', 'Estudiante posgrado', 'Educación', 'Adherente', 3),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Lizbeth Ethel', 'Estrada Alvarez', 'Estudiante pregrado', 'Educación', 'Adherente', 4),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Yvette Vanessa', 'Criado Davila', 'Estudiante posgrado', 'Educación', 'Adherente', 5),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Manuel Augusto', 'Inga Arias', 'Estudiante posgrado', 'Educación', 'Adherente', 6),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Janet Miriam', 'Sanchez Quispe', 'Docente permanente', 'Educación', 'Titular', 7),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Judith Milagros', 'Pascual Fuertes', 'Estudiante pregrado', 'Educación', 'Adherente', 8),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Karol Ruby', 'Villa Santiago', 'Estudiante posgrado', 'Educación', 'Adherente', 9),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Beatriz Rosa', 'Doy Honda', 'Estudiante posgrado', 'Educación', 'Adherente', 10),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Ricardo Edilberto', 'Palacios Perez', 'Docente permanente', 'Ciencias Administrativas', 'Titular', 11),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Miluzka Samantha', 'Andrade Guerrero', 'Estudiante pregrado', 'Educación', 'Adherente', 12),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Melanie Antonieta', 'Mulatillo Guillen', 'Estudiante pregrado', 'Educación', 'Adherente', 13),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Blanca Araceli', 'Auria Burgos', 'Estudiante posgrado', null, 'Adherente', 14),
  ((select id from grupos_investigacion where nombre_corto = 'CITECSO'), null, 'Laura Daysi', 'Bautista Puma', 'Estudiante pregrado', 'Educación', 'Adherente', 15);


