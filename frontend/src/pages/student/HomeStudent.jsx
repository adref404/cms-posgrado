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

      {/* Sección: ¿Por qué estudiar con nosotros? */}
      <PorQueEstudiarSection />

      {/* Sección: Quiénes Somos */}
      <NosotrosHomeSection />

      {/* Sección de Testimonios */}
      <TestimonialsSection />

      {/* Sección de Novedades */}
      <NovedadesHomeSection />

      {/* Sección CTA */}
      <CTASection />

    </>
  );
};

export default HomeStudent;
