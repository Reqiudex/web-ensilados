import { motion } from 'framer-motion'

interface Props {
  title: string
}

export const ProductCard = ({ title }: Props) => {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}
    >
      <h3>{title}</h3>
      <p>Calidad garantizada directamente del campo.</p>
    </motion.div>
  )
}
