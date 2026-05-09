import { useState, useEffect } from 'react'
import { LangToggle } from './LangToggle.jsx'
import { Logo } from './Logo.jsx'
import { useLang } from '../hooks/useLang.js'
import { useScrollSolidNav } from '../hooks/useScrollSolidNav.js'

export function Nav() {
  const { t } = useLang()
  const solid = useScrollSolidNav()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`nav ${solid ? 'nav--solid' : ''}`}>
        <a href="#top" className="brand brand-logo-link" onClick={close}>
          <Logo className="brand-logo" variant={solid ? 'navbar-cream' : 'navbar-gold'} />
        </a>
        <div className="nav-links">
          <a href="#destinations">{t.nav.destinations}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#journeys">{t.nav.journeys}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="nav-right">
          <LangToggle />
          <button
            className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-menu-nav">
          <a href="#destinations" onClick={close}>{t.nav.destinations}</a>
          <a href="#services" onClick={close}>{t.nav.services}</a>
          <a href="#journeys" onClick={close}>{t.nav.journeys}</a>
          <a href="#about" onClick={close}>{t.nav.about}</a>
          <a href="#contact" onClick={close}>{t.nav.contact}</a>
        </nav>
        <div className="mobile-menu-foot">
          <LangToggle />
        </div>
      </div>
    </>
  )
}
