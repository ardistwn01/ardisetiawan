import { Trash2 } from 'lucide-react'

export default function AdminListItem({ title, subtitle, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white border-2 border-ink rounded-md px-4 py-2.5 shadow-[2px_2px_0_#1A1A2E]">
      <div className="min-w-0">
        <div className="font-bold text-sm truncate">{title}</div>
        {subtitle && <div className="text-xs text-ink/50 truncate">{subtitle}</div>}
      </div>
      <button
        onClick={onDelete}
        className="flex-shrink-0 flex items-center gap-1 font-display text-xs px-2.5 py-1 bg-red text-white border-2 border-ink rounded-md shadow-[2px_2px_0_#1A1A2E] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A2E] transition-all"
      >
        <Trash2 size={12} strokeWidth={2.5} /> DEL
      </button>
    </div>
  )
}
