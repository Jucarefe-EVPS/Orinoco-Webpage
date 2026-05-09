import { useState } from 'react'
import { ImagePlaceholder } from '../components/ImagePlaceholder.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { useLang } from '../hooks/useLang.js'
import { media } from '../data/media.js'
import styles from './Inspired.module.css'

function stylizeName(name) {
  const words = ['Gabo', 'Wonders', 'Lost', 'Coast', 'Heritage']
  const match = words.find((word) => name.includes(word))
  if (!match) return name
  const [before, after] = name.split(match)
  return <>{before}<span className={styles.it}>{match}</span>{after}</>
}

export function Inspired() {
  const { t } = useLang()
  const [preview, setPreview] = useState({ show: false, x: 0, y: 0, label: 'HOVER PREVIEW · 560x760' })
  return (
    <section id="journeys" className={styles.inspired}>
      <div className={styles.inspiredHead}>
        <div>
          <Reveal className="eyebrow eyebrow-line">{t.inspired.eyebrow}</Reveal>
          <Reveal as="h2" delay={0.1}>
            <span>{t.inspired.title_l1}</span><br />
            <span className={styles.it}>{t.inspired.title_l2}</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.2}>{t.inspired.sub}</Reveal>
      </div>
      <div>
        {t.inspired.list.map((journey, index) => (
          <Reveal
            key={journey.id}
            className={`${styles.journey} hoverable`}
            onMouseEnter={() => setPreview((p) => ({ ...p, show: true, src: media.journeys[journey.id], label: journey.name.toUpperCase() }))}
            onMouseLeave={() => setPreview((p) => ({ ...p, show: false }))}
            onMouseMove={(event) => setPreview((p) => ({ ...p, x: event.clientX, y: event.clientY }))}
          >
            <span className={styles.journeyNum}>0{index + 1}</span>
            <span className={styles.journeyName}>{stylizeName(journey.name)}</span>
            <span className={styles.journeyMeta}><span>{journey.days}</span><br /><span>{journey.path}</span></span>
            <span className={styles.journeyNote}>{journey.note}</span>
            <span className={styles.journeyArr}>↗</span>
          </Reveal>
        ))}
      </div>
      <div className={`${styles.journeyImg} ${preview.show ? styles.show : ''}`} style={{ left: preview.x, top: preview.y }}>
        <ImagePlaceholder src={preview.src} label={preview.label} style={{ height: '100%' }} />
      </div>
    </section>
  )
}
