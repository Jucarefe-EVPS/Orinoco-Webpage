import { useEffect, useRef, useState } from 'react'
import { useLang } from '../hooks/useLang.js'
import styles from './Contact.module.css'

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

export function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState('idle')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef(null)
  const widgetIdRef = useRef(null)

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return undefined

    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileRef.current || widgetIdRef.current !== null) return

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        theme: 'light',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      })
    }

    const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')
    if (existingScript) {
      renderTurnstile()
      existingScript.addEventListener('load', renderTurnstile)
    } else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.addEventListener('load', renderTurnstile)
      document.head.appendChild(script)
    }

    return () => {
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [])

  const resetTurnstile = () => {
    setTurnstileToken('')
    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const data = {
      ...Object.fromEntries(new FormData(form)),
      turnstileToken,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('sent')
      form.reset()
      resetTurnstile()
    } catch {
      setStatus('error')
      resetTurnstile()
    }
  }

  const captchaRequired = Boolean(turnstileSiteKey)
  const submitDisabled = status === 'sending' || (captchaRequired && !turnstileToken)

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactHead}>
        <div>
          <div className="eyebrow eyebrow-line">{t.contact.eyebrow}</div>
          <h2>
            <span>{t.contact.title_l1}</span><br />
            <span className={styles.it}>{t.contact.title_l2}</span>
          </h2>
        </div>
        <p>{t.contact.sub}</p>
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <input name="website" type="text" className={styles.honey} tabIndex="-1" autoComplete="off" aria-hidden="true" />
        <label className={styles.field}>
          <span>{t.contact.placeholder_name}</span>
          <input name="name" type="text" required />
        </label>
        <label className={styles.field}>
          <span>{t.contact.email}</span>
          <input name="email" type="email" required />
        </label>
        <label className={`${styles.field} ${styles.full}`}>
          <span>{t.contact.placeholder_company}</span>
          <input name="company" type="text" />
        </label>
        <label className={`${styles.field} ${styles.full}`}>
          <span>{t.contact.placeholder_message}</span>
          <textarea name="message" rows="3" required />
        </label>
        <div className={styles.formFoot}>
          {captchaRequired && (
            <div className={styles.captcha}>
              <div ref={turnstileRef} />
            </div>
          )}
          <div className={styles.actions}>
            <button className={styles.send} type="submit" disabled={submitDisabled}>
              <span>{status === 'sent' ? 'OK ' : ''}{status === 'sending' ? 'Enviando...' : t.contact.cta}</span><span className="arr">&rarr;</span>
            </button>
          </div>
        </div>
        {status === 'error' && <p className={styles.error}>No se pudo enviar. Intentalo de nuevo.</p>}
      </form>
    </section>
  )
}
