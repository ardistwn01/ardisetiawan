import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput } from './FormFields'
import AdminListItem from './AdminListItem'
import ComicButton from '../components/ComicButton'
import ConfirmModal from '../components/ConfirmModal'

const emptyForm = { name: '', category: '' }
const suggestedCategories = ['Frontend', 'Backend', 'Database', 'AI/ML', 'Tools & Systems']

export default function AdminSkillsTab({ skills, onChanged, showToast }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false })

  function handleEdit(s) {
    setForm({
      name: s.name || '',
      category: s.category || '',
    })
    setEditingId(s.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function requestAdd(e) {
    e.preventDefault()
    if (!form.name || !form.category) {
      showToast('Nama skill dan kategori wajib diisi', 'error')
      return
    }
    const actionText = editingId ? 'mengupdate' : 'menambahkan'
    setConfirmConfig({
      isOpen: true,
      title: editingId ? 'UPDATE SKILL' : 'TAMBAH SKILL',
      message: `Yakin ingin ${actionText} skill ini?`,
      confirmVariant: editingId ? 'yellow' : 'green',
      onConfirm: executeAdd,
      onCancel: () => setConfirmConfig({ isOpen: false })
    })
  }

  async function executeAdd() {
    setConfirmConfig({ isOpen: false })
    setSaving(true)
    const data = {
      name: form.name,
      category: form.category,
    }

    let error
    if (editingId) {
      ;({ error } = await supabase.from('skills').update(data).eq('id', editingId))
    } else {
      data.sort_order = skills.filter((s) => s.category === form.category).length + 1
      ;({ error } = await supabase.from('skills').insert(data))
    }

    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setForm(emptyForm)
      if (editingId) {
        setEditingId(null)
        showToast('Skill diperbarui! ⚡')
      } else {
        showToast('Skill ditambahkan! ⚡')
      }
      onChanged()
    }
  }

  function handleDeleteRequest(id) {
    setConfirmConfig({
      isOpen: true,
      title: 'HAPUS SKILL',
      message: 'Yakin ingin menghapus skill ini? Aksi ini tidak dapat dibatalkan.',
      confirmVariant: 'red',
      onConfirm: () => executeDelete(id),
      onCancel: () => setConfirmConfig({ isOpen: false })
    })
  }

  async function executeDelete(id) {
    setConfirmConfig({ isOpen: false })
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else {
      showToast('Skill dihapus')
      onChanged()
    }
  }

  return (
    <div>
      <ConfirmModal {...confirmConfig} />
      <div className="comic-panel p-5 mb-6 bg-white">
        <div className="font-display text-base text-green mb-3 tracking-wide">
          {editingId ? 'EDIT SKILL' : '+ TAMBAH SKILL'}
        </div>
        <p className="text-xs text-ink/50 mb-3 leading-relaxed">
          Skill ditampilkan sebagai daftar keahlian per kategori — tanpa persentase, karena level keahlian itu relatif.
        </p>
        <form onSubmit={requestAdd}>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="NAMA SKILL">
              <TextInput
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="React.js"
              />
            </Field>
            <Field label="KATEGORI">
              <TextInput
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Frontend"
                list="category-suggestions"
              />
              <datalist id="category-suggestions">
                {suggestedCategories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {editingId && (
              <ComicButton type="button" variant="red" onClick={() => { setEditingId(null); setForm(emptyForm) }}>
                BATAL
              </ComicButton>
            )}
            <ComicButton type="submit" variant="green" disabled={saving}>
              {saving ? 'Menyimpan...' : (editingId ? 'UPDATE SKILL' : '+ ADD SKILL')}
            </ComicButton>
          </div>
        </form>
      </div>

      <div className="space-y-2">
        {skills.map((s) => (
          <AdminListItem
            key={s.id}
            title={s.name}
            subtitle={s.category}
            onEdit={() => handleEdit(s)}
            onDelete={() => handleDeleteRequest(s.id)}
          />
        ))}
        {skills.length === 0 && <p className="text-sm text-ink/40 font-mono">Belum ada skill.</p>}
      </div>
    </div>
  )
}
