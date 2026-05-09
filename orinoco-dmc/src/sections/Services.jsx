import { motion } from 'framer-motion'
import { services } from '../data/services.js'
import { useLang } from '../hooks/useLang.js'
import s from './Services.module.css'

const ease = [0.22, 1, 0.36, 1]

export default function Services() {
  const { lang, t } = useLang()
  const copy = t.services

  return (
    <section className={s.wrap} id="services">
      <div className={s.head}>
        <div>
          <span className={s.eyebrow}>— {copy.eyebrow}</span>
          <h2 className={s.title}>{copy.title}</h2>
        </div>
        <span className={s.tagline}>{copy.tagline}</span>
      </div>

      <div className={s.list}>
        {services.map((svc, index) => (
          <motion.article
            key={svc.id}
            className={s.item}
            style={{ '--service-bg': `url("${svc.image}")`, '--service-focus': svc.focus }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease, delay: index * 0.15 }}
          >
            <div className={s.big} aria-hidden="true">{svc.num}</div>

            <div className={s.nameCol}>
              <h3 className={s.name}>{svc.name[lang]}</h3>
            </div>

            <p className={s.desc}>{svc.desc[lang]}</p>

            <ul className={s.meta}>
              {svc.meta.map((item, itemIndex) => (
                <li key={itemIndex} className={item.strong ? s.metaStrong : undefined}>
                  {item.label[lang]}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
