export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-paper text-center py-6 font-mono text-xs text-ink/60">
      crafted with ♥ by <span className="text-red font-bold">Ardi Setiawan</span> — {new Date().getFullYear()}
    </footer>
  )
}
