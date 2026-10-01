import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import SiteHeader from './components/SiteHeader'
import Skills from './components/Skills'
import Work from './components/Work'
import { profile } from './data/profile'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Last updated October 2026</p>
        </div>
      </footer>
    </>
  )
}
