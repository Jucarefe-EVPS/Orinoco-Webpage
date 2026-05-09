export function ImagePlaceholder({ src, label, className = '', dark = false, style }) {
  const classes = ['img-ph', dark ? 'img-ph--dark' : '', className].filter(Boolean).join(' ')
  if (src) {
    return (
      <div className={`img-real ${className}`} style={style}>
        <img src={src} alt={label || ''} />
        {label && <span className="swap-hint">{label}</span>}
      </div>
    )
  }
  return <div className={classes} data-label={label} style={style} />
}
