import { Plus, Trash2, BookOpen, Upload } from 'lucide-react'
import { useState } from 'react'
import { db } from '../../data/db'
import { fileToBase64 } from '../../utils/image'

export default function ProgramsTab({ currentUser }) {
  const [refresh, setRefresh] = useState(0)
  const [form, setForm] = useState({ title: '', short: '', long: '', highlights: '', file: null, preview: null })
  const isAdmin = db.isAdmin(currentUser)
  const programs = db.find('programs')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const preview = await fileToBase64(file)
    setForm((f) => ({ ...f, file, preview }))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const image = form.file ? await fileToBase64(form.file) : 'home1.jpg'
    db.insert('programs', {
      title: form.title,
      short: form.short,
      long: form.long,
      image,
      highlights: form.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
    })
    setForm({ title: '', short: '', long: '', highlights: '', file: null, preview: null })
    setRefresh((r) => r + 1)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this program?')) {
      db.remove('programs', id)
      setRefresh((r) => r + 1)
    }
  }

  const resolveSrc = (img) => {
    if (!img) return ''
    if (img.startsWith('data:') || img.startsWith('http')) return img
    return new URL(`../../assets/${img}`, import.meta.url).href
  }

  return (
    <div key={refresh} className="space-y-6">
      {isAdmin && (
        <div className="rounded-3xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center">
              <Plus size={18} className="text-white" />
            </div>
            <h2 className="font-black text-lg">Add New Program</h2>
          </div>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <input required placeholder="Program title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
              <input required placeholder="Short description" value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })} className="bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
            </div>
            <textarea required rows={3} placeholder="Full description" value={form.long} onChange={(e) => setForm({ ...form, long: e.target.value })} className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500 resize-none" />
            <textarea rows={3} placeholder="Highlights (one per line)" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500 resize-none" />
            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-4 cursor-pointer hover:border-emerald-500 transition">
              <Upload size={16} className="text-slate-500" />
              <span className="text-sm text-slate-500 dark:text-neutral-400">{form.file ? form.file.name : 'Choose cover image (optional)'}</span>
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>
            {form.preview && <img src={form.preview} alt="preview" className="rounded-xl max-h-40 object-cover" />}
            <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-blue-800 hover:to-emerald-700 text-white font-bold rounded-xl py-3 text-sm transition">
              Add Program
            </button>
          </form>
        </div>
      )}

      <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg p-6">
        <h2 className="font-black text-lg mb-5">All Programs ({programs.length})</h2>
        {programs.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-neutral-500">No programs yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {programs.map((p) => (
              <div key={p._id} className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950">
                {p.image && (
                  <div className="aspect-video overflow-hidden">
                    <img src={resolveSrc(p.image)} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center shrink-0">
                      <BookOpen size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm leading-snug">{p.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 line-clamp-2">{p.short}</p>
                    </div>
                    {isAdmin && (
                      <button onClick={() => handleDelete(p._id)} className="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0" aria-label="Delete">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
