import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput, TextArea } from './FormFields'
import ComicButton from '../components/ComicButton'
import ConfirmModal from '../components/ConfirmModal'
import { X } from 'lucide-react'

export default function AdminProfileTab({ profile, onChanged, showToast }) {
  const [form, setForm] = useState(profile)
  const [saving, setSaving] = useState(false)
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false })
  const [homeFile, setHomeFile] = useState(null)
  const [aboutFile, setAboutFile] = useState(null)

  useEffect(() => {
    setForm(profile)
  }, [profile])

  function requestSave(e) {
    e.preventDefault()
    setConfirmConfig({
      isOpen: true,
      title: 'SIMPAN PROFIL',
      message: 'Yakin ingin menyimpan perubahan pada profil ini?',
      confirmVariant: 'pink',
      onConfirm: executeSave,
      onCancel: () => setConfirmConfig({ isOpen: false })
    })
  }

  async function executeSave() {
    setConfirmConfig({ isOpen: false })
    setSaving(true)

    let homeUrl = form.home_image_url
    let aboutUrl = form.about_image_url

    if (homeFile) {
      const fileExt = homeFile.name.split('.').pop()
      const fileName = `home-${Date.now()}.${fileExt}`
      const { error: uploadError, data } = await supabase.storage.from('profile-images').upload(fileName, homeFile)
      if (uploadError) {
        showToast(`Gagal upload foto Home: ${uploadError.message}`, 'error')
        setSaving(false)
        return
      }
      if (data) {
        const { data: publicUrlData } = supabase.storage.from('profile-images').getPublicUrl(fileName)
        homeUrl = publicUrlData.publicUrl
      }
    }

    if (aboutFile) {
      const fileExt = aboutFile.name.split('.').pop()
      const fileName = `about-${Date.now()}.${fileExt}`
      const { error: uploadError, data } = await supabase.storage.from('profile-images').upload(fileName, aboutFile)
      if (uploadError) {
        showToast(`Gagal upload foto About: ${uploadError.message}`, 'error')
        setSaving(false)
        return
      }
      if (data) {
        const { data: publicUrlData } = supabase.storage.from('profile-images').getPublicUrl(fileName)
        aboutUrl = publicUrlData.publicUrl
      }
    }

    const payload = {
      name: form.name,
      role: form.role,
      bio: form.bio,
      email: form.email,
      github_url: form.github_url,
      linkedin_url: form.linkedin_url,
      instagram_handle: form.instagram_handle,
      home_image_url: homeUrl,
      about_image_url: aboutUrl,
      updated_at: new Date().toISOString(),
    }

    let error
    if (form.id) {
      ;({ error } = await supabase.from('profile').update(payload).eq('id', form.id))
    } else {
      ;({ error } = await supabase.from('profile').insert(payload))
    }

    setSaving(false)
    if (error) showToast(error.message, 'error')
    else {
      setHomeFile(null)
      setAboutFile(null)
      showToast('Profil tersimpan! 💾')
      onChanged()
    }
  }

  return (
    <div className="comic-panel p-5 bg-white max-w-2xl">
      <ConfirmModal {...confirmConfig} />
      <div className="font-display text-base text-pink mb-3 tracking-wide">EDIT PROFIL</div>
      <form onSubmit={requestSave}>
        <div className="grid sm:grid-cols-2 gap-x-4">
          <Field label="NAMA">
            <TextInput value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="ROLE / TITLE">
            <TextInput value={form.role || ''} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </Field>
          <Field label="EMAIL">
            <TextInput
              type="email"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="INSTAGRAM">
            <TextInput
              value={form.instagram_handle || ''}
              onChange={(e) => setForm({ ...form, instagram_handle: e.target.value })}
              placeholder="@username"
            />
          </Field>
          <Field label="GITHUB URL">
            <TextInput
              value={form.github_url || ''}
              onChange={(e) => setForm({ ...form, github_url: e.target.value })}
            />
          </Field>
          <Field label="LINKEDIN URL">
            <TextInput
              value={form.linkedin_url || ''}
              onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-4 mb-4 mt-2">
          <Field label="FOTO HOME">
            {form.home_image_url && !homeFile && (
              <div className="relative w-20 h-24 mb-2 border-2 border-ink rounded overflow-hidden shadow-[2px_2px_0_#1A1A2E]">
                <img src={form.home_image_url} alt="Home" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, home_image_url: null })}
                  className="absolute top-0 right-0 bg-red text-white p-0.5 border-l-2 border-b-2 border-ink hover:bg-orange"
                  title="Hapus foto"
                >
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setHomeFile(e.target.files[0])}
              className="w-full font-mono text-sm px-3 py-2 border-2 border-ink bg-white/50 focus:bg-white rounded"
            />
          </Field>
          <Field label="FOTO ABOUT">
            {form.about_image_url && !aboutFile && (
              <div className="relative w-20 h-24 mb-2 border-2 border-ink rounded overflow-hidden shadow-[2px_2px_0_#1A1A2E]">
                <img src={form.about_image_url} alt="About" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, about_image_url: null })}
                  className="absolute top-0 right-0 bg-red text-white p-0.5 border-l-2 border-b-2 border-ink hover:bg-orange"
                  title="Hapus foto"
                >
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAboutFile(e.target.files[0])}
              className="w-full font-mono text-sm px-3 py-2 border-2 border-ink bg-white/50 focus:bg-white rounded"
            />
          </Field>
        </div>
        <Field label="BIO SINGKAT">
          <TextArea value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </Field>
        <ComicButton type="submit" variant="pink" disabled={saving}>
          {saving ? 'Menyimpan...' : '💾 SIMPAN PROFIL'}
        </ComicButton>
      </form>
    </div>
  )
}
