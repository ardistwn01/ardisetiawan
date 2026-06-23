import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput, TextArea } from './FormFields'
import AdminListItem from './AdminListItem'
import ComicButton from '../components/ComicButton'
import ConfirmModal from '../components/ConfirmModal'

const emptyForm = { role: '', company: '', period: '', tags: '', description: '' }

export default function AdminExperienceTab({ experiences, onChanged, showToast }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false })

  function handleEdit(e) {
    setForm({
      role: e.role || '',
      company: e.company || '',
      period: e.period || '',
      tags: (e.tags || []).join(', '),
      description: e.description || '',
    })
    setEditingId(e.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function requestAdd(e) {
    e.preventDefault()
    if (!form.role || !form.company) {
      showToast('Role dan perusahaan wajib diisi', 'error')
      return
    }
    const actionText = editingId ? 'mengupdate' : 'menambahkan'
    setConfirmConfig({
      isOpen: true,
      title: editingId ? 'UPDATE EXPERIENCE' : 'TAMBAH EXPERIENCE',
      message: `Yakin ingin ${actionText} experience ini?`,
      confirmVariant: editingId ? 'yellow' : 'green',
      onConfirm: executeAdd,
      onCancel: () => setConfirmConfig({ isOpen: false })
    })
  }

  async function executeAdd() {
    setConfirmConfig({ isOpen: false })
    setSaving(true)
    const data = {
      role: form.role,
      company: form.company,
      period: form.period,
      description: form.description,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
    }

    let error
    if (editingId) {
      ;({ error } = await supabase.from('experiences').update(data).eq('id', editingId))
    } else {
      data.sort_order = experiences.length + 1
      ;({ error } = await supabase.from('experiences').insert(data))
    }

    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setForm(emptyForm)
      if (editingId) {
        setEditingId(null)
        showToast('Experience diperbarui! 💼')
      } else {
        showToast('Experience ditambahkan! 💼')
      }
      onChanged()
    }
  }

  function handleDeleteRequest(id) {
    setConfirmConfig({
      isOpen: true,
      title: 'HAPUS EXPERIENCE',
      message: 'Yakin ingin menghapus experience ini? Aksi ini tidak dapat dibatalkan.',
      confirmVariant: 'red',
      onConfirm: () => executeDelete(id),
      onCancel: () => setConfirmConfig({ isOpen: false })
    })
  }

  async function executeDelete(id) {
    setConfirmConfig({ isOpen: false })
    const { error } = await supabase.from('experiences').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else {
      showToast('Experience dihapus')
      onChanged()
    }
  }

  return (
    <div>
      <ConfirmModal {...confirmConfig} />
      <div className="comic-panel p-5 mb-6 bg-white">
        <div className="font-display text-base text-orange mb-3 tracking-wide">
          {editingId ? 'EDIT EXPERIENCE' : '+ TAMBAH EXPERIENCE'}
        </div>
        <form onSubmit={requestAdd}>
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
          <div className="flex items-center gap-2">
            {editingId && (
              <ComicButton type="button" variant="red" onClick={() => { setEditingId(null); setForm(emptyForm) }}>
                BATAL
              </ComicButton>
            )}
            <ComicButton type="submit" variant="yellow" disabled={saving}>
              {saving ? 'Menyimpan...' : (editingId ? 'UPDATE EXPERIENCE' : '+ ADD EXPERIENCE')}
            </ComicButton>
          </div>
        </form>
      </div>

      <div className="space-y-2">
        {experiences.map((e) => (
          <AdminListItem
            key={e.id}
            title={e.role}
            subtitle={`${e.company} · ${e.period}`}
            onEdit={() => handleEdit(e)}
            onDelete={() => handleDeleteRequest(e.id)}
          />
        ))}
        {experiences.length === 0 && <p className="text-sm text-ink/40 font-mono">Belum ada experience.</p>}
      </div>
    </div>
  )
}
