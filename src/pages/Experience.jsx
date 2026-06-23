import { motion } from 'framer-motion'
import ChapterHeading from '../components/ChapterHeading'
import { RevealOnScroll } from '../components/ComicAnimations'

const dotColors = ['#FFD60A','#0A84FF','#30D158','#FF9F0A']
const cardBg    = ['#fffbe6','#f0f4ff','#f0fff4','#fff4e0']
const tagColors = ['#FFD60A','#FF3B30','#0A84FF','#30D158','#FF9F0A','#FF2D78']

export default function Experience({ experiences }) {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
      <ChapterHeading chapter="chapter 03" title="LEVEL" accent="UP!" />

      <div className="relative pl-10 sm:pl-12">
        {/* Garis timeline putus-putus */}
        <div
          className="absolute left-[10px] sm:left-[14px] top-0 bottom-0 w-1 rounded-full"
          style={{
            background: 'repeating-linear-gradient(to bottom,#1A1A2E 0,#1A1A2E 8px,transparent 8px,transparent 14px)',
          }}
        />

        {experiences.map((e, i) => (
          <RevealOnScroll key={e.id || e.role} delay={i * 0.12}>
            <div className="relative mb-8">
              {/* Dot */}
              <motion.div
                className="absolute -left-[34px] sm:-left-[38px] top-4 w-5 h-5 rounded-full border-[3px] border-ink"
                style={{ background: dotColors[i % dotColors.length], boxShadow: '2px 2px 0 #1A1A2E' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: i * 0.1 }}
              />

              <motion.div
                className="comic-panel p-5"
                style={{ background: cardBg[i % cardBg.length] }}
                whileHover={{ x: 4, boxShadow: '8px 8px 0 #1A1A2E' }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-mono text-xs text-ink/50 mb-1">{e.period}</div>
                <h3 className="font-display text-xl tracking-wide mb-0.5">{e.role}</h3>
                <div className="font-bold text-sm text-blue mb-3">{e.company}</div>
                <p className="text-[0.88rem] text-ink/75 leading-relaxed">{e.description}</p>
                {e.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {e.tags.map((t, j) => (
                      <motion.span
                        key={t}
                        className="font-bold text-xs px-2.5 py-1 border-2 border-ink rounded-full"
                        style={{ background: tagColors[j % tagColors.length] }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
