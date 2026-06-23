import { useEffect, useRef } from 'react'

const COLORS = ['#FFD60A', '#FF3B30', '#0A84FF', '#30D158', '#FF9F0A', '#FF2D78']

/**
 * Canvas overlay yang menggambar "paint splat" kecil mengikuti cursor.
 * Menggunakan requestAnimationFrame + array partikel mandiri agar ringan.
 * Tidak memakai React state sama sekali — murni DOM manipulation.
 */
export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let animId

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function onMove(e) {
      // Tambahkan 2-3 partikel tiap gerakan mouse
      const count = Math.floor(Math.random() * 2) + 1
      for (let i = 0; i < count; i++) {
        particles.push({
          x:     e.clientX + (Math.random() - 0.5) * 12,
          y:     e.clientY + (Math.random() - 0.5) * 12,
          r:     Math.random() * 5 + 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 1,
          vx:   (Math.random() - 0.5) * 1.5,
          vy:   (Math.random() - 0.5) * 1.5 - 0.5,
          decay: Math.random() * 0.025 + 0.02,
        })
      }
      // Batasi jumlah partikel aktif supaya tidak berat
      if (particles.length > 80) particles = particles.slice(-80)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles = particles.filter(p => p.alpha > 0.01)
      for (const p of particles) {
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle   = p.color
        // Border hitam kecil biar berasa komik
        ctx.strokeStyle = '#1A1A2E'
        ctx.lineWidth   = 1.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.restore()

        p.x     += p.vx
        p.y     += p.vy
        p.vy    += 0.06      // gravitasi ringan
        p.r     *= 0.96      // mengecil
        p.alpha -= p.decay
      }

      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  )
}
