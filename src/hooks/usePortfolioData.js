import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import {
  fallbackProfile,
  fallbackSkills,
  fallbackProjects,
  fallbackExperiences,
  fallbackCertificates,
} from '../data/fallbackData'

/**
 * Hook utama: ambil semua data portofolio (profile, skills, projects,
 * experiences, certificates) sekali jalan. Kalau Supabase belum
 * dikonfigurasi, otomatis pakai data dummy supaya UI tetap bisa di-preview.
 */
export function usePortfolioData() {
  const [data, setData] = useState({
    profile: fallbackProfile,
    skills: fallbackSkills,
    projects: fallbackProjects,
    experiences: fallbackExperiences,
    certificates: fallbackCertificates,
  })
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(!isSupabaseConfigured)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setUsingFallback(true)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const [profileRes, skillsRes, projectsRes, experiencesRes, certificatesRes] = await Promise.all([
        supabase.from('profile').select('*').limit(1).maybeSingle(),
        supabase.from('skills').select('*').order('category').order('sort_order'),
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('experiences').select('*').order('sort_order'),
        supabase.from('certificates').select('*').order('sort_order'),
      ])

      const anyError =
        profileRes.error || skillsRes.error || projectsRes.error || experiencesRes.error || certificatesRes.error

      if (anyError) throw anyError

      setData({
        profile: profileRes.data || fallbackProfile,
        skills: skillsRes.data?.length ? skillsRes.data : fallbackSkills,
        projects: projectsRes.data?.length ? projectsRes.data : fallbackProjects,
        experiences: experiencesRes.data?.length ? experiencesRes.data : fallbackExperiences,
        certificates: certificatesRes.data?.length ? certificatesRes.data : fallbackCertificates,
      })
      setUsingFallback(false)
      setError(null)
    } catch (err) {
      console.error('[usePortfolioData] Gagal fetch dari Supabase, pakai data dummy:', err.message)
      setError(err.message)
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { ...data, loading, usingFallback, error, refetch: fetchAll }
}
