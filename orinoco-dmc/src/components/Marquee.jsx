export function Marquee({ items, className = '' }) {
  const doubled = [...items, ...items]
  return (
    <div className={`marquee ${className}`.trim()}>
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </div>
    </div>
  )
}
