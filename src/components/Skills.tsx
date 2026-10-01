import { skills } from '../data/profile'
import Section from './Section'

export default function Skills() {
  return (
    <Section id="skills" label="Skills">
      <dl className="skill-list">
        {skills.map((row) => (
          <div key={row.group} className="skill-row">
            <dt>{row.group}</dt>
            <dd>{row.items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
