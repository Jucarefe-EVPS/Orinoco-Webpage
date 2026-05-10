import { ImagePlaceholder } from '../components/ImagePlaceholder.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { useLang } from '../hooks/useLang.js'
import { media } from '../data/media.js'
import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

export function Hero() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const slides = media.heroSlides

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((index) => (index + 1) % slides.length)
    }, 5200)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.heroBg}>
        {slides.map((slide, index) => (
          <div className={`${styles.heroSlide} ${index === active ? styles.active : ''}`} key={slide.src}>
            <ImagePlaceholder src={slide.src} label={`${slide.title} · ${slide.place}`} />
          </div>
        ))}
      </div>
      <div className={styles.heroContent}>
        <Reveal as="h1" delay={0.1}>
          <span>{t.hero.slogan_l1}</span><br />
          <span className={styles.it}>{t.hero.slogan_l2}</span><br />
          <span>{t.hero.slogan_l3}</span>
        </Reveal>
        <div className={styles.heroFoot}>
          <Reveal as="p" className={styles.heroSub} delay={0.2}>{t.hero.sub}</Reveal>
          <div className={styles.heroControls}>
            <div className={styles.slideMeta}>
              <span>{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
              <strong>{slides[active].title}</strong>
            </div>
            <div className={styles.dots} aria-label="Hero carousel">
              {slides.map((slide, index) => (
                <button
                  type="button"
                  key={slide.src}
                  className={index === active ? styles.dotActive : ''}
                  aria-label={`Show ${slide.title}`}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
            <div className={styles.scrollHint}>scroll</div>
          </div>
        </div>
      </div>
    </section>
  )
}
