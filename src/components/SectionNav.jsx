import { navItems } from '../data/db'

export default function SectionNav({ active, onChange }) {
  const handleClick = (id) => {
    onChange(id)
    const el = document.getElementById('section-top')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }
  return (
    <div id="section-top" className="sticky top-16 md:top-20 z-40 w-full pt-4 pb-4 bg-gradient-to-b from-white/95 via-white/80 to-transparent dark:from-neutral-950/95 dark:via-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-fit flex gap-1 p-1.5 rounded-full border border-slate-200/70 dark:border-neutral-800/70 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-2xl shadow-xl shadow-slate-900/10 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <button key={item.id} onClick={() => handleClick(item.id)} className={`relative whitespace-nowrap px-4 md:px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${isActive ? 'text-slate-900 bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-500 shadow-lg shadow-yellow-500/40' : 'text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800'}`}>
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
