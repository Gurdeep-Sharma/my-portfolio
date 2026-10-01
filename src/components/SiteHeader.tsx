import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import Icon from './Icon'

const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label={`${profile.name}, back to top`}>
          <span className="brand-mark" aria-hidden="true">
            G
          </span>
          <span className="brand-name">{profile.name}</span>
        </a>
        <nav className="main-nav" aria-label="Main">
          <ul className="nav-links">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-ghost btn-small" href={profile.resume} download>
          Resume <Icon name="download" size={15} />
        </a>
      </div>
    </header>
  )
}
