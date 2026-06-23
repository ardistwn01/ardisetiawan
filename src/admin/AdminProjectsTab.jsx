import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput, TextArea } from './FormFields'
import AdminListItem from './AdminListItem'
import ComicButton from '../components/ComicButton'

const emptyForm = { title: '', url: '', repo_url: '', stack: '', icon: '🚀', description: '', featured: false }

export default function AdminProjectsTab({ projects, onChanged, showToast }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.title || !form.url) {
      showToast('Judul dan URL wajib diisi', 'error')
      return
    }
    setSaving(true)
    const { error } = await supabase.from('projects').insert({
      title: form.title,
      url: form.url,
      repo_url: form.repo_url,
      icon: form.icon || '🚀',
      description: form.description || 'Project baru',
      stack: form.stack ? form.stack.split(',').map((s) => s.trim()) : [],
      featured: form.featured,
      sort_order: projects.length + 1,
    })
    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setForm(emptyForm)
      showToast('Project ditambahkan! 🚀')
      onChanged()
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else {
      showToast('Project dihapus')
      onChanged()
    }
  }

  return (
    <div>
      <div className="comic-panel p-5 mb-6 bg-white">
        <div className="font-display text-base text-red mb-3 tracking-wide">+ TAMBAH PROJECT</div>
        <form onSubmit={handleAdd}>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="NAMA PROJECT">
              <TextInput
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. ZuppaZuppa Restaurant"
              />
            </Field>
            <Field label="URL (VERCEL/GITHUB)">
              <TextInput
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://my-project.vercel.app"
              />
            </Field>
            <Field label="REPO URL (OPSIONAL)">
              <TextInput
                value={form.repo_url}
                onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
                placeholder="https://github.com/..."
              />
            </Field>
            <Field label="STACK (PISAH KOMA)">
              <TextInput
                value={form.stack}
                onChange={(e) => setForm({ ...form, stack: e.target.value })}
                placeholder="React, Node.js, MySQL"
              />
            </Field>
            <Field label="EMOJI ICON">
              <TextInput
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="🚀"
                maxLength={4}
              />
            </Field>
          </div>
          <Field label="DESKRIPSI">
            <TextArea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Ceritain projectnya..."
            />
          </Field>
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 font-display text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>
            <ComicButton type="submit" variant="green" disabled={saving}>
              {saving ? 'Menyimpan...' : '+ ADD PROJECT'}
            </ComicButton>
          </div>
        </form>
      </div>

      <div className="font-display text-sm tracking-wide text-ink/50 mb-2">EXISTING PROJECTS</div>
      <div className="space-y-2">
        {projects.map((p) => (
          <AdminListItem
            key={p.id}
            title={`${p.icon || '🚀'} ${p.title}${p.featured ? ' ★' : ''}`}
            subtitle={`${(p.stack || []).join(', ')} · ${p.url}`}
            onDelete={() => handleDelete(p.id)}
          />
        ))}
        {projects.length === 0 && <p className="text-sm text-ink/40 font-mono">Belum ada project.</p>}
      </div>
    </div>
  )
}
