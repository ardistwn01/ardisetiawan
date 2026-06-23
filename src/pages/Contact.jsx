import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Copy, Check } from 'lucide-react'
import ChapterHeading from '../components/ChapterHeading'
import ComicButton from '../components/ComicButton'
import { TiltCard, RevealOnScroll } from '../components/ComicAnimations'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/BrandIcons'

export default function Contact({ profile }) {
  const [copied, setCopied] = useState(false)

  const items = [
    { Icon: Mail,          label: 'Email',     val: profile.email,                                    href: `mailto:${profile.email}`,                                                          color: '#FF3B30' },
    { Icon: GithubIcon,    label: 'GitHub',    val: profile.github_url?.replace('https://',''),       href: profile.github_url,                                                                 color: '#1A1A2E' },
    { Icon: LinkedinIcon,  label: 'LinkedIn',  val: profile.linkedin_url?.replace('https://',''),     href: profile.linkedin_url,                                                               color: '#0077B5' },
    { Icon: InstagramIcon, label: 'Instagram', val: profile.instagram_handle,                         href: `https://instagram.com/${(profile.instagram_handle||'').replace('@','')}`,         color: '#E1306C' },
  ].filter(it => it.val)

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000) }
    catch { /* skip */ }
  }

  return (
    <div className="max-w-xl mx-auto px-5 sm:px-8 py-16 text-center">
      <RevealOnScroll>
        <motion.div
          animate={{ rotate: [-6, -4, -6], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="font-display text-5xl text-red mb-4 inline-block"
          style={{ textShadow: '3px 3px 0 #1A1A2E' }}
        >
          BAM!
        </motion.div>
      </RevealOnScroll>

      <ChapterHeading chapter="chapter 05" title="LET'S" accent="TALK!" />

      <p className="text-ink/70 leading-relaxed mb-8 -mt-4">
        Terbuka buat kolaborasi, freelance, atau ngobrol soal tech. Jangan sungkan!
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {items.map((it, i) => (
          <RevealOnScroll key={it.label} delay={i * 0.09}>
            <TiltCard intensity={8}>
              <motion.a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="comic-panel flex items-center gap-3 p-4 text-left"
                whileHover={{ boxShadow: '7px 7px 0 #1A1A2E' }}
              >
                <span
                  className="w-9 h-9 rounded-md border-2 border-ink flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: it.color }}
                >
                  <it.Icon size={18} strokeWidth={2.5} />
                </span>
                <div>
                  <div className="font-display text-sm tracking-wide">{it.label}</div>
                  <div className="font-mono text-xs text-ink/60 truncate">{it.val}</div>
                </div>
              </motion.a>
            </TiltCard>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.4}>
        <ComicButton variant="red" onClick={copyEmail}>
          {copied
            ? <span className="flex items-center gap-2"><Check size={16} strokeWidth={3}/> Email Disalin!</span>
            : <span className="flex items-center gap-2"><Copy size={16} strokeWidth={3}/> Copy Email</span>
          }
        </ComicButton>
      </RevealOnScroll>
    </div>
  )
}
