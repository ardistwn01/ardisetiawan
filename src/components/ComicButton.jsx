import { motion } from 'framer-motion'

const variants = {
  yellow: 'bg-yellow text-ink',
  red: 'bg-red text-white',
  blue: 'bg-blue text-white',
  green: 'bg-green text-ink',
  ink: 'bg-ink text-white',
  pink: 'bg-pink text-white',
}

/**
 * Tombol bergaya komik: border tebal, shadow offset yang "menempel"
 * saat ditekan (translate + shadow mengecil) untuk meniru efek klik fisik.
 */
export default function ComicButton({
  as: Component = 'button',
  variant = 'yellow',
  children,
  className = '',
  ...props
}) {
  return (
    <motion.div
      whileHover={{ x: -2, y: -2 }}
      whileTap={{ x: 2, y: 2 }}
      className="inline-block"
    >
      <Component
        className={`font-display text-base tracking-wider px-6 py-2.5 border-[3px] border-ink rounded-md shadow-[4px_4px_0_#1A1A2E] transition-shadow hover:shadow-[6px_6px_0_#1A1A2E] active:shadow-[2px_2px_0_#1A1A2E] inline-block ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  )
}
