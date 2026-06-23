import { motion } from 'framer-motion'

/**
 * Memecah teks per karakter dan menganimasikan tiap karakter masuk
 * dengan efek "pop" bergaya komik (scale overshoot + rotate ringan).
 */
export function ComicTextReveal({ text, className = '', delay = 0, stagger = 0.04 }) {
  const chars = text.split('')

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotate: -8, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{
            delay: delay + i * stagger,
            type: 'spring',
            stiffness: 400,
            damping: 20,
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

/**
 * Wrapper reveal untuk section — slide up + fade saat masuk viewport.
 */
export function RevealOnScroll({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Card dengan efek 3D tilt saat hover — menggunakan CSS transform
 * berdasarkan posisi mouse relatif terhadap card.
 */
export function TiltCard({ children, className = '', intensity = 10 }) {
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    e.currentTarget.style.transform = `
      perspective(600px)
      rotateX(${-y * intensity}deg)
      rotateY(${x * intensity}deg)
      translateZ(6px)
    `
  }
  function handleMouseLeave(e) {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)'
  }
  function handleMouseEnter(e) {
    e.currentTarget.style.transition = 'transform 0.1s linear'
  }

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
