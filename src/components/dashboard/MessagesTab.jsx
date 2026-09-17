import { Send, Trash2, MessageSquare, Reply } from 'lucide-react'
import { useState } from 'react'
import { db } from '../../data/db'

export default function MessagesTab({ currentUser }) {
  const [refresh, setRefresh] = useState(0)
  const [replyTo, setReplyTo] = useState(null)
  const [replyText, setReplyText] = useState('')

  const messages = db.find('messages').slice().reverse()
  const isAdmin = db.isAdmin(currentUser)

  const handleReply = (msgId) => {
    if (!replyText.trim()) return
    const msg = db.findById('messages', msgId)
    if (!msg) return
    const replies = msg.replies || []
    replies.push({ from: currentUser.name, text: replyText, at: new Date().toISOString() })
    db.update('messages', msgId, { replies })
    setReplyText('')
    setReplyTo(null)
    setRefresh((r) => r + 1)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this message?')) {
      db.remove('messages', id)
      setRefresh((r) => r + 1)
    }
  }

  return (
    <div key={refresh} className="space-y-4">
      {messages.length === 0 ? (
        <div className="rounded-3xl p-12 text-center bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg">
          <MessageSquare size={32} className="mx-auto text-slate-400 mb-3" />
          <p className="font-bold text-slate-700 dark:text-neutral-300">No messages yet</p>
          <p className="text-sm text-slate-500 dark:text-neutral-500 mt-1">Messages sent from the contact form will appear here.</p>
        </div>
      ) : (
        messages.map((m) => (
          <div key={m._id} className="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-lg p-5">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center shrink-0 text-white font-black">
                {m.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-bold text-sm">{m.name}</p>
                    <p className="text-xs text-slate-500 dark:text-neutral-400">{m.email}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setReplyTo(replyTo === m._id ? null : m._id)} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline px-2 py-1">
                      <Reply size={12} /> Reply
                    </button>
                    {isAdmin && (
                      <button onClick={() => handleDelete(m._id)} className="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center" aria-label="Delete">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-neutral-300 mt-2 leading-relaxed">{m.message}</p>

                {m.replies?.length > 0 && (
                  <div className="mt-3 space-y-2 pl-3 border-l-2 border-emerald-500/40">
                    {m.replies.map((r, i) => (
                      <div key={i} className="text-xs">
                        <p className="font-bold text-emerald-700 dark:text-emerald-400">{r.from} replied</p>
                        <p className="text-slate-600 dark:text-neutral-400 mt-0.5">{r.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {replyTo === m._id && (
                  <div className="mt-3 flex gap-2">
                    <input autoFocus value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleReply(m._id)} placeholder="Write a reply..." className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500" />
                    <button onClick={() => handleReply(m._id)} className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-700 to-emerald-600 text-white flex items-center justify-center" aria-label="Send reply">
                      <Send size={15} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
