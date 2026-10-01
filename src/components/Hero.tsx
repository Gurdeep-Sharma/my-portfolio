import { Component, lazy, Suspense, type ReactNode } from 'react'
import { facts, intro, profile } from '../data/profile'
import { scrollToSection } from '../lib/scroll'
import Figure from './Figure'

// three.js is most of the bundle, so the desk loads in its own chunk and the
// text renders without waiting for it.
const DeskCanvas = lazy(() => import('./desk/DeskCanvas'))

// Without WebGL the drawing quietly disappears; the page doesn't depend on it.
class DeskBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 id="hero-title" className="hero-name">
          {profile.name}
        </h1>

        <div className="hero-grid">
          <div className="hero-text">
            <p className="hero-role">
              {profile.role}, {profile.location}
            </p>
            <p className="hero-lede">{intro.lede}</p>
            <p className="hero-availability">{intro.availability}</p>
            <p className="hero-links">
              <a className="link" href={`mailto:${profile.email}`}>
                Email
              </a>
              <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="link" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="link" href={profile.resume} download>
                Resume (PDF, {profile.resumeSize})
              </a>
            </p>

            <dl className="facts">
              {facts.map((fact) => (
                <div key={fact.label} className="fact">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Figure
            number={0}
            className="hero-fig"
            caption={
              <>
                My desk.{' '}
                <span className="hint-pointer">
                  Click the monitor, calendar, books, photo or phone to jump to that part of the page.
                </span>
                <span className="hint-touch">Tap the monitor, calendar, books, photo or phone to jump around.</span>
              </>
            }
          >
            <div className="desk-sheet" aria-hidden="true">
              <DeskBoundary>
                <Suspense fallback={null}>
                  <DeskCanvas onSelect={scrollToSection} />
                </Suspense>
              </DeskBoundary>
            </div>
          </Figure>
        </div>
      </div>
    </section>
  )
}
