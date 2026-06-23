import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum di-set. ' +
    'Buat file .env (lihat .env.example) lalu isi dengan kredensial project Supabase kamu.'
  )
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
