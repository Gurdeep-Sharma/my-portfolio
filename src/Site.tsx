import { useEffect } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import SiteHeader from './components/SiteHeader'
import Skills from './components/Skills'
import Work from './components/Work'
import { profile } from './data/profile'
import { prefersReducedMotion } from './lib/scroll'

// Fades sections in as they scroll into view. Content is only hidden once the
// observer is running, so nothing stays invisible if this never runs.
function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) return
    const root = document.documentElement
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('is-visible')
      else observer.observe(el)
    }
    root.classList.add('reveal-ready')
    return () => {
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}

export default function Site() {
  useReveal()

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
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with React, Three.js and Vite.</p>
        </div>
      </footer>
    </>
  )
}
