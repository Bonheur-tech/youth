import { LayoutDashboard, Users, BookOpen, Image as ImageIcon, MessageSquare, User as UserIcon, ArrowLeft, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { db } from '../data/db'
import logo from '../assets/logo.png'
import OverviewTab from './dashboard/OverviewTab'
import UsersTab from './dashboard/UsersTab'
import ImagesTab from './dashboard/ImagesTab'
import ProgramsTab from './dashboard/ProgramsTab'
import MessagesTab from './dashboard/MessagesTab'
import ProfileTab from './dashboard/ProfileTab'

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'images', label: 'Images', icon: ImageIcon },
  { id: 'programs', label: 'Programs', icon: BookOpen },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: UserIcon },
]

export default function Dashboard({ user, onBack, onLogout, onUserUpdate }) {
  const [tab, setTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderTab = () => {
    switch (tab) {
      case 'users': return <UsersTab currentUser={user} />
      case 'images': return <ImagesTab currentUser={user} />
      case 'programs': return <ProgramsTab currentUser={user} />
      case 'messages': return <MessagesTab currentUser={user} />
      case 'profile': return <ProfileTab currentUser={user} onUpdate={onUserUpdate} />
      default: return <OverviewTab />
    }
  }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`${mobile ? 'w-full' : 'hidden lg:flex w-64'} flex-col bg-white dark:bg-neutral-900 border-r border-slate-200 dark:border-neutral-800`}>
      <div className="p-5 border-b border-slate-200 dark:border-neutral-800 flex items-center gap-3">
        <img src={logo} alt="YFR" className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50 bg-white shrink-0" />
        <div className="min-w-0">
          <p className="font-black text-sm truncate bg-gradient-to-r from-blue-700 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent">Youth Foundry</p>
          <p className="text-[10px] text-slate-500 dark:text-neutral-500 font-semibold">ADMIN PANEL</p>
        </div>
      </div>

      <div className="p-4 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-neutral-950 dark:to-neutral-900 border border-slate-200/70 dark:border-neutral-800/70">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-emerald-500/40 bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center shrink-0">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-black">{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold truncate">{user.name}</p>
            <p className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); if (mobile) setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition ${
              tab === t.id
                ? 'bg-gradient-to-r from-blue-700 to-emerald-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
            }`}
          >
            <t.icon size={18} />
            {t.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-neutral-800 space-y-1">
        <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition">
          <ArrowLeft size={18} /> Back to site
        </button>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white">
      <Sidebar />

      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-fade-in">
            <Sidebar mobile />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center" aria-label="Open menu">
                <Menu size={20} />
              </button>
              <h1 className="text-lg md:text-xl font-black capitalize">{tab}</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 items-center justify-center hidden" aria-label="close">
              <X size={20} />
            </button>
            <div className="hidden md:block text-xs text-slate-500 dark:text-neutral-400">
              Signed in as <span className="font-bold text-slate-700 dark:text-neutral-200">{user.email}</span>
            </div>
          </div>
        </header>

        <main key={tab} className="flex-1 p-4 md:p-8 animate-fade-in overflow-x-hidden">
          {renderTab()}
        </main>
      </div>
    </div>
  )
}
