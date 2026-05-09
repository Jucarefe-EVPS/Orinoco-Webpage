import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, duration = 1800) {
  const ref = useRef(null)
  const [value, setValue] = useState('0')

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const numeric = Number.parseFloat(target.replace(/,/g, ''))
      const start = performance.now()
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        const next = Math.floor(eased * numeric)
        setValue(target.includes(',') ? next.toLocaleString('en-US') : String(next))
        if (p < 1) requestAnimationFrame(step)
        else setValue(target)
      }
      requestAnimationFrame(step)
      io.unobserve(node)
    }, { threshold: 0.4 })
    io.observe(node)
    return () => io.disconnect()
  }, [target, duration])

  return { ref, value }
}
