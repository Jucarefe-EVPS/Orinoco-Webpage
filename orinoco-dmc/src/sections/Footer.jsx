import { Reveal } from '../components/Reveal.jsx'
import { Logo } from '../components/Logo.jsx'
import { useLang } from '../hooks/useLang.js'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <Reveal className="display" style={{ fontStyle: 'italic', fontWeight: 300 }}>{t.footer.tag}</Reveal>
      <div className="footer-grid">
        <div>
          <h4>{t.footer.contact}</h4>
          <ul>
            <li><a href="mailto:hello@orinocodmc.com">hello@orinocodmc.com</a></li>
            <li>+58 212 000 0000</li>
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
          <ul><li>Instagram</li><li>LinkedIn</li><li>Vimeo</li></ul>
        </div>
        <div>
          <h4>{t.footer.legal}</h4>
          <ul><li>Privacy</li><li>Terms</li></ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-brandline">
          <Logo className="brand-logo brand-logo--footer" variant="cream" />
          <span>{t.footer.rights.replace(/Orinoco DMC/g, '').replace(/·/g, '').trim()}</span>
        </span>
        <span>Sister DMC of Macondo · Caracas — Bogotá</span>
      </div>
    </footer>
  )
}
