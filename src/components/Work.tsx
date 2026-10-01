import { featured, projects, type Project } from '../data/profile'
import Icon from './Icon'

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="chips" aria-label="Stack">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function FeaturedProject() {
  return (
    <article className="feature" data-reveal>
      <div className="feature-copy">
        <p className="kicker kicker-accent">{featured.kind} · Next.js · MongoDB</p>
        <h3 className="feature-title">{featured.name}</h3>
        <p className="feature-summary">{featured.summary}</p>
        <p className="feature-body">{featured.description}</p>

        <h4 className="mini-head">Decisions worth a look</h4>
        <ul className="decisions">
          {featured.decisions.map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ul>

        <Chips items={featured.stack} />

        {featured.links.length > 0 && (
          <div className="feature-links">
            {featured.links.map((link) => (
              <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">
                {link.label} <Icon name="arrowUpRight" size={15} />
              </a>
            ))}
          </div>
        )}
      </div>

      <figure className="pipeline">
        <figcaption className="pipeline-head">
          <span className="method">POST</span>
          <span>/api/leads</span>
          <span className="pipeline-note">order of operations</span>
        </figcaption>
        <ol className="pipeline-steps">
          {featured.pipeline.map((item, i) => (
            <li key={item.step}>
              <span className="step-no" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <strong>{item.step}</strong>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </figure>
    </article>
  )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className="project" data-reveal>
      <span className="project-index" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>
      <div className="project-main">
        <p className="kicker">{project.kind}</p>
        <h4 className="project-title">{project.name}</h4>
        <p className="project-summary">{project.summary}</p>
        <p className="flow">
          <span className="sr-only">How it fits together: </span>
          {project.flow.map((node, i) => (
            <span key={node} className="flow-step">
              {i > 0 && (
                <span className="flow-arrow" aria-hidden="true">
                  →
                </span>
              )}
              <span className="flow-node">{node}</span>
            </span>
          ))}
        </p>
      </div>
      <div className="project-detail">
        <p className="mini-head">What I built</p>
        <ul className="built">
          {project.built.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Chips items={project.stack} />
      </div>
    </li>
  )
}

export default function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="kicker">Selected work</p>
          <h2 id="work-title" className="section-title">
            Products I’ve built, from the database to the deploy.
          </h2>
          <p className="section-intro">
            Most of my work is client software, so the client projects below describe what I built and how, without
            code or screenshots. Tricity Rides is public, so I can show more of how it works.
          </p>
        </header>

        <FeaturedProject />

        <h3 className="subhead" data-reveal>
          Client work
        </h3>
        <ol className="project-list">
          {projects.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i + 1} />
          ))}
        </ol>
      </div>
    </section>
  )
}
