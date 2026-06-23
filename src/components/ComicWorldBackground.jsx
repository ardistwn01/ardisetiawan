import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMouse } from '../hooks/useMouse'

// ─── KONSTANTA WARNA KOMIK ────────────────────────────────────────────────────
const YELLOW = new THREE.Color('#FFD60A')
const RED    = new THREE.Color('#FF3B30')
const BLUE   = new THREE.Color('#0A84FF')
const INK    = new THREE.Color('#1A1A2E')
const PAPER  = new THREE.Color('#FFFBE6')
const PANEL_COLORS = [YELLOW, RED, BLUE, new THREE.Color('#30D158'), new THREE.Color('#FF9F0A')]

// ─── HALFTONE DOT GRID ────────────────────────────────────────────────────────
// Grid titik-titik bulat seperti printing dot halftone pada komik cetak.
function HalftoneDots() {
  const meshRef = useRef()
  const count = 400

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)
    const colors    = new Float32Array(count * 3)
    const c = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 12 - 4

      sizes[i] = Math.random() * 3 + 1

      // Warna dot: mostly ink, sebagian kecil warna pop
      if (Math.random() > 0.75) {
        c.copy(PANEL_COLORS[Math.floor(Math.random() * PANEL_COLORS.length)])
      } else {
        c.copy(INK)
      }
      c.toArray(colors, i3)
    }
    return { positions, sizes, colors }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.z = t * 0.008
  })

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    g.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
    return g
  }, [positions, colors, sizes])

  const mat = useMemo(() => new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    sizeAttenuation: true,
  }), [])

  return <points ref={meshRef} geometry={geo} material={mat} />
}

// ─── PANEL KOMIK MENGAMBANG ───────────────────────────────────────────────────
// Persegi panjang tipis dengan border hitam tebal menyerupai panel komik strip.
function ComicPanel({ position, rotation, color, scale = 1 }) {
  const groupRef = useRef()
  const floatOffset = useRef(Math.random() * Math.PI * 2) // fase berbeda tiap panel

  // Border dengan EdgesGeometry
  const geo = useMemo(() => new THREE.PlaneGeometry(1.6 * scale, 1.0 * scale), [scale])
  const borderGeo = useMemo(() => new THREE.EdgesGeometry(geo), [geo])

  const fillMat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
  }), [color])

  const borderMat = useMemo(() => new THREE.LineBasicMaterial({
    color: INK,
    linewidth: 2,
  }), [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const phase = floatOffset.current
    groupRef.current.position.y = position[1] + Math.sin(t * 0.4 + phase) * 0.3
    groupRef.current.rotation.z = rotation[2] + Math.sin(t * 0.25 + phase) * 0.04
    groupRef.current.rotation.x = rotation[0] + Math.cos(t * 0.2 + phase) * 0.02
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh geometry={geo} material={fillMat} />
      <lineSegments geometry={borderGeo} material={borderMat} />
    </group>
  )
}

// ─── SPEED LINES ──────────────────────────────────────────────────────────────
// Garis-garis radial memancar dari tengah, ciri khas panel aksi komik.
function SpeedLines() {
  const groupRef = useRef()
  const lineCount = 24

  const lines = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => {
      const angle = (i / lineCount) * Math.PI * 2
      const innerR = 2.5 + Math.random() * 0.5
      const outerR = 8 + Math.random() * 4
      const x1 = Math.cos(angle) * innerR
      const y1 = Math.sin(angle) * innerR
      const x2 = Math.cos(angle) * outerR
      const y2 = Math.sin(angle) * outerR

      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y1, 0),
        new THREE.Vector3(x2, y2, 0),
      ])
      return geo
    })
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = clock.getElapsedTime() * 0.04
  })

  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: INK,
    transparent: true,
    opacity: 0.06,
  }), [])

  return (
    <group ref={groupRef} position={[0, 0, -6]}>
      {lines.map((geo, i) => (
        <lineSegments key={i} geometry={geo} material={mat} />
      ))}
    </group>
  )
}

// ─── ACTION WORDS 3D ──────────────────────────────────────────────────────────
// Lingkaran dengan "aura" warna yang berpulsa di sekitar area hero.
function ActionBurst({ position, color, delay = 0 }) {
  const meshRef = useRef()

  const geo = useMemo(() => {
    // Starburst: polygon 8 titik bergantian radius besar/kecil
    const pts = []
    const segments = 16
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const r = i % 2 === 0 ? 0.5 : 0.25
      pts.push(new THREE.Vector2(Math.cos(angle) * r, Math.sin(angle) * r))
    }
    return new THREE.ShapeGeometry(new THREE.Shape(pts))
  }, [])

  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
  }), [color])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime() + delay
    meshRef.current.rotation.z = t * 0.5
    const pulse = 1 + Math.sin(t * 1.2) * 0.15
    meshRef.current.scale.setScalar(pulse)
  })

  return <mesh ref={meshRef} geometry={geo} material={mat} position={position} />
}

// ─── KAMERA MOUSE PARALLAX ────────────────────────────────────────────────────
function CameraRig({ mouse }) {
  const { camera } = useThree()
  const targetX = useRef(0)
  const targetY = useRef(0)

  useFrame(() => {
    targetX.current += (mouse.current.x * 1.2 - targetX.current) * 0.04
    targetY.current += (mouse.current.y * 0.7 - targetY.current) * 0.04
    camera.position.x = targetX.current
    camera.position.y = targetY.current
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── SCENE UTAMA ─────────────────────────────────────────────────────────────
function Scene({ mouse }) {
  const panels = useMemo(() => [
    { position: [-7, 2.5, -3],   rotation: [0.1, 0.2, -0.3],  color: YELLOW, scale: 1.4 },
    { position: [7.5, 3, -2],    rotation: [-0.1, -0.15, 0.25], color: RED,   scale: 1.1 },
    { position: [-6, -3.5, -4],  rotation: [0.2, 0.1, 0.15],  color: BLUE,   scale: 1.2 },
    { position: [6.5, -3, -3],   rotation: [-0.15, 0.2, -0.2], color: YELLOW, scale: 0.9 },
    { position: [0, 5.5, -5],    rotation: [0.05, 0, 0.1],    color: RED,    scale: 1.6 },
    { position: [-9, 0.5, -6],   rotation: [0.1, 0.3, 0.2],   color: BLUE,   scale: 1.0 },
    { position: [9, 0, -5],      rotation: [-0.05, -0.2, -0.1], color: new THREE.Color('#30D158'), scale: 1.1 },
    { position: [3, -5.5, -4],   rotation: [0.15, 0.1, -0.3], color: new THREE.Color('#FF9F0A'), scale: 0.85 },
    { position: [-3, 5, -6],     rotation: [-0.1, 0.15, 0.2], color: YELLOW, scale: 0.8 },
  ], [])

  const bursts = useMemo(() => [
    { position: [-5, 4, -2],   color: YELLOW, delay: 0 },
    { position: [5, -4, -2],   color: RED,    delay: 1.2 },
    { position: [5.5, 4, -3],  color: BLUE,   delay: 2.4 },
    { position: [-5, -4, -3],  color: new THREE.Color('#30D158'), delay: 0.8 },
  ], [])

  return (
    <>
      <CameraRig mouse={mouse} />
      <SpeedLines />
      <HalftoneDots />

      {panels.map((p, i) => (
        <ComicPanel key={i} {...p} />
      ))}

      {bursts.map((b, i) => (
        <ActionBurst key={i} {...b} />
      ))}
    </>
  )
}

// ─── EXPORT UTAMA ─────────────────────────────────────────────────────────────
export default function ComicWorldBackground() {
  const mouse = useMouse()

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
