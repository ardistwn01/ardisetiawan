import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ComicButton from '../components/ComicButton'
import ComicAvatar from '../components/ComicAvatar'
import { ComicTextReveal, RevealOnScroll, TiltCard } from '../components/ComicAnimations'

// Stat counter animasi sederhana
function AnimatedStat({ n, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 18 }}
      className="text-center"
    >
      <motion.div
        className={`font-display text-2xl ${color}`}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
      >
        {n}
      </motion.div>
      <div className="font-mono text-xs text-ink/50">{label}</div>
    </motion.div>
  )
}

export default function Home({ profile, projects, certificates, experiences }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yBadge  = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yAvatar = useTransform(scrollYProgress, [0, 1], [0, 60])
  const yText   = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  const firstName = (profile.name || 'Ardi').split(' ')[0]
  const lastName  = (profile.name || 'Ardi Setiawan').split(' ').slice(1).join(' ')

  return (
    <div ref={heroRef} className="relative">
      <motion.div
        style={{ opacity, scale }}
        className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1fr_auto] gap-10 items-center min-h-[calc(100vh-64px)] py-12"
      >
        {/* ── LEFT CONTENT ── */}
        <motion.div style={{ y: yText }}>
          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 18 }}
            style={{ y: yBadge }}
            className="speech-bubble inline-block px-4 py-2 mb-6"
          >
            <span className="font-display text-sm tracking-wider">
              YO! WELCOME TO MY PORTFOLIO!
            </span>
          </motion.div>

          {/* Action word */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -20 }}
            animate={{ opacity: 1, x: 0, rotate: -8 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 15 }}
            className="font-display text-3xl text-blue mb-1 inline-block"
            style={{ textShadow: '3px 3px 0 #1A1A2E' }}
          >
            POW!
          </motion.div>

          {/* Name — karakter per karakter */}
          <h1 className="font-display leading-[0.95] mb-2">
            <div className="text-[clamp(3rem,8vw,6rem)]">
              <ComicTextReveal
                text={firstName}
                delay={0.3}
                stagger={0.06}
                className="text-stroke text-yellow"
              />
            </div>
            <div className="text-[clamp(3rem,8vw,6rem)]">
              <ComicTextReveal
                text={lastName}
                delay={0.5}
                stagger={0.05}
                className="text-ink"
              />
            </div>
          </h1>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-2 my-5"
          >
            {['Fullstack Dev', 'AI Explorer', "UHAMKA '23", 'Problem Solver'].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 300 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="font-bold text-sm px-3 py-1 border-[3px] border-ink rounded-full cursor-default shadow-[3px_3px_0_#1A1A2E]"
                style={{
                  background: ['#FF3B30','#0A84FF','#FFD60A','#1A1A2E'][i],
                  color: i === 3 ? '#fff' : i === 0 || i === 1 ? '#fff' : '#1A1A2E',
                }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="text-ink/75 max-w-md leading-relaxed mb-8"
          >
            {profile.bio?.slice(0, 160) ||
              'Mahasiswa Teknik Informatika yang suka bikin hal-hal keren dari nol — web, bot, AI, game, semua gue coba!'}{' '}
            🚀
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <ComicButton as={Link} to="/projects" variant="red">🔥 Lihat Projects</ComicButton>
            <ComicButton as={Link} to="/contact" variant="ink">💬 Hubungi Gue</ComicButton>
          </motion.div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 border-t-[3px] border-dashed border-ink/20">
            <AnimatedStat n={`${projects.length}+`}     label="Projects"    color="text-red"   delay={1.4} />
            <AnimatedStat n={`${certificates.length}+`} label="Certificates" color="text-blue"  delay={1.5} />
            <AnimatedStat n={`${experiences.length}`}   label="Experience"  color="text-green"  delay={1.6} />
          </div>
        </motion.div>

        {/* ── RIGHT — AVATAR 3D TILT ── */}
        <motion.div
          style={{ y: yAvatar }}
          className="hidden md:flex flex-col items-center gap-5"
        >
          {/* Starburst spinning */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
            className="w-20 h-20 flex items-center justify-center text-ink font-display text-[0.65rem] text-center leading-tight"
            style={{
              background: '#FFD60A',
              clipPath:
                'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
            }}
          >
            HIRE<br />ME!
          </motion.div>

          {/* Avatar dengan 3D tilt */}
          <TiltCard intensity={12}>
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 18 }}
              className="comic-panel w-[220px] h-[260px] flex items-end justify-center overflow-hidden"
            >
              <ComicAvatar className="w-[180px] h-[220px]" />
            </motion.div>
          </TiltCard>

          {/* NIM card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85, type: 'spring' }}
            className="comic-panel-sm bg-blue text-white text-center w-[200px] py-3"
          >
            <div className="font-display text-sm tracking-wider">NIM: 2303015136</div>
            <div className="font-mono text-[0.7rem] opacity-90">UHAMKA — TI</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Zigzag divider */}
      <div className="zigzag-divider" />

      {/* ── QUICK PREVIEW CARDS (scroll section pertama) ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <RevealOnScroll>
          <div className="font-display text-center text-2xl text-red mb-2">EXPLORE THE STORY</div>
          <p className="text-center text-ink/50 font-mono text-xs mb-10">Pilih chapter yang mau kamu baca</p>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { to: '/about',       icon: '🧑‍💻', title: 'About Me',      desc: 'Origin story & tech arsenal',   color: '#FFD60A', delay: 0 },
            { to: '/projects',    icon: '🚀', title: 'Projects',       desc: `${projects.length} proyek live di Vercel`, color: '#FF3B30', delay: 0.08 },
            { to: '/experience',  icon: '💼', title: 'Experience',     desc: `${experiences.length} pengalaman kerja`,   color: '#0A84FF', delay: 0.16 },
            { to: '/certificates',icon: '🏆', title: 'Certificates',   desc: `${certificates.length} sertifikat earned`,  color: '#30D158', delay: 0.24 },
            { to: '/contact',     icon: '💬', title: "Let's Talk",     desc: 'Buka jalur komunikasi',          color: '#FF9F0A', delay: 0.32 },
          ].map((item) => (
            <RevealOnScroll key={item.to} delay={item.delay}>
              <TiltCard intensity={8}>
                <Link
                  to={item.to}
                  className="comic-panel block p-5 group"
                  style={{ background: item.color + '18' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div
                      className="font-display text-xl tracking-wide"
                      style={{ color: item.color === '#FFD60A' ? '#1A1A2E' : item.color }}
                    >
                      {item.title}
                    </div>
                  </div>
                  <p className="text-sm text-ink/65 leading-relaxed mb-3">{item.desc}</p>
                  <div
                    className="font-display text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: item.color === '#FFD60A' ? '#1A1A2E' : item.color }}
                  >
                    READ MORE →
                  </div>
                </Link>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  )
}
