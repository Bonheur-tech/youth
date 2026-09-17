import { Camera, Save, User as UserIcon, Lock, Mail } from 'lucide-react'
import { useState, useRef } from 'react'
import { db } from '../../data/db'
import { fileToBase64 } from '../../utils/image'

export default function ProfileTab({ currentUser, onUpdate }) {
  const [name, setName] = useState(currentUser.name)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [msg, setMsg] = useState('')
  const fileRef = useRef(null)

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await fileToBase64(file)
    setAvatar(dataUrl)
    db.update('users', currentUser._id, { avatar: dataUrl })
    onUpdate({ ...currentUser, avatar: dataUrl })
    setMsg('Profile picture updated!')
    setTimeout(() => setMsg(''), 2500)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setMsg('')
    if (password && password !== confirm) {
      setMsg('Passwords do not match')
      return
    }
    const patch = { name }
    if (password) patch.password = password
    db.update('users', currentUser._id, patch)
    onUpdate({ ...currentUser, ...patch })
    setPassword('')
    setConfirm('')
    setMsg('Profile saved!')
    setTimeout(() => setMsg(''), 2500)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="rounded-3xl p-6 md:p-8 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-emerald-500/40 bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-4xl font-black">{name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <button onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition" aria-label="Change profile picture">
              <Camera size={16} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-black">{name}</h2>
            <p className="text-sm text-slate-500 dark:text-neutral-400 flex items-center gap-1.5 justify-center md:justify-start mt-1">
              <Mail size={12} /> {currentUser.email}
            </p>
            <span className={`inline-block mt-3 text-[10px] font-black uppercase px-3 py-1 rounded-full ${currentUser.role === 'admin' ? 'bg-gradient-to-r from-yellow-400 to-emerald-500 text-slate-900' : 'bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300'}`}>
              {currentUser.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-slate-200 dark:border-neutral-800">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-neutral-400 mb-1.5 flex items-center gap-1.5">
              <UserIcon size={12} /> Display name
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 text-sm" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Lock size={12} /> New password
              </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-neutral-400 mb-1.5">Confirm password</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat new password" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 text-sm" />
            </div>
          </div>

          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 via-emerald-600 to-yellow-500 hover:from-blue-800 hover:to-yellow-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition">
            <Save size={16} /> Save Changes
          </button>

          {msg && <p className={`text-sm font-bold text-center ${msg.includes('match') ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}>{msg}</p>}
        </form>
      </div>
    </div>
  )
}
