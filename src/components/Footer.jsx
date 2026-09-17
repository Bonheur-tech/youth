import { site } from '../data/db'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt={site.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40 bg-white" />
          <span className="font-bold bg-gradient-to-r from-blue-700 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent">{site.name}</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-neutral-500 text-center md:text-right">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
