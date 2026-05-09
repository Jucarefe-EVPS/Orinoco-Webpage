import { useRef, useState } from 'react'
import { ImagePlaceholder } from '../components/ImagePlaceholder.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { useLang } from '../hooks/useLang.js'
import { media } from '../data/media.js'
import styles from './Destinations.module.css'

export function Destinations() {
  const { t } = useLang()
  const trackRef = useRef(null)
  const [progress, setProgress] = useState(8)
  const [current, setCurrent] = useState(1)

  const step = () => {
    const card = trackRef.current?.querySelector('[data-dest-card]')
    return (card?.getBoundingClientRect().width || 380) + 40
  }
  const scroll = (dir) => trackRef.current?.scrollBy({ left: dir * step(), behavior: 'smooth' })
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth || 1
    const ratio = track.scrollLeft / max
    setProgress(8 + ratio * 92)
    setCurrent(Math.min(Math.round(track.scrollLeft / step()) + 1, t.destinations.list.length))
  }

  return (
    <section id="destinations" className={styles.dest}>
      <div className={styles.container}>
        <div>
          <Reveal className="eyebrow eyebrow-line">{t.destinations.eyebrow}</Reveal>
          <Reveal as="h2" delay={0.1}>
            <span>{t.destinations.title_l1}</span><br />
            <span className={styles.it}>{t.destinations.title_l2}</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={0.2}>{t.destinations.sub}</Reveal>
      </div>
      <div className={styles.destTrack} ref={trackRef} onScroll={onScroll}>
        {t.destinations.list.map((dest) => (
          <article key={dest.n} className={styles.destCard} data-dest-card>
            <ImagePlaceholder src={media.destinations[Number(dest.n) - 1]} dark label={dest.name.toUpperCase()} />
            <div className={styles.destMeta}><span>{dest.n}</span><span>{dest.region}</span></div>
            <h3>{dest.name}</h3>
            <p>{dest.note}</p>
          </article>
        ))}
      </div>
      <div className={styles.destNav}>
        <span className={styles.count}>{String(current).padStart(2, '0')} / {t.destinations.list.length}</span>
        <div className={styles.progress}><div style={{ width: `${progress}%` }} /></div>
        <div className={styles.arrows}>
          <button type="button" aria-label="Previous destination" onClick={() => scroll(-1)}>←</button>
          <button type="button" aria-label="Next destination" onClick={() => scroll(1)}>→</button>
        </div>
      </div>
    </section>
  )
}
