import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput, TextArea } from './FormFields'
import AdminListItem from './AdminListItem'
import ComicButton from '../components/ComicButton'
import { X } from 'lucide-react'

const emptyForm = { title: '', url: '', repo_url: '', stack: '', icon: '🚀', description: '', featured: false, images: [] }

export default function AdminProjectsTab({ projects, onChanged, showToast }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [editingId, setEditingId] = useState(null)

  function handleEdit(p) {
    setForm({
      title: p.title || '',
      url: p.url || '',
      repo_url: p.repo_url || '',
      icon: p.icon || '🚀',
      description: p.description || '',
      stack: (p.stack || []).join(', '),
      featured: p.featured || false,
      images: p.images || []
    })
    setEditingId(p.id)
    setSelectedFiles([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.title || !form.url) {
      showToast('Judul dan URL wajib diisi', 'error')
      return
    }

    const actionText = editingId ? 'mengupdate' : 'menambahkan'
    if (!window.confirm(`Yakin ingin ${actionText} project ini?`)) {
      return
    }

    setSaving(true)
    let uploadedUrls = []

    // Upload files if any
    if (selectedFiles.length > 0) {
      for (const file of selectedFiles) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError, data } = await supabase.storage
          .from('project-images')
          .upload(filePath, file)

        if (uploadError) {
          showToast(`Gagal upload foto: ${uploadError.message}`, 'error')
          setSaving(false)
          return
        }

        if (data) {
          const { data: publicUrlData } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath)
          
          uploadedUrls.push(publicUrlData.publicUrl)
        }
      }
    }

    const projectData = {
      title: form.title,
      url: form.url,
      repo_url: form.repo_url,
      icon: form.icon || '🚀',
      description: form.description || 'Project baru',
      stack: form.stack ? form.stack.split(',').map((s) => s.trim()) : [],
      featured: form.featured,
      images: [...(form.images || []), ...uploadedUrls],
    }

    let error;
    if (editingId) {
      const res = await supabase.from('projects').update(projectData).eq('id', editingId)
      error = res.error
    } else {
      projectData.sort_order = projects.length + 1
      const res = await supabase.from('projects').insert(projectData)
      error = res.error
    }
    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setForm(emptyForm)
      setSelectedFiles([])
      if (editingId) {
        setEditingId(null)
        showToast('Project berhasil diperbarui! 🚀')
      } else {
        showToast('Project ditambahkan! 🚀')
      }
      onChanged()
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus project ini? Aksi ini tidak dapat dibatalkan.')) {
      return
    }

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
        <div className="font-display text-base text-red mb-3 tracking-wide">
          {editingId ? 'EDIT PROJECT' : '+ TAMBAH PROJECT'}
        </div>
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
          <Field label="FOTO PROJECT">
            {form.images && form.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.images.map((url, idx) => (
                  <div key={idx} className="relative w-16 h-16 border-2 border-ink rounded overflow-hidden shadow-[2px_2px_0_#1A1A2E]">
                    <img src={url} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })}
                      className="absolute top-0 right-0 bg-red text-white p-0.5 border-l-2 border-b-2 border-ink hover:bg-orange transition-colors"
                      title="Hapus foto"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
              className="w-full font-mono text-sm px-3 py-2 border-2 border-ink bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow focus:border-yellow transition-all rounded"
            />
            {selectedFiles.length > 0 && (
              <p className="mt-2 text-xs font-mono text-ink/70 font-bold">
                + {selectedFiles.length} file baru dipilih (akan ditambahkan)
              </p>
            )}
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
            <div className="flex items-center gap-2">
              {editingId && (
                <ComicButton type="button" variant="red" onClick={() => { setEditingId(null); setForm(emptyForm); setSelectedFiles([]) }}>
                  BATAL
                </ComicButton>
              )}
              <ComicButton type="submit" variant="green" disabled={saving}>
                {saving ? 'Menyimpan...' : (editingId ? 'UPDATE PROJECT' : '+ ADD PROJECT')}
              </ComicButton>
            </div>
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
            onEdit={() => handleEdit(p)}
            onDelete={() => handleDelete(p.id)}
          />
        ))}
        {projects.length === 0 && <p className="text-sm text-ink/40 font-mono">Belum ada project.</p>}
      </div>
    </div>
  )
}
