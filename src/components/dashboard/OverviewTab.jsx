import {
  Users,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Inbox,
} from "lucide-react";
import { db } from "../../data/db";

// helper: initials from a name
const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

// helper: pick color for activity dot by keyword
const activityColor = (text = "") => {
  const t = text.toLowerCase();
  if (t.includes("user") || t.includes("sign"))
    return "from-blue-600 to-blue-400";
  if (t.includes("program") || t.includes("publish"))
    return "from-emerald-600 to-emerald-400";
  if (t.includes("image") || t.includes("gallery"))
    return "from-sky-500 to-cyan-400";
  if (t.includes("message") || t.includes("contact"))
    return "from-green-600 to-lime-400";
  return "from-blue-700 to-emerald-500";
};

export default function OverviewTab() {
  const users = db.find("users") ?? [];
  const programs = db.find("programs") ?? [];
  const gallery = db.find("gallery") ?? [];
  const home = db.find("home") ?? [];
  const messages = db.find("messages") ?? [];
  const activities = db.find("dashboard")?.activities ?? [];

  // mock deltas — replace with real data later
  const stats = [
    {
      label: "Users",
      value: users.length,
      delta: "+12%",
      icon: Users,
      color: "from-blue-700 to-blue-500",
      glow: "bg-blue-500/20",
    },
    {
      label: "Programs",
      value: programs.length,
      delta: "+3",
      icon: BookOpen,
      color: "from-emerald-600 to-emerald-400",
      glow: "bg-emerald-500/20",
    },
    {
      label: "Media Items",
      value: gallery.length + home.length,
      delta: "+8",
      icon: ImageIcon,
      color: "from-sky-600 to-cyan-400",
      glow: "bg-sky-500/20",
    },
    {
      label: "Messages",
      value: messages.length,
      delta: "+5",
      icon: MessageSquare,
      color: "from-green-700 to-emerald-500",
      glow: "bg-green-500/20",
    },
  ];

  const recentMessages = [...messages].slice(-4).reverse();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------- STAT CARDS ---------- */}
      <section
        aria-label="Key metrics"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((s, i) => (
          <article
            key={s.label}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-5
                       bg-white dark:bg-neutral-900
                       border border-slate-200 dark:border-neutral-800
                       shadow-sm hover:shadow-xl hover:-translate-y-0.5
                       transition-all duration-300
                       animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* soft glow */}
            <div
              className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-60 ${s.glow} pointer-events-none`}
            />

            <div className="relative flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl
                            bg-gradient-to-br ${s.color}
                            flex items-center justify-center
                            shadow-lg shadow-slate-900/10`}
              >
                <s.icon size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span
                className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-bold
                           text-emerald-700 dark:text-emerald-400
                           bg-emerald-50 dark:bg-emerald-950/50
                           px-2 py-0.5 rounded-full"
              >
                <ArrowUpRight size={11} strokeWidth={3} />
                {s.delta}
              </span>
            </div>

            <p className="relative text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {s.value}
            </p>
            <p className="relative text-[11px] sm:text-xs text-slate-500 dark:text-neutral-400 mt-1 font-semibold uppercase tracking-wide">
              {s.label}
            </p>
          </article>
        ))}
      </section>

      {/* ---------- TWO COLUMN PANELS ---------- */}
      <section className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <article className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm">
          <header className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                Recent Activity
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-500 mt-0.5">
                What's happening across your site
              </p>
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-neutral-400 flex items-center gap-1 bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
              <TrendingUp size={12} /> 7d
            </span>
          </header>

          {activities.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-neutral-500">
              No activity yet.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {activities.map((a) => (
                <li
                  key={a.id}
                  className="group flex items-start gap-3 p-3 rounded-2xl
                             hover:bg-slate-50 dark:hover:bg-neutral-800/60
                             transition-colors"
                >
                  <div className="relative mt-1.5 shrink-0">
                    <div
                      className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${activityColor(
                        a.text,
                      )} shadow-sm`}
                    />
                    <div
                      className={`absolute inset-0 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${activityColor(
                        a.text,
                      )} opacity-0 group-hover:opacity-40 group-hover:scale-150 transition-all`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-neutral-200 leading-snug">
                      {a.text}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                      {a.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>

        {/* Latest Messages */}
        <article className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm">
          <header className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                Latest Messages
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-500 mt-0.5">
                From the contact form
              </p>
            </div>
            {messages.length > 0 && (
              <span className="text-[10px] sm:text-xs font-bold text-white bg-gradient-to-br from-blue-600 to-emerald-500 px-2 py-1 rounded-full">
                {messages.length} total
              </span>
            )}
          </header>

          {recentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
                <Inbox
                  size={20}
                  className="text-slate-400 dark:text-neutral-500"
                />
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-neutral-300">
                Inbox is empty
              </p>
              <p className="text-xs text-slate-400 dark:text-neutral-500 mt-0.5">
                New messages will appear here.
              </p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {recentMessages.map((m) => (
                <li
                  key={m._id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-950/60
                             border border-slate-200/70 dark:border-neutral-800/70
                             hover:border-emerald-300 dark:hover:border-emerald-800
                             transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white text-xs font-black shrink-0">
                      {initials(m.name) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {m.name}
                        </p>
                        <span className="text-[10px] text-slate-400 dark:text-neutral-500 shrink-0 truncate max-w-[45%]">
                          {m.email}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-snug">
                        {m.message}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </div>
  );
}
