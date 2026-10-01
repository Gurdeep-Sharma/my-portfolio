import { Component, lazy, Suspense, type ReactNode } from 'react'
import { profile, stats } from '../data/profile'
import { scrollToSection } from '../lib/scroll'
import Icon from './Icon'

// three.js is most of the bundle, so the desk loads in its own chunk and the
// text above renders without waiting for it.
const DeskCanvas = lazy(() => import('./desk/DeskCanvas'))

// Without WebGL the desk quietly disappears; the page doesn't depend on it.
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
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="status">
            <span className="status-dot" aria-hidden="true" />
            Available now · Immediate joiner
          </p>
          <h1 id="hero-title" className="hero-title">
            Senior full-stack engineer who ships <em>whole products.</em>
          </h1>
          <p className="hero-lede">
            I’m {profile.name}. For 7+ years I’ve built production web apps for international clients: React and
            Next.js on the front, Node.js and NestJS behind it, deployed on AWS and GCP.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">
              See my work <Icon name="arrowDown" size={16} />
            </a>
            <a className="btn btn-ghost" href={profile.resume} download>
              Download resume <Icon name="download" size={16} />
            </a>
          </div>
          <p className="hero-meta">
            <Icon name="pin" size={15} />
            {profile.location} · Open to remote and relocation
          </p>
        </div>

        <div className="hero-stage" aria-hidden="true">
          <DeskBoundary>
            <Suspense fallback={<div className="desk" />}>
              <DeskCanvas onSelect={scrollToSection} />
            </Suspense>
          </DeskBoundary>
          <p className="stage-hint">
            <span className="hint-pointer">The desk is clickable. Try the monitor.</span>
            <span className="hint-touch">Tap the desk to jump around.</span>
          </p>
        </div>
      </div>

      <div className="container">
        <ul className="stats">
          {stats.map((stat) => (
            <li key={stat.value} className="stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
