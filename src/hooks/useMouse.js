import { useEffect, useRef } from 'react'

/**
 * Track posisi mouse secara global, dinormalisasi ke [-1, 1].
 * Dipakai oleh Three.js scene untuk parallax efek.
 * Menggunakan ref (bukan state) supaya tidak trigger re-render.
 */
export function useMouse() {
  const mouse = useRef({ x: 0, y: 0, rawX: 0, rawY: 0 })

  useEffect(() => {
    function onMove(e) {
      mouse.current.rawX = e.clientX
      mouse.current.rawY = e.clientY
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return mouse
}
