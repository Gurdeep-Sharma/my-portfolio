import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import Icon from './Icon'
import Section from './Section'

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
    <Section id="contact" label="Contact">
      <p className="contact-lead">Email is the quickest way to reach me:</p>
      <p className="contact-email">
        <a className="link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button type="button" className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
          <Icon name={copied ? 'check' : 'copy'} size={16} />
          <span aria-hidden="true">{copied ? 'Copied' : 'Copy'}</span>
        </button>
        <span className="sr-only" role="status">
          {copied ? 'Email address copied' : ''}
        </span>
      </p>

      <dl className="contact-list">
        <div className="contact-row">
          <dt>Phone</dt>
          <dd>
            <a className="link" href={profile.phoneHref}>
              {profile.phone}
            </a>
          </dd>
        </div>
        <div className="contact-row">
          <dt>LinkedIn</dt>
          <dd>
            <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">
              {profile.linkedin.replace('https://www.', '')}
            </a>
          </dd>
        </div>
        <div className="contact-row">
          <dt>GitHub</dt>
          <dd>
            <a className="link" href={profile.github} target="_blank" rel="noreferrer">
              {profile.github.replace('https://', '')}
            </a>
          </dd>
        </div>
        <div className="contact-row">
          <dt>Résumé</dt>
          <dd>
            <a className="link" href={profile.resume} download>
              Gurdeep-Sharma-Resume.pdf
            </a>{' '}
            <span className="muted">({profile.resumeSize})</span>
          </dd>
        </div>
      </dl>
    </Section>
  )
}
