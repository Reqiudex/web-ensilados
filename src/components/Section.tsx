import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  title: string
  description: string
  children: ReactNode
}

export const Section = ({ title, description, children }: Props) => {
  return (
    <section style={{ margin: '50px 0' }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {description}
      </motion.p>
      <div style={{ marginTop: '20px' }}>{children}</div>
    </section>
  )
}
