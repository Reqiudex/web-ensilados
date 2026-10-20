import { motion } from 'framer-motion'

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 }
  })
}

export const ContactForm = () => {
  const campos = ['Tu nombre', 'Tu correo electrónico', 'Mensaje']

  return (
    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      {campos.map((placeholder, i) => (
        <motion.div
          key={placeholder}
          className="input-wrapper"
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={formVariants}
        >
          {placeholder === 'Mensaje' ? (
            <textarea placeholder={placeholder} rows={4} required />
          ) : (
            <input
              type={placeholder.includes('correo') ? 'email' : 'text'}
              placeholder={placeholder}
              required
            />
          )}
        </motion.div>
      ))}

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="submit-button"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Enviar
      </motion.button>
    </form>
  )
}
