import { skills, tools } from '../data/profile'

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="kicker">Skills</p>
          <h2 id="skills-title" className="section-title">
            What I build with.
          </h2>
        </header>

        <div className="skill-grid">
          {skills.map((group) => (
            <article key={group.group} className="skill-card" data-reveal>
              <h3>{group.group}</h3>
              <p>{group.note}</p>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="tools" data-reveal>
          <span className="kicker">Daily tools</span>
          <span>{tools.join(' · ')}</span>
        </p>
      </div>
    </section>
  )
}
