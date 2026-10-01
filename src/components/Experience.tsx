import { education, experience } from '../data/profile'
import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience" label="Experience" note="7 years">
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company} className="timeline-row">
            <p className="timeline-years" title={job.dates}>
              {job.years}
            </p>
            <div className="timeline-body">
              <h3 className="item-title">
                {job.role}, {job.company}
              </h3>
              <p className="item-meta">{job.dates}</p>
              <p className="timeline-summary">{job.summary}</p>
              <ul className="dash-list">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
        <li className="timeline-row">
          <p className="timeline-years">{education.years}</p>
          <div className="timeline-body">
            <h3 className="item-title">
              {education.degree}, {education.school}
            </h3>
          </div>
        </li>
      </ol>
    </Section>
  )
}
