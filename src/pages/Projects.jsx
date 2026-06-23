import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import ChapterHeading from '../components/ChapterHeading'
import { TiltCard, RevealOnScroll } from '../components/ComicAnimations'

const cardBg    = ['#fffbe6','#fff0f0','#f0f4ff','#f0fff4','#fff4e0','#fff0f5']
const tagColors = ['#FFD60A','#FF3B30','#0A84FF','#30D158','#FF9F0A','#FF2D78']

function hostnameOf(url) {
  try { return new URL(url).hostname.replace('www.', '') }
  catch { return url }
}

export default function Projects({ projects }) {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <ChapterHeading
        chapter="chapter 02"
        title="MY"
        accent="PROJECTS!"
        subtitle="Beberapa proyek yang udah gue bangun dan deploy. Klik buat langsung lihat live demo-nya."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <RevealOnScroll key={p.id || p.title} delay={(i % 3) * 0.1}>
            <TiltCard intensity={10}>
              <motion.a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="comic-panel relative p-6 block group h-full"
                style={{ background: cardBg[i % cardBg.length] }}
                whileHover={{ boxShadow: '8px 8px 0 #1A1A2E' }}
                transition={{ duration: 0.15 }}
              >
                {p.featured && (
                  <span className="absolute top-0 right-0 bg-red text-white font-display text-xs tracking-wider px-3 py-1 rounded-bl-md">
                    ★ FEATURED
                  </span>
                )}

                {/* Number + Icon */}
                <div className="flex items-center gap-3 mb-2">
                  <motion.span
                    className="text-3xl"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {p.icon || '🚀'}
                  </motion.span>
                  <span
                    className="font-display text-4xl text-stroke text-yellow leading-none"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display text-xl tracking-wide mb-2">{p.title}</h3>
                <p className="text-[0.88rem] text-ink/75 leading-relaxed mb-4">{p.description}</p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(p.stack || []).map((s, j) => (
                    <motion.span
                      key={s}
                      className="font-bold text-xs px-2.5 py-1 border-2 border-ink rounded-full"
                      style={{ background: tagColors[j % tagColors.length] }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-ink/40">
                  <span className="font-mono text-xs text-ink/50">{hostnameOf(p.url)}</span>
                  <motion.span
                    className="font-display text-sm text-red flex items-center gap-1"
                    whileHover={{ x: 3 }}
                  >
                    OPEN <ExternalLink size={14} strokeWidth={2.5} />
                  </motion.span>
                </div>
              </motion.a>
            </TiltCard>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
