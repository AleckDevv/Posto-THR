import { LazyMotion, MotionConfig } from 'motion/react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

// Os recursos de animação chegam em um chunk separado, depois do conteúdo.
const loadMotionFeatures = () => import('../utils/motionFeatures.js').then((mod) => mod.default);

/**
 * Estrutura comum: link de salto, cabeçalho, conteúdo e rodapé.
 * LazyMotion carrega sob demanda apenas o conjunto de animações usado (domAnimation);
 * MotionConfig respeita prefers-reduced-motion do sistema.
 */
export default function MainLayout({ children }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-white px-5 py-3 text-sm font-semibold text-thr-ink shadow-lg transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
