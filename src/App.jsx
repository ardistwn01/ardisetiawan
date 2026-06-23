import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Certificates from './pages/Certificates'
import Contact from './pages/Contact'
import AdminPage from './admin/AdminPage'
import { AuthProvider } from './hooks/useAuth.jsx'
import { usePortfolioData } from './hooks/usePortfolioData'

// Animasi transisi antar halaman — "slide masuk dari bawah + fade"
// menyerupai membuka halaman baru pada buku komik.
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.25, ease: 'easeIn' } },
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

function PortfolioRoutes() {
  const location = useLocation()
  const { profile, skills, projects, experiences, certificates, loading } = usePortfolioData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-10 h-10 border-4 border-ink border-t-yellow rounded-full"
        />
      </div>
    )
  }

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <AnimatePresence mode="wait">
              <AnimatedPage key="home">
                <Home profile={profile} projects={projects} certificates={certificates} experiences={experiences} />
              </AnimatedPage>
            </AnimatePresence>
          }
        />
        <Route path="/about"        element={<AnimatedPage key="about"><About profile={profile} skills={skills} /></AnimatedPage>} />
        <Route path="/projects"     element={<AnimatedPage key="projects"><Projects projects={projects} /></AnimatedPage>} />
        <Route path="/experience"   element={<AnimatedPage key="experience"><Experience experiences={experiences} /></AnimatedPage>} />
        <Route path="/certificates" element={<AnimatedPage key="certs"><Certificates certificates={certificates} /></AnimatedPage>} />
        <Route path="/contact"      element={<AnimatedPage key="contact"><Contact profile={profile} /></AnimatedPage>} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioRoutes />
    </AuthProvider>
  )
}
