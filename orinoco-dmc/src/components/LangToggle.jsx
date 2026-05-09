import { useLang } from '../hooks/useLang.js'

export function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-toggle" aria-label="Language">
      {['es', 'en'].map((item) => (
        <button key={item} type="button" className={lang === item ? 'active' : ''} onClick={() => setLang(item)}>
          <span>{item.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}
