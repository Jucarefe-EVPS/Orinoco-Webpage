import { Reveal } from '../components/Reveal.jsx'
import { Logo } from '../components/Logo.jsx'
import { useLang } from '../hooks/useLang.js'

function SocialIcon({ name }) {
  if (name === 'instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    )
  }

  if (name === 'linkedin') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon">
        <path d="M6.5 10v8" />
        <path d="M6.5 6.5v.01" />
        <path d="M10.5 18v-8" />
        <path d="M10.5 13.5c0-2.2 1.4-3.8 3.5-3.8 2 0 3.5 1.4 3.5 4V18" />
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon social-icon--x">
      <path d="M13.9 10.5 21.3 2h-1.8l-6.4 7.3L8 2H2l7.8 11.3L2 22h1.8l6.8-7.7L16 22h6zM11.5 13.2l-.8-1.1L4.4 3.3h2.7l5 7 .8 1.1 6.6 9.3h-2.7z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useLang()
  const socials = [
    {
      name: 'Instagram',
      icon: 'instagram',
      href: 'https://www.instagram.com/orinocodmc?igsh=MWZneTUwc2FyOTd4ZQ%3D%3D&utm_source=qr',
    },
    { name: 'LinkedIn', icon: 'linkedin' },
    { name: 'X', icon: 'x', iconOnly: true },
  ]

  return (
    <footer className="footer">
      <Reveal className="display" style={{ fontStyle: 'italic', fontWeight: 300 }}>{t.footer.tag}</Reveal>
      <div className="footer-grid">
        <div>
          <h4>{t.footer.contact}</h4>
          <ul>
            <li><a href="mailto:hello@orinocodmc.com">hello@orinocodmc.com</a></li>
            <li><a href="tel:+582122436595">+58 212 2436595</a></li>
            <li>{t.footer.address}</li>
          </ul>
        </div>
        <div>
          <h4>{t.footer.explore}</h4>
          <ul>
            <li><a href="#destinations">{t.nav.destinations}</a></li>
            <li><a href="#services">{t.nav.services}</a></li>
            <li><a href="#journeys">{t.nav.journeys}</a></li>
          </ul>
        </div>
        <div>
          <h4>Social</h4>
          <ul className="social-list">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  className="social-item"
                  href={social.href || '#'}
                  target={social.href ? '_blank' : undefined}
                  rel={social.href ? 'noreferrer' : undefined}
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} />
                  {!social.iconOnly && <span>{social.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t.footer.legal}</h4>
          <ul><li>Privacy</li><li>Terms</li></ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-brandline">
          <Logo className="brand-logo brand-logo--footer" variant="cream" />
          <span>{t.footer.rights.replace(/Orinoco DMC/g, '').replace(/Â·/g, '').trim()}</span>
        </span>
      </div>
    </footer>
  )
}
