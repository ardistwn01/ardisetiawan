// Lapisan dekoratif: dot-pattern halftone + beberapa "speed line" sapuan
// tangan untuk memperkuat kesan komik tanpa mengganggu konten.
export default function HalftoneBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg className="absolute -top-20 -right-20 w-[420px] h-[420px] opacity-[0.07]" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeDasharray="2 8" />
      </svg>
      <svg className="absolute bottom-0 -left-24 w-[360px] h-[360px] opacity-[0.06]" viewBox="0 0 200 200">
        <rect x="20" y="20" width="160" height="160" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeDasharray="1 10" rx="30" />
      </svg>
    </div>
  )
}
