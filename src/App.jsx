import { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import SectionNav from './components/SectionNav'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import HomeSection from './components/sections/HomeSection'
import GallerySection from './components/sections/GallerySection'
import ProgramsSection from './components/sections/ProgramsSection'
import ContactSection from './components/sections/ContactSection'

const SESSION_KEY = 'yfr_session'

export default function App() {
  const [section, setSection] = useState('home')
  const [user, setUser] = useState(null)
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  const handleLogin = (u) => {
    setUser(u)
    localStorage.setItem(SESSION_KEY, JSON.stringify(u))
    setShowDashboard(true)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
    setShowDashboard(false)
  }

  const handleUserUpdate = (u) => {
    setUser(u)
    localStorage.setItem(SESSION_KEY, JSON.stringify(u))
  }

  if (showDashboard && user) {
    return (
      <Dashboard
        user={user}
        onBack={() => setShowDashboard(false)}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />
    )
  }

  const renderSection = () => {
    switch (section) {
      case 'gallery': return <GallerySection />
      case 'programs': return <ProgramsSection />
      case 'contact': return <ContactSection />
      default: return <HomeSection />
    }
  }

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-white bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <TopBar user={user} onLogin={handleLogin} onLogout={handleLogout} onDashboard={() => setShowDashboard(true)} />
      <Hero />
      <SectionNav active={section} onChange={setSection} />
      <main key={section} className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16 animate-fade-in">
        {renderSection()}
      </main>
      <Footer />
    </div>
  )
}
