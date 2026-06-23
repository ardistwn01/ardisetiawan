import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { usePortfolioData } from '../hooks/usePortfolioData'
import AdminProjectsTab from './AdminProjectsTab'
import AdminCertificatesTab from './AdminCertificatesTab'
import AdminExperienceTab from './AdminExperienceTab'
import AdminSkillsTab from './AdminSkillsTab'
import AdminProfileTab from './AdminProfileTab'

const tabs = [
  { key: 'projects', label: 'Projects' },
  { key: 'certs', label: 'Certs' },
  { key: 'experience', label: 'Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'profile', label: 'Profile' },
]

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { profile, skills, projects, experiences, certificates, refetch, loading } = usePortfolioData()
  const [activeTab, setActiveTab] = useState('projects')
  const [toast, setToast] = useState(null)

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl tracking-wide">⚙ DASHBOARD</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 font-display text-sm px-4 py-2 bg-red text-white border-[3px] border-ink rounded-md shadow-[3px_3px_0_#1A1A2E]"
        >
          <LogOut size={14} strokeWidth={2.5} /> Logout
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatBox n={projects.length} label="Projects" />
        <StatBox n={certificates.length} label="Certs" />
        <StatBox n={experiences.length} label="Experience" />
        <StatBox n={skills.length} label="Skills" />
      </div>

      <div className="flex gap-0 border-[3px] border-ink rounded-md overflow-hidden w-fit mb-6 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`font-display text-sm tracking-wider px-4 py-2 border-r-2 border-ink last:border-r-0 transition-colors ${
              activeTab === t.key ? 'bg-ink text-yellow' : 'bg-white text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="font-mono text-sm text-ink/50">Memuat data...</p>
      ) : (
        <>
          {activeTab === 'projects' && (
            <AdminProjectsTab projects={projects} onChanged={refetch} showToast={showToast} />
          )}
          {activeTab === 'certs' && (
            <AdminCertificatesTab certificates={certificates} onChanged={refetch} showToast={showToast} />
          )}
          {activeTab === 'experience' && (
            <AdminExperienceTab experiences={experiences} onChanged={refetch} showToast={showToast} />
          )}
          {activeTab === 'skills' && (
            <AdminSkillsTab skills={skills} onChanged={refetch} showToast={showToast} />
          )}
          {activeTab === 'profile' && (
            <AdminProfileTab profile={profile} onChanged={refetch} showToast={showToast} />
          )}
        </>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className={`fixed bottom-6 right-6 font-display text-sm tracking-wide px-5 py-3 rounded-md border-[3px] border-ink shadow-[4px_4px_0_#1A1A2E] ${
              toast.type === 'error' ? 'bg-red text-white' : 'bg-yellow text-ink'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StatBox({ n, label }) {
  return (
    <div className="comic-panel-sm bg-white p-3 text-center">
      <div className="font-display text-2xl text-red">{n}</div>
      <div className="font-mono text-[0.65rem] text-ink/50">{label}</div>
    </div>
  )
}
