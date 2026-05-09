import { motion } from 'framer-motion'

const transition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] }

export function Reveal({ as = 'div', children, delay = 0, className = '', ...props }) {
  const Component = motion[as]
  return (
    <Component
      className={`reveal ${className}`.trim()}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -10% 0px' }}
      transition={{ ...transition, delay }}
      {...props}
    >
      {children}
    </Component>
  )
}
