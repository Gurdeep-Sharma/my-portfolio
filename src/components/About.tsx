import portrait from '../assets/gurdeep-portrait.webp'
import { about, intro, profile } from '../data/profile'
import Section from './Section'

export default function About() {
  return (
    <Section id="about" label="About">
      <div className="about-grid">
        <figure className="portrait">
          <img src={portrait} alt={profile.name} width={600} height={750} loading="lazy" decoding="async" />
          <figcaption>Mohali, 2026</figcaption>
        </figure>
        <div className="about-text">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="about-now">{intro.availability}</p>
        </div>
      </div>
    </Section>
  )
}
