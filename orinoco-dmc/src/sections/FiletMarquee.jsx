import { Marquee } from '../components/Marquee.jsx'
import styles from './FiletMarquee.module.css'

const items = [
  '<em>Salto Ángel</em><small>— 5°58′N 62°32′W —</small>',
  '<em>Roraima</em><small>— 2,810 m —</small>',
  '<em>Los Llanos</em><small>— Apure —</small>',
  '<em>Delta del Orinoco</em><small>— Warao —</small>',
  '<em>Los Roques</em><small>— 50 cayos —</small>',
  '<em>Mérida & Andes</em><small>— 4,978 m —</small>',
]

export function FiletMarquee() {
  return <Marquee items={items} className={styles.filet} />
}
