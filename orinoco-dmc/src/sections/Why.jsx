import { Reveal } from '../components/Reveal.jsx'
import { useLang } from '../hooks/useLang.js'
import styles from './Why.module.css'

export function Why() {
  const { t } = useLang()
  return (
    <section className={styles.why}>
      <Reveal className="eyebrow eyebrow-line">{t.why.eyebrow}</Reveal>
      <div className={styles.whyHead}>
        <div>
          <Reveal as="h2" delay={0.1}>
            <span>{t.why.title_l1}</span>{' '}
            <span className={styles.titleAccent}>{t.why.title_l2}</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.2}>{t.why.body}</Reveal>
      </div>
    </section>
  )
}
