import { education, experience } from '../data/profile'

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="kicker">Experience</p>
          <h2 id="experience-title" className="section-title">
            Seven years, two companies, 30+ apps shipped.
          </h2>
        </header>

        <ol className="jobs">
          {experience.map((job) => (
            <li key={job.company} className="job" data-reveal>
              <div className="job-meta">
                <p className="job-period">{job.period}</p>
                <p className="job-company">{job.company}</p>
              </div>
              <div className="job-body">
                <h3 className="job-role">{job.role}</h3>
                <p className="job-summary">{job.summary}</p>
                <ul className="job-highlights">
                  {job.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li className="job job-edu" data-reveal>
            <div className="job-meta">
              <p className="job-period">{education.period}</p>
              <p className="job-company">{education.school}</p>
            </div>
            <div className="job-body">
              <h3 className="job-role">{education.degree}</h3>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}
