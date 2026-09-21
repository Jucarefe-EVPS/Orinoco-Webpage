import { Reveal } from '../components/Reveal.jsx'
import { useCountUp } from '../hooks/useCountUp.js'
import { useLang } from '../hooks/useLang.js'
import styles from './ExpertiseStats.module.css'

function Stat({ stat, index }) {
  const { ref, value } = useCountUp(stat.n)
  return (
    <Reveal className={styles.stat} delay={index * 0.1}>
      <div ref={ref} className={styles.statNumber}>{value}</div>
      <div className={styles.statLabel}>{stat.l}</div>
    </Reveal>
  )
}

export function ExpertiseStats() {
  const { t } = useLang()

  return (
    <section className={styles.wrap}>
      <Reveal className="eyebrow eyebrow-line">{t.why.stats_eyebrow}</Reveal>
      <div className={styles.intro}>
        <div>
          <Reveal as="h2" delay={0.1}>
            <span>{t.why.stats_title_l1}</span><br />
            <span className={styles.it}>{t.why.stats_title_l2}</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.2}>{t.why.stats_body}</Reveal>
      </div>
      <div className={styles.stats}>
        {t.why.stats.map((stat, index) => <Stat key={stat.l} stat={stat} index={index} />)}
      </div>
    </section>
  )
}
