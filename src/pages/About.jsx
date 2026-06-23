import { motion } from 'framer-motion'
import ChapterHeading from '../components/ChapterHeading'
import { RevealOnScroll, TiltCard } from '../components/ComicAnimations'

const categoryColors = {
  'Frontend':       { text: '#FF3B30', bg: '#fff0f0' },
  'Backend':        { text: '#0A84FF', bg: '#f0f4ff' },
  'Database':       { text: '#30D158', bg: '#f0fff4' },
  'AI/ML':          { text: '#FF9F0A', bg: '#fff4e0' },
  'Tools & Systems':{ text: '#FF2D78', bg: '#fff0f5' },
}
const fallbackColor = { text: '#1A1A2E', bg: '#f5f5f5' }

export default function About({ profile, skills }) {
  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s.name)
    return acc
  }, {})

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
      <ChapterHeading chapter="chapter 01" title="ABOUT" accent="ME!" />

      <div className="grid md:grid-cols-2 gap-10">
        {/* Bio */}
        <RevealOnScroll>
          <TiltCard intensity={6}>
            <div className="comic-panel p-6 h-full flex flex-col">
              <div className="font-display text-lg text-red mb-4 tracking-wide">THE ORIGIN STORY</div>
              {profile.about_image_url && (
                <div className="w-full h-48 sm:h-64 mb-5 border-[3px] border-ink rounded overflow-hidden shadow-[4px_4px_0_#1A1A2E]">
                  <img src={profile.about_image_url} alt="About Me" className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-[0.95rem] text-ink/80 leading-relaxed">{profile.bio}</p>
            </div>
          </TiltCard>
        </RevealOnScroll>

        {/* Skills */}
        <RevealOnScroll delay={0.1}>
          <TiltCard intensity={6}>
            <div className="comic-panel p-6 h-full">
              <div className="font-display text-lg text-blue mb-4 tracking-wide">TECH ARSENAL</div>
              <div className="space-y-5">
                {Object.entries(grouped).map(([category, items], gi) => {
                  const c = categoryColors[category] || fallbackColor
                  return (
                    <div key={category}>
                      <div className="font-display text-sm tracking-wider mb-2" style={{ color: c.text }}>
                        {category.toUpperCase()}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((name, i) => (
                          <motion.span
                            key={name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: gi * 0.04 + i * 0.03, type: 'spring', stiffness: 300 }}
                            whileHover={{ y: -3, scale: 1.08 }}
                            className="font-bold text-sm px-3 py-1.5 border-[3px] border-ink rounded-full shadow-[3px_3px_0_#1A1A2E] hover:shadow-[5px_5px_0_#1A1A2E] transition-shadow cursor-default"
                            style={{ background: c.bg }}
                          >
                            {name}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </TiltCard>
        </RevealOnScroll>
      </div>
    </div>
  )
}
