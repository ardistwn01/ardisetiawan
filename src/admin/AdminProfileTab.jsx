import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput, TextArea } from './FormFields'
import ComicButton from '../components/ComicButton'

export default function AdminProfileTab({ profile, onChanged, showToast }) {
  const [form, setForm] = useState(profile)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(profile)
  }, [profile])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      name: form.name,
      role: form.role,
      bio: form.bio,
      email: form.email,
      github_url: form.github_url,
      linkedin_url: form.linkedin_url,
      instagram_handle: form.instagram_handle,
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
      showToast('Profil tersimpan! 💾')
      onChanged()
    }
  }

  return (
    <div className="comic-panel p-5 bg-white max-w-2xl">
      <div className="font-display text-base text-pink mb-3 tracking-wide">EDIT PROFIL</div>
      <form onSubmit={handleSave}>
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
