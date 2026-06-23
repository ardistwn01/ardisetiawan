export function Field({ label, children }) {
  return (
    <div className="mb-3">
      <label className="font-display text-xs tracking-wider block mb-1">{label}</label>
      {children}
    </div>
  )
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border-[3px] border-ink rounded-md font-body text-sm outline-none focus:border-blue bg-white ${props.className || ''}`}
    />
  )
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 border-[3px] border-ink rounded-md font-body text-sm outline-none focus:border-blue resize-y min-h-[80px] bg-white ${props.className || ''}`}
    />
  )
}
