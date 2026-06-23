import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import ChapterHeading from '../components/ChapterHeading'
import { RevealOnScroll, TiltCard } from '../components/ComicAnimations'

const stampColors = ['#FFD60A','#0A84FF','#FF3B30','#30D158','#FF9F0A','#FF2D78']
const cardBg      = ['#fffbe6','#fff0f0','#f0f4ff','#f0fff4','#fff4e0','#fff0f5']
const emojis      = ['🏆','🎓','⭐','🔥','💡','🚀']

export default function Certificates({ certificates }) {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <ChapterHeading chapter="chapter 04" title="BADGES" accent="EARNED!" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((c, i) => (
          <RevealOnScroll key={c.id || c.name} delay={(i % 3) * 0.09}>
            <TiltCard intensity={9}>
              <motion.div
                className="comic-panel relative p-5 h-full"
                style={{ background: cardBg[i % cardBg.length] }}
                whileHover={{ boxShadow: '8px 8px 0 #1A1A2E' }}
              >
                {/* Stamp */}
                <motion.div
                  className="absolute top-3 right-3 w-12 h-12 rounded-full border-[3px] flex items-center justify-center text-xl"
                  style={{
                    borderColor: stampColors[i % stampColors.length],
                    color: stampColors[i % stampColors.length],
                  }}
                  animate={{ rotate: [12, 16, 12] }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
                >
                  {emojis[i % emojis.length]}
                </motion.div>

                <div className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-1">{c.issuer}</div>
                <div className="font-bold text-[0.95rem] leading-snug pr-12 mb-2">{c.name}</div>
                <div className="font-mono text-xs text-ink/50">{c.year}</div>

                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xs text-blue tracking-wide flex items-center gap-1 mt-2"
                  >
                    VIEW CERT <ExternalLink size={12} strokeWidth={2.5} />
                  </a>
                )}
              </motion.div>
            </TiltCard>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
