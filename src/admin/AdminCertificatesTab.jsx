import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput } from './FormFields'
import AdminListItem from './AdminListItem'
import ComicButton from '../components/ComicButton'
import ConfirmModal from '../components/ConfirmModal'

const emptyForm = { name: '', issuer: '', year: '', url: '' }

export default function AdminCertificatesTab({ certificates, onChanged, showToast }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false })

  function handleEdit(c) {
    setForm({
      name: c.name || '',
      issuer: c.issuer || '',
      year: c.year || '',
      url: c.url || '',
    })
    setEditingId(c.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function requestAdd(e) {
    e.preventDefault()
    if (!form.name) {
      showToast('Nama sertifikat wajib diisi', 'error')
      return
    }
    const actionText = editingId ? 'mengupdate' : 'menambahkan'
    setConfirmConfig({
      isOpen: true,
      title: editingId ? 'UPDATE SERTIFIKAT' : 'TAMBAH SERTIFIKAT',
      message: `Yakin ingin ${actionText} sertifikat ini?`,
      confirmVariant: editingId ? 'yellow' : 'blue',
      onConfirm: executeAdd,
      onCancel: () => setConfirmConfig({ isOpen: false })
    })
  }

  async function executeAdd() {
    setConfirmConfig({ isOpen: false })
    setSaving(true)
    const data = {
      name: form.name,
      issuer: form.issuer || 'Unknown',
      year: form.year || String(new Date().getFullYear()),
      url: form.url,
    }

    let error
    if (editingId) {
      ;({ error } = await supabase.from('certificates').update(data).eq('id', editingId))
    } else {
      data.sort_order = certificates.length + 1
      ;({ error } = await supabase.from('certificates').insert(data))
    }

    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setForm(emptyForm)
      if (editingId) {
        setEditingId(null)
        showToast('Sertifikat diperbarui! 🏆')
      } else {
        showToast('Sertifikat ditambahkan! 🏆')
      }
      onChanged()
    }
  }

  function handleDeleteRequest(id) {
    setConfirmConfig({
      isOpen: true,
      title: 'HAPUS SERTIFIKAT',
      message: 'Yakin ingin menghapus sertifikat ini? Aksi ini tidak dapat dibatalkan.',
      confirmVariant: 'red',
      onConfirm: () => executeDelete(id),
      onCancel: () => setConfirmConfig({ isOpen: false })
    })
  }

  async function executeDelete(id) {
    setConfirmConfig({ isOpen: false })
    const { error } = await supabase.from('certificates').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else {
      showToast('Sertifikat dihapus')
      onChanged()
    }
  }

  return (
    <div>
      <ConfirmModal {...confirmConfig} />
      <div className="comic-panel p-5 mb-6 bg-white">
        <div className="font-display text-base text-blue mb-3 tracking-wide">
          {editingId ? 'EDIT SERTIFIKAT' : '+ TAMBAH SERTIFIKAT'}
        </div>
        <form onSubmit={requestAdd}>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="NAMA SERTIFIKAT">
              <TextInput
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="React for Beginners"
              />
            </Field>
            <Field label="PENERBIT">
              <TextInput
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                placeholder="Dicoding, Coursera..."
              />
            </Field>
            <Field label="TAHUN">
              <TextInput
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2024"
              />
            </Field>
            <Field label="URL (OPSIONAL)">
              <TextInput
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://..."
              />
            </Field>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {editingId && (
              <ComicButton type="button" variant="red" onClick={() => { setEditingId(null); setForm(emptyForm) }}>
                BATAL
              </ComicButton>
            )}
            <ComicButton type="submit" variant="blue" disabled={saving}>
              {saving ? 'Menyimpan...' : (editingId ? 'UPDATE CERT' : '+ ADD CERT')}
            </ComicButton>
          </div>
        </form>
      </div>

      <div className="space-y-2">
        {certificates.map((c) => (
          <AdminListItem
            key={c.id}
            title={c.name}
            subtitle={`${c.issuer} · ${c.year}`}
            onEdit={() => handleEdit(c)}
            onDelete={() => handleDeleteRequest(c.id)}
          />
        ))}
        {certificates.length === 0 && <p className="text-sm text-ink/40 font-mono">Belum ada sertifikat.</p>}
      </div>
    </div>
  )
}
