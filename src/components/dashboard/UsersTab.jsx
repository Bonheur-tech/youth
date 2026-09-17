import { UserPlus, Trash2, Shield, User as UserIcon } from 'lucide-react'
import { useState } from 'react'
import { db } from '../../data/db'

export default function UsersTab({ currentUser }) {
  const [refresh, setRefresh] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' })
  const [error, setError] = useState('')

  const users = db.find('users')
  const isAdmin = db.isAdmin(currentUser)

  const handleAdd = (e) => {
    e.preventDefault()
    setError('')
    if (db.filter('users', (u) => u.email.toLowerCase() === form.email.toLowerCase()).length) {
      setError('That email is already registered')
      return
    }
    db.insert('users', { ...form, avatar: null, joined: new Date().toISOString().slice(0, 10) })
    setForm({ name: '', email: '', password: '', role: 'member' })
    setRefresh((r) => r + 1)
  }

  const handleDelete = (id) => {
    if (id === currentUser._id) return alert("You can't delete your own account")
    if (confirm('Delete this user?')) {
      db.remove('users', id)
      setRefresh((r) => r + 1)
    }
  }

  return (
    <div key={refresh} className="space-y-6">
      {isAdmin && (
        <div className="rounded-3xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center">
              <UserPlus size={18} className="text-white" />
            </div>
            <h2 className="font-black text-lg">Add New User</h2>
          </div>
          <form onSubmit={handleAdd} className="grid md:grid-cols-5 gap-3">
            <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
            <input required type="text" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500">
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-blue-800 hover:to-emerald-700 text-white font-bold rounded-xl py-2.5 text-sm transition">
              Add User
            </button>
          </form>
          {error && <p className="text-sm text-rose-500 font-medium mt-3">{error}</p>}
        </div>
      )}

      <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-neutral-800">
          <h2 className="font-black text-lg">All Users ({users.length})</h2>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-neutral-800">
          {users.map((u) => (
            <div key={u._id} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-neutral-800/40 transition">
              <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center overflow-hidden ring-2 ring-emerald-500/40 bg-gradient-to-br from-blue-700 to-emerald-500">
                {u.avatar ? (
                  <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-black">{u.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{u.name}</p>
                <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">{u.email}</p>
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full shrink-0 ${u.role === 'admin' ? 'bg-gradient-to-r from-yellow-400 to-emerald-500 text-slate-900' : 'bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300'}`}>
                {u.role === 'admin' ? <Shield size={10} className="inline mr-1" /> : <UserIcon size={10} className="inline mr-1" />}
                {u.role}
              </span>
              {isAdmin && u._id !== currentUser._id && (
                <button onClick={() => handleDelete(u._id)} className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center transition shrink-0" aria-label="Delete user">
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
