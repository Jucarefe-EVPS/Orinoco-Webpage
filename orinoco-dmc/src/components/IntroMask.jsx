import { useEffect, useState } from 'react'
import { Logo } from './Logo.jsx'

export function IntroMask() {
  const [gone, setGone] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const hide = setTimeout(() => setGone(true), 1100)
    const remove = setTimeout(() => setRemoved(true), 2600)
    return () => {
      clearTimeout(hide)
      clearTimeout(remove)
    }
  }, [])

  if (removed) return null
  return (
    <div className={`intro-mask ${gone ? 'gone' : ''}`}>
      <Logo className="brand brand-logo brand-logo--intro" variant="cream" />
    </div>
  )
}
