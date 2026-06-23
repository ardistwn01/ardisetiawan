import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Settings } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'XP' },
  { to: '/certificates', label: 'Certs' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-ink border-b-[3px] border-yellow">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-2xl text-yellow tracking-wide"
          style={{ textShadow: '2px 2px 0 #FF3B30' }}
          onClick={() => setOpen(false)}
        >
          AS!
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`font-display text-sm tracking-wider px-3 py-1.5 rounded transition-colors ${
                  location.pathname === l.to
                    ? 'text-yellow bg-white/10'
                    : 'text-white hover:text-yellow hover:bg-white/10'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/admin"
          className="hidden md:inline-flex items-center gap-1.5 font-display text-sm tracking-wider px-3 py-1.5 rounded bg-yellow text-ink border-2 border-yellow hover:bg-orange hover:border-orange transition-colors"
        >
          <Settings size={14} strokeWidth={3} /> Admin
        </Link>

        <button
          className="md:hidden text-yellow"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-ink border-t-2 border-yellow/30 overflow-hidden"
          >
            <ul className="flex flex-col px-5 py-3 gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block font-display text-base tracking-wider px-3 py-2 rounded ${
                      location.pathname === l.to ? 'text-yellow bg-white/10' : 'text-white'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 font-display text-base tracking-wider px-3 py-2 rounded bg-yellow text-ink mt-1 w-fit"
                >
                  <Settings size={15} strokeWidth={3} /> Admin
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
