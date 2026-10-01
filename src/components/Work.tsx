import { featured, projects } from '../data/profile'
import Figure, { Flow } from './Figure'
import Section from './Section'

function FeaturedProject() {
  return (
    <article className="feature">
      <header className="item-head">
        <h3 className="item-title">{featured.name}</h3>
        <p className="item-kind">{featured.summary}</p>
        <p className="item-meta">{featured.meta}</p>
      </header>

      <div className="feature-grid">
        <div className="feature-text">
          {featured.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <h4 className="notes-head">Design notes</h4>
          <ol className="notes">
            {featured.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ol>

          {featured.links.length > 0 && (
            <p className="item-links">
              {featured.links.map((link) => (
                <a key={link.href} className="link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </p>
          )}
        </div>

        <Figure number={1} caption={featured.caption} className="pipeline-fig">
          <ol className="pipeline">
            {featured.pipeline.map((item, i) => (
              <li key={item.step}>
                <span className="pipeline-step">
                  <span className="pipeline-no">{i + 1}</span>
                  {item.step}
                </span>
                <span className="pipeline-detail">{item.detail}</span>
              </li>
            ))}
          </ol>
        </Figure>
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <Section id="work" label="Work" note="1 public project, 5 client projects">
      <p className="section-intro">
        Most of what I’ve built belongs to clients, so I describe what I did on each project and how the pieces fit
        together instead of showing code or screens. Tricity Rides is public, so it gets more detail.
      </p>

      <FeaturedProject />

      <div className="projects">
        {projects.map((project, i) => (
          <article key={project.name} className="project">
            <div className="project-text">
              <h3 className="item-title">{project.name}</h3>
              <p className="item-kind">{project.kind}</p>
              <p>{project.built}</p>
              <p className="item-meta">
                <span className="meta-key">Stack</span> {project.stack}
              </p>
            </div>
            <Figure number={i + 2} caption={`How ${project.name} fits together.`} className="flow-fig">
              <Flow nodes={project.flow} />
            </Figure>
          </article>
        ))}
      </div>
    </Section>
  )
}
