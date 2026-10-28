import geistLatin from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url'
import { preload } from 'react-dom'
import { AppProviders } from './components/AppProviders'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import { ui } from './data/profile'
import About from './sections/About'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Journey from './sections/Journey'
import Projects from './sections/Projects'
import Services from './sections/Services'
import Skills from './sections/Skills'

export default function App() {
  // Start downloading the main font immediately (React 19 hoists this into <head>).
  preload(geistLatin, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })

  return (
    <AppProviders>
      <a href="#contenu" className="skip-link">
        {ui.skipLink}
      </a>
      <Navbar />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Services />
        <Contact />
      </main>
      <Footer />
    </AppProviders>
  )
}
