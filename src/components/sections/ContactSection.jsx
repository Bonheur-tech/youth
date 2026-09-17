import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { db, site } from '../../data/db'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    db.insert('messages', { ...form, createdAt: new Date().toISOString() })
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-800 via-emerald-600 to-yellow-500 dark:from-blue-300 dark:via-emerald-300 dark:to-yellow-300 bg-clip-text text-transparent">Get in Touch</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-neutral-400">We'd love to hear from you</p>
      </div>
      <form className="space-y-4 rounded-3xl p-6 md:p-8 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl border border-slate-200/70 dark:border-neutral-800/70 shadow-2xl shadow-slate-900/10" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/80 dark:bg-neutral-950/60 border border-slate-300 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" />
          <input required type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white/80 dark:bg-neutral-950/60 border border-slate-300 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" />
        </div>
        <textarea required rows={5} placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-white/80 dark:bg-neutral-950/60 border border-slate-300 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition resize-none" />
        <button className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 via-emerald-600 to-yellow-500 hover:from-blue-800 hover:to-yellow-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/40 hover:shadow-emerald-600/50 hover:scale-[1.02] transition-all duration-300">
          {sent ? 'Message sent!' : 'Send Message'}
          <Send size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl border border-slate-200/70 dark:border-neutral-800/70 hover:border-emerald-500/50 transition text-sm text-slate-700 dark:text-neutral-300">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 via-emerald-600 to-yellow-500 flex items-center justify-center shrink-0"><Mail size={16} className="text-white" /></div>
          <span className="truncate">{site.contact.email}</span>
        </a>
        <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl border border-slate-200/70 dark:border-neutral-800/70 hover:border-emerald-500/50 transition text-sm text-slate-700 dark:text-neutral-300">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 via-emerald-600 to-yellow-500 flex items-center justify-center shrink-0"><Phone size={16} className="text-white" /></div>
          <span className="truncate">{site.contact.phone}</span>
        </a>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl border border-slate-200/70 dark:border-neutral-800/70 text-sm text-slate-700 dark:text-neutral-300">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 via-emerald-600 to-yellow-500 flex items-center justify-center shrink-0"><MapPin size={16} className="text-white" /></div>
          <span className="truncate">{site.contact.location}</span>
        </div>
      </div>
    </div>
  )
}
