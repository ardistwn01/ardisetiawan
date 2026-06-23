/** Avatar ilustrasi tangan sederhana bergaya komik (bukan foto asli). */
export default function ComicAvatar({ className = '' }) {
  return (
    <svg viewBox="0 0 180 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="220" fill="#FFD60A" />
      <ellipse cx="90" cy="85" rx="52" ry="56" fill="#FFDBB5" stroke="#1A1A2E" strokeWidth="3" />
      <ellipse cx="72" cy="80" rx="8" ry="9" fill="#fff" stroke="#1A1A2E" strokeWidth="2" />
      <ellipse cx="108" cy="80" rx="8" ry="9" fill="#fff" stroke="#1A1A2E" strokeWidth="2" />
      <circle cx="72" cy="81" r="4.5" fill="#1A1A2E" />
      <circle cx="108" cy="81" r="4.5" fill="#1A1A2E" />
      <circle cx="73.5" cy="79.5" r="1.5" fill="#fff" />
      <circle cx="109.5" cy="79.5" r="1.5" fill="#fff" />
      <path d="M78 104 Q90 114 102 104" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="16" y="135" width="148" height="90" rx="10" fill="#FF3B30" stroke="#1A1A2E" strokeWidth="3" />
      <rect x="70" y="135" width="40" height="25" rx="4" fill="#FFDBB5" stroke="#1A1A2E" strokeWidth="2" />
      <path d="M38 160 Q90 175 142 160" stroke="#1A1A2E" strokeWidth="2" strokeDasharray="4 3" fill="none" />
      <path d="M38 48 Q90 20 142 48" stroke="#1A1A2E" strokeWidth="3" fill="none" />
      <rect x="30" y="38" width="120" height="52" rx="26" fill="#1A1A2E" />
      <rect x="33" y="41" width="114" height="46" rx="23" fill="#333" />
    </svg>
  )
}
