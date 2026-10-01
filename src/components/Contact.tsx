import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import Icon from './Icon'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // Clipboard can be blocked; the address is on screen and in the mailto link.
    }
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card" data-reveal>
          <p className="kicker kicker-accent">Contact</p>
          <h2 id="contact-title" className="contact-title">
            Hiring a senior full-stack engineer? <em>Let’s talk.</em>
          </h2>
          <p className="contact-lede">
            I can start immediately, in India or remote. Email is the quickest way to reach me.
          </p>

          <div className="contact-primary">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={18} /> Email me
            </a>
            <span className="email-copy">
              <span className="email-address">{profile.email}</span>
              <button type="button" className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
                <Icon name={copied ? 'check' : 'copy'} size={17} />
              </button>
              <span className="sr-only" role="status">
                {copied ? 'Email address copied' : ''}
              </span>
            </span>
          </div>

          <ul className="contact-links">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={18} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={18} /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.phoneHref}>
                <Icon name="phone" size={18} /> {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.resume} download>
                <Icon name="download" size={18} /> Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
