import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import ComicButton from '../components/ComicButton'
import { isSupabaseConfigured } from '../lib/supabase'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="max-w-sm mx-auto px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="comic-panel p-8 text-center"
      >
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-ink flex items-center justify-center">
          <Lock size={26} className="text-yellow" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-2xl mb-1">ADMIN ZONE</h1>
        <p className="font-mono text-xs text-ink/50 mb-6">Login dengan akun Supabase kamu</p>

        {!isSupabaseConfigured && (
          <div className="text-left text-xs bg-yellow/30 border-2 border-ink rounded-md p-3 mb-4 leading-relaxed">
            Supabase belum dikonfigurasi. Isi <code className="font-mono">.env</code> dengan
            <code className="font-mono"> VITE_SUPABASE_URL</code> dan
            <code className="font-mono"> VITE_SUPABASE_ANON_KEY</code> lalu buat user admin di Supabase Auth.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <div>
            <label className="font-display text-xs tracking-wider block mb-1">EMAIL</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kamu@email.com"
              className="w-full px-3 py-2 border-[3px] border-ink rounded-md font-body text-sm outline-none focus:border-blue"
            />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider block mb-1">PASSWORD</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border-[3px] border-ink rounded-md font-body text-sm outline-none focus:border-blue"
            />
          </div>

          {error && <p className="text-xs text-red font-bold">{error}</p>}

          <ComicButton type="submit" variant="ink" className="w-full mt-2" disabled={loading}>
            {loading ? 'Memproses...' : 'MASUK →'}
          </ComicButton>
        </form>
      </motion.div>
    </div>
  )
}
