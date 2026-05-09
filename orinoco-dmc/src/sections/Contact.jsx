import { useState } from 'react'
import { useLang } from '../hooks/useLang.js'
import styles from './Contact.module.css'

export function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState('idle')

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

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
        <input name="name" type="text" placeholder={t.contact.placeholder_name} required />
        <input name="email" type="email" placeholder={t.contact.email} required />
        <input name="company" type="text" className={styles.full} placeholder={t.contact.placeholder_company} />
        <textarea name="message" className={styles.full} rows="3" placeholder={t.contact.placeholder_message} required />
        <div className={styles.actions}>
          <button className="btn" type="submit" disabled={status === 'sending'}>
            <span>{status === 'sent' ? '✓ ' : ''}{status === 'sending' ? 'Enviando...' : t.contact.cta}</span><span className="arr">→</span>
          </button>
        </div>
        {status === 'error' && <p className={styles.error}>No se pudo enviar. Inténtalo de nuevo.</p>}
      </form>
    </section>
  )
}
