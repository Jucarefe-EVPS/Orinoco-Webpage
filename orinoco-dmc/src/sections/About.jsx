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
          <span>{t.about.title_l1}</span><br />
          <span>{t.about.title_l2}</span><br />
          <span className={styles.it}>{t.about.title_l3}</span>
        </Reveal>
        <Reveal as="p" delay={0.2}>{t.about.body}</Reveal>
        <Reveal as="a" href="#contact" className="link-arr" delay={0.3}><span>{t.about.cta}</span><span className="arr">→</span></Reveal>
      </div>
    </section>
  )
}
