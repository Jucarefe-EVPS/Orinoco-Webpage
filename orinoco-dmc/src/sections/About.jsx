import { ImagePlaceholder } from '../components/ImagePlaceholder.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { useLang } from '../hooks/useLang.js'
import { media } from '../data/media.js'
import styles from './About.module.css'

export function About() {
  const { t } = useLang()
  return (
    <section id="about" className={styles.about}>
      <Reveal className={styles.aboutImg}>
        <ImagePlaceholder src={media.about} label="CHORONÍ · VENEZUELAN COAST" className={styles.aboutPhoto} style={{ height: '100%' }} />
      </Reveal>
      <div className={styles.aboutText}>
        <Reveal className={`eyebrow eyebrow-line ${styles.aboutEyebrow}`}>{t.about.eyebrow}</Reveal>
        <Reveal as="h2" className={`${styles.display} display`} delay={0.1}>
          <span>{t.about.title_l1}</span>{' '}
          <span className={styles.it}>{t.about.title_l2}</span>
        </Reveal>
        <Reveal as="p" className={styles.lead} delay={0.2}>{t.about.body}</Reveal>
        <Reveal delay={0.3}>
          <details className={styles.more}>
            <summary className="link-arr">
              <span>{t.about.cta}</span>
              <span className={`arr ${styles.arrow}`} aria-hidden="true">→</span>
            </summary>
            <div className={styles.moreBody}>
              <p>{t.about.body_2}</p>
              <p>{t.about.body_3}</p>
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  )
}
