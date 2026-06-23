import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Field, TextInput } from './FormFields'
import AdminListItem from './AdminListItem'
import ComicButton from '../components/ComicButton'

const emptyForm = { name: '', category: '' }
const suggestedCategories = ['Frontend', 'Backend', 'Database', 'AI/ML', 'Tools & Systems']

export default function AdminSkillsTab({ skills, onChanged, showToast }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name || !form.category) {
      showToast('Nama skill dan kategori wajib diisi', 'error')
      return
    }
    setSaving(true)
    const { error } = await supabase.from('skills').insert({
      name: form.name,
      category: form.category,
      sort_order: skills.filter((s) => s.category === form.category).length + 1,
    })
    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setForm(emptyForm)
      showToast('Skill ditambahkan! ⚡')
      onChanged()
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else {
      showToast('Skill dihapus')
      onChanged()
    }
  }

  return (
    <div>
      <div className="comic-panel p-5 mb-6 bg-white">
        <div className="font-display text-base text-green mb-3 tracking-wide">+ TAMBAH SKILL</div>
        <p className="text-xs text-ink/50 mb-3 leading-relaxed">
          Skill ditampilkan sebagai daftar keahlian per kategori — tanpa persentase, karena level keahlian itu relatif.
        </p>
        <form onSubmit={handleAdd}>
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
          <ComicButton type="submit" variant="green" disabled={saving}>
            {saving ? 'Menyimpan...' : '+ ADD SKILL'}
          </ComicButton>
        </form>
      </div>

      <div className="space-y-2">
        {skills.map((s) => (
          <AdminListItem key={s.id} title={s.name} subtitle={s.category} onDelete={() => handleDelete(s.id)} />
        ))}
        {skills.length === 0 && <p className="text-sm text-ink/40 font-mono">Belum ada skill.</p>}
      </div>
    </div>
  )
}
