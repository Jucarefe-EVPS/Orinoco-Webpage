export function Logo({ className = '', variant = 'default' }) {
  const src = variant === 'cream'
    ? '/logo-cream.svg'
    : variant.startsWith('navbar-')
      ? `/logo-${variant}.svg`
      : '/logo.svg'
  return (
    <span className={`logo-mark ${className}`.trim()} aria-label="Orinoco DMC">
      <img src={src} alt="Orinoco" width="1600" height="441" decoding="async" />
    </span>
  )
}
