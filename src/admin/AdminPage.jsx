import { useAuth } from '../hooks/useAuth.jsx'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import { isSupabaseConfigured } from '../lib/supabase'

export default function AdminPage() {
  const { isAuthenticated, loading } = useAuth()

  if (!isSupabaseConfigured) {
    return <AdminLogin />
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <p className="font-mono text-sm text-ink/50">Memeriksa sesi login...</p>
      </div>
    )
  }

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />
}
