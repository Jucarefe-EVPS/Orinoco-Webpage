import { useEffect, useMemo, useState } from 'react'
import { copy } from '../data/copy.js'
import { LangContext } from './LangContextCore.js'

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('orinoco_lang') || 'en')
  const setLang = (next) => {
    setLangState(next)
    localStorage.setItem('orinoco_lang', next)
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
