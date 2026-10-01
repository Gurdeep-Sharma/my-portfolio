import portrait from '../assets/gurdeep-portrait.webp'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about-grid">
        <figure className="polaroid" data-reveal>
          <img src={portrait} alt={profile.name} width={600} height={750} loading="lazy" decoding="async" />
          <figcaption>Mohali, India</figcaption>
        </figure>

        <div className="about-copy" data-reveal>
          <p className="kicker">About</p>
          <h2 id="about-title" className="section-title">
            Hi, I’m Gurdeep.
          </h2>
          <p>
            I’m a full-stack engineer based in Mohali, India. I spent six years at Boffin Coders building products for
            clients abroad, in sprint teams with product owners, designers and stakeholders, taking features from a
            Figma file through the API, the database and the deploy.
          </p>
          <p>
            Alongside delivery, I reviewed code, mentored junior developers and joined architecture planning. I use
            AI-assisted tools (Cursor, Claude Code and OpenAI Codex) every day to ship faster.
          </p>
          <p className="about-goal">
            I’m looking for a senior full-stack role with a product team, in India or remote. I can start immediately.
          </p>
        </div>
      </div>
    </section>
  )
}
