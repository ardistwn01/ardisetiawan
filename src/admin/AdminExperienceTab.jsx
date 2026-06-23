import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput, TextArea } from './FormFields'
import AdminListItem from './AdminListItem'
import ComicButton from '../components/ComicButton'

const emptyForm = { role: '', company: '', period: '', tags: '', description: '' }

export default function AdminExperienceTab({ experiences, onChanged, showToast }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.role || !form.company) {
      showToast('Role dan perusahaan wajib diisi', 'error')
      return
    }
    setSaving(true)
    const { error } = await supabase.from('experiences').insert({
      role: form.role,
      company: form.company,
      period: form.period,
      description: form.description,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
      sort_order: experiences.length + 1,
    })
    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setForm(emptyForm)
      showToast('Experience ditambahkan! 💼')
      onChanged()
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('experiences').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else {
      showToast('Experience dihapus')
      onChanged()
    }
  }

  return (
    <div>
      <div className="comic-panel p-5 mb-6 bg-white">
        <div className="font-display text-base text-orange mb-3 tracking-wide">+ TAMBAH EXPERIENCE</div>
        <form onSubmit={handleAdd}>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="POSISI / ROLE">
              <TextInput
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Software Engineer Intern"
              />
            </Field>
            <Field label="PERUSAHAAN">
              <TextInput
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="BPTI UHAMKA"
              />
            </Field>
            <Field label="PERIODE">
              <TextInput
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                placeholder="Nov 2025 – Feb 2026"
              />
            </Field>
            <Field label="TAGS (PISAH KOMA)">
              <TextInput
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="Python, Flask, AI"
              />
            </Field>
          </div>
          <Field label="DESKRIPSI">
            <TextArea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Ceritain pengalamannya..."
            />
          </Field>
          <ComicButton type="submit" variant="yellow" disabled={saving}>
            {saving ? 'Menyimpan...' : '+ ADD EXPERIENCE'}
          </ComicButton>
        </form>
      </div>

      <div className="space-y-2">
        {experiences.map((e) => (
          <AdminListItem
            key={e.id}
            title={e.role}
            subtitle={`${e.company} · ${e.period}`}
            onDelete={() => handleDelete(e.id)}
          />
        ))}
        {experiences.length === 0 && <p className="text-sm text-ink/40 font-mono">Belum ada experience.</p>}
      </div>
    </div>
  )
}
