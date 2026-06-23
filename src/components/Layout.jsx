import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

// Three.js dilazy-load supaya initial bundle tetap kecil —
// scene 3D akan dimuat setelah halaman pertama render.
const ComicWorldBackground = lazy(() => import('./ComicWorldBackground'))

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Suspense fallback={null}>
        <ComicWorldBackground />
      </Suspense>
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
