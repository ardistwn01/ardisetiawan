import { motion } from 'framer-motion'

/**
 * Heading bergaya "chapter komik": eyebrow kecil ("CHAPTER 02"),
 * judul besar Bangers dengan kata aksen merah, dan garis bawah pendek.
 */
export default function ChapterHeading({ chapter, title, accent, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      {chapter && (
        <div className="font-mono text-xs tracking-[0.2em] text-red uppercase mb-1">
          // {chapter}
        </div>
      )}
      <h2 className="font-display text-4xl sm:text-5xl leading-none tracking-wide">
        {title} <span className="text-red">{accent}</span>
      </h2>
      <div className="w-14 h-1 bg-ink rounded-full mt-3 mb-4" />
      {subtitle && (
        <p className="text-ink/70 max-w-xl text-[0.95rem] leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  )
}
