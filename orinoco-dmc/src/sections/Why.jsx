import { Reveal } from '../components/Reveal.jsx'
import { useCountUp } from '../hooks/useCountUp.js'
import { useLang } from '../hooks/useLang.js'
import styles from './Why.module.css'

function Stat({ stat, index }) {
  const { ref, value } = useCountUp(stat.n)
  return (
    <Reveal className={styles.stat} delay={index * 0.1}>
      <div ref={ref} className="stat-num">{value}</div>
      <div className="stat-label">{stat.l}</div>
    </Reveal>
  )
}

export function Why() {
  const { t } = useLang()
  return (
    <section className={styles.why}>
      <div className={styles.whyHead}>
        <div>
          <Reveal className="eyebrow eyebrow-line">{t.why.eyebrow}</Reveal>
          <Reveal as="h2" delay={0.1}>
            <span>{t.why.title_l1}</span><br />
            <span className={styles.it}>{t.why.title_l2}</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.2}>{t.why.body}</Reveal>
      </div>
      <div className={styles.stats}>
        {t.why.stats.map((stat, index) => <Stat key={stat.l} stat={stat} index={index} />)}
      </div>
    </section>
  )
}
