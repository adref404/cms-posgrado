import React from 'react';
import HeroSection from './../../components/student/HeroComponent';
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
      {/* Hero Section */}
      <HeroSection/>

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
