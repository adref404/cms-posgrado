import React from 'react';
import HeroSection from './../../components/student/HeroComponent';
import HeroStatsBar from '../../components/student/HeroStatsBar';
import ProgramasHomeSection from '../../components/student/ProgramasHomeSection';
import AdmisionHomeSection from '../../components/student/AdmisionHomeSection';
import PorQueEstudiarSection from '../../components/student/PorQueEstudiarSection';
import NosotrosHomeSection from '../../components/student/NosotrosHomeSection';
import TestimonialsSection from '../../components/student/TestimonialsSection';
import NovedadesHomeSection from '../../components/student/NovedadesHomeSection';
import CTASection from '../../components/student/CTASection';
const HomeStudent = () => {

  return (
    <>
      {/* Hero + cifras institucionales, en una sola pantalla: el contenedor
          mide exactamente un viewport (h-screen) y reparte ese alto entre el
          carrusel (flex-1, se encoge lo que haga falta) y la franja de
          cifras (alto natural, fijo). Así las cifras siempre son visibles
          sin necesidad de hacer scroll, sin tocar los controles del Hero
          (ver comentario en HeroStatsBar.jsx). */}
      <div className="h-screen flex flex-col">
        {/* min-h como piso: en el 99% de los casos el Hero tiene de sobra
            para encogerse a lo que le sobra del viewport. Solo en el caso
            extremo de un celular muy bajo combinado con un aviso destacado
            muy largo, este piso evita que el texto del Hero quede
            ilegible/aplastado contra el header — se prioriza la
            legibilidad sobre el cero-scroll en ese caso puntual. */}
        <div
          className="flex-1 min-h-0"
          style={{ minHeight: "calc(450px + var(--aviso-bar-height, 0px))" }}
        >
          <HeroSection/>
        </div>
        <HeroStatsBar />
      </div>

      {/* Sección de Programas — lo que la mayoría busca al entrar */}
      <ProgramasHomeSection />

      {/* Sección de Cronograma de Admisión — acción con urgencia real */}
      <AdmisionHomeSection />

      {/* Sección de Novedades (Actualidad) — sube de posición para que se
          descubra rápido: es el contenido que más cambia semana a semana,
          no tiene sentido enterrarlo debajo de las secciones de marca que
          casi no cambian. */}
      <NovedadesHomeSection />

      {/* Sección: Quiénes Somos */}
      <NosotrosHomeSection />

      {/* Sección: ¿Por qué estudiar con nosotros? */}
      <PorQueEstudiarSection />

      {/* Sección de Testimonios */}
      <TestimonialsSection />

      {/* Sección CTA */}
      <CTASection />

    </>
  );
};

export default HomeStudent;
