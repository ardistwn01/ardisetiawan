import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput } from './FormFields'
import AdminListItem from './AdminListItem'
import ComicButton from '../components/ComicButton'

const emptyForm = { name: '', issuer: '', year: '', url: '' }

export default function AdminCertificatesTab({ certificates, onChanged, showToast }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name) {
      showToast('Nama sertifikat wajib diisi', 'error')
      return
    }
    setSaving(true)
    const { error } = await supabase.from('certificates').insert({
      name: form.name,
      issuer: form.issuer || 'Unknown',
      year: form.year || String(new Date().getFullYear()),
      url: form.url,
      sort_order: certificates.length + 1,
    })
    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setForm(emptyForm)
      showToast('Sertifikat ditambahkan! 🏆')
      onChanged()
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('certificates').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else {
      showToast('Sertifikat dihapus')
      onChanged()
    }
  }

  return (
    <div>
      <div className="comic-panel p-5 mb-6 bg-white">
        <div className="font-display text-base text-blue mb-3 tracking-wide">+ TAMBAH SERTIFIKAT</div>
        <form onSubmit={handleAdd}>
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
          <ComicButton type="submit" variant="blue" disabled={saving}>
            {saving ? 'Menyimpan...' : '+ ADD CERT'}
          </ComicButton>
        </form>
      </div>

      <div className="space-y-2">
        {certificates.map((c) => (
          <AdminListItem
            key={c.id}
            title={c.name}
            subtitle={`${c.issuer} · ${c.year}`}
            onDelete={() => handleDelete(c.id)}
          />
        ))}
        {certificates.length === 0 && <p className="text-sm text-ink/40 font-mono">Belum ada sertifikat.</p>}
      </div>
    </div>
  )
}
