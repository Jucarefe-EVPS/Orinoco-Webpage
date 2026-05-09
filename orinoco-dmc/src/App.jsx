import { LangProvider } from './context/LangContext.jsx'
import { IntroMask } from './components/IntroMask.jsx'
import { Nav } from './components/Nav.jsx'
import { Hero } from './sections/Hero.jsx'
import { FiletMarquee } from './sections/FiletMarquee.jsx'
import { About } from './sections/About.jsx'
import Services from './sections/Services.jsx'
import { Why } from './sections/Why.jsx'
import { PhotoRibbon } from './sections/PhotoRibbon.jsx'
import { Destinations } from './sections/Destinations.jsx'
import { Inspired } from './sections/Inspired.jsx'
import { Contact } from './sections/Contact.jsx'
import { Footer } from './sections/Footer.jsx'
import './styles/tokens.css'
import './styles/global.css'

export default function App() {
  return (
    <LangProvider>
      <IntroMask />
      <Nav />
      <main>
        <Hero />
        <FiletMarquee />
        <About />
        <Services />
        <Why />
        <PhotoRibbon />
        <Destinations />
        <Inspired />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  )
}
