import { media } from '../data/media.js'
import styles from './PhotoRibbon.module.css'

export function PhotoRibbon() {
  const photos = [...media.gallery, ...media.gallery]
  return (
    <section className={styles.ribbon} aria-label="Orinoco photo gallery">
      <div className={styles.track}>
        {photos.map((src, index) => (
          <figure className={styles.photo} key={`${src}-${index}`}>
            <img src={src} alt="" loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  )
}
