import Hero from '../components/sections/Hero.jsx';
import Manifesto from '../components/sections/Manifesto.jsx';
import About from '../components/sections/About.jsx';
import Services from '../components/sections/Services.jsx';
import Experience from '../components/sections/Experience.jsx';
import Team from '../components/sections/Team.jsx';
import Gallery from '../components/sections/Gallery.jsx';
import Location from '../components/sections/Location.jsx';

/** Narrativa da página: chegada → propósito → o posto → serviços → atendimento → pessoas → registros → rota. */
export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <About />
      <Services />
      <Experience />
      <Team />
      <Gallery />
      <Location />
    </>
  );
}
