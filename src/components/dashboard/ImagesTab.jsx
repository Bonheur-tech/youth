import { ImagePlus, Trash2, Upload, Home as HomeIcon, Images } from 'lucide-react'
import { useState } from 'react'
import { db } from '../../data/db'
import { fileToBase64 } from '../../utils/image'

export default function ImagesTab({ currentUser }) {
  const [refresh, setRefresh] = useState(0)
  const [section, setSection] = useState('home')
  const [form, setForm] = useState({ title: '', desc: '', file: null, preview: null })
  const isAdmin = db.isAdmin(currentUser)

  const homeImages = db.find('home')
  const galleryImages = db.find('gallery')
  const items = section === 'home' ? homeImages : galleryImages

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const preview = await fileToBase64(file)
    setForm((f) => ({ ...f, file, preview }))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!form.file) return alert('Pick an image first')
    const dataUrl = await fileToBase64(form.file)
    db.insert(section, { image: dataUrl, title: form.title || 'Untitled', desc: form.desc || '' })
    setForm({ title: '', desc: '', file: null, preview: null })
    setRefresh((r) => r + 1)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this image?')) {
      db.remove(section, id)
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
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 max-w-fit">
        <button onClick={() => setSection('home')} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition ${section === 'home' ? 'bg-gradient-to-r from-blue-700 to-emerald-600 text-white shadow' : 'text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800'}`}>
          <HomeIcon size={14} /> Home ({homeImages.length})
        </button>
        <button onClick={() => setSection('gallery')} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition ${section === 'gallery' ? 'bg-gradient-to-r from-blue-700 to-emerald-600 text-white shadow' : 'text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800'}`}>
          <Images size={14} /> Gallery ({galleryImages.length})
        </button>
      </div>

      {isAdmin && (
        <div className="rounded-3xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center">
              <ImagePlus size={18} className="text-white" />
            </div>
            <h2 className="font-black text-lg">Add to {section === 'home' ? 'Home' : 'Gallery'}</h2>
          </div>

          <form onSubmit={handleAdd} className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-3">
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
              {section === 'home' && (
                <input placeholder="Short description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
              )}
              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-6 cursor-pointer hover:border-emerald-500 transition">
                <Upload size={18} className="text-slate-500" />
                <span className="text-sm text-slate-500 dark:text-neutral-400">Choose image file</span>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              {form.preview && (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 max-h-48">
                  <img src={form.preview} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-blue-800 hover:to-emerald-700 text-white font-bold rounded-xl py-3 text-sm transition">
                Upload Image
              </button>
            </div>
            <div className="hidden md:block text-xs text-slate-500 dark:text-neutral-500 leading-relaxed">
              <p className="font-bold mb-2 text-slate-700 dark:text-neutral-300">Tips</p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Use JPG or PNG for best quality</li>
                <li>Home images appear on the landing page</li>
                <li>Gallery images appear in the gallery section</li>
                <li>Images are stored in your browser</li>
              </ul>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg p-6">
        <h2 className="font-black text-lg mb-5">{section === 'home' ? 'Home' : 'Gallery'} Images ({items.length})</h2>
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-neutral-500">No images yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((img) => (
              <div key={img._id} className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-950">
                <img src={resolveSrc(img.image)} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3 gap-2">
                  <span className="text-xs font-bold text-white truncate">{img.title}</span>
                  {isAdmin && (
                    <button onClick={() => handleDelete(img._id)} className="w-8 h-8 rounded-lg bg-rose-500/90 hover:bg-rose-600 flex items-center justify-center shrink-0" aria-label="Delete">
                      <Trash2 size={14} className="text-white" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
