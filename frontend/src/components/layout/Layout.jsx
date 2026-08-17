import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AvisoDestacadoBar from '../student/AvisoDestacadoBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Barra de aviso urgente — sitewide, no solo Home: alguien puede
          entrar directo a una noticia o un trámite sin pasar por el Home,
          y si hay algo urgente (ej. cierre de matrícula) igual debe verlo. */}
      <AvisoDestacadoBar />
      <Header />
      <main className="flex-1">
        <Outlet /> {/* Aquí se renderizan las páginas */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
