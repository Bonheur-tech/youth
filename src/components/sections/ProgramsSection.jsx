import { ArrowRight, Code2, Compass } from "lucide-react";
import { useState } from "react";
import { programs } from "../../data/db";
import ProgramModal from "../ProgramModal";

const icons = { "program:1": Code2, "program:2": Compass };

// Fallback for missing images
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e40af"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#g)"/>
      <text x="50%" y="52%" text-anchor="middle" fill="white"
        font-family="system-ui" font-size="20" font-weight="700" opacity="0.9">
        Youth Foundry
      </text>
    </svg>`,
  );

export default function ProgramsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="programs" className="relative">
      {/* ---------- HEADING ---------- */}
      <div className="text-center mb-12 md:mb-16">
        <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full mb-4">
          What we offer
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-800 to-emerald-600 dark:from-blue-300 dark:to-emerald-300 bg-clip-text text-transparent">
            Our Programs
          </span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-neutral-400 max-w-xl mx-auto text-sm md:text-base">
          Learn, build, and grow with hands-on training designed for Rwanda's
          next generation of builders.
        </p>
      </div>

      {/* ---------- EMPTY STATE ---------- */}
      {programs.length === 0 && (
        <div className="text-center py-16 rounded-3xl border-2 border-dashed border-slate-200 dark:border-neutral-800">
          <p className="text-slate-500 dark:text-neutral-400 text-sm">
            No programs yet — check back soon.
          </p>
        </div>
      )}

      {/* ---------- GRID ---------- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {programs.map((p, i) => {
          const Icon = icons[p._id] || Code2;
          const imgSrc = p.image || p.img || p.imageUrl || FALLBACK_IMG;

          return (
            <button
              key={p._id}
              type="button"
              onClick={() => setSelected(p)}
              className="group relative text-left rounded-3xl overflow-hidden
                         bg-white dark:bg-neutral-900
                         border border-slate-200/80 dark:border-neutral-800
                         hover:border-emerald-300 dark:hover:border-emerald-800
                         hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/20
                         transition-all duration-500
                         animate-fade-in-up
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* ---------- IMAGE / THUMBNAIL ---------- */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-neutral-800">
                <img
                  src={imgSrc}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                  className="w-full h-full object-cover
                             group-hover:scale-105
                             transition-transform duration-700 ease-out"
                />
                {/* gradient overlay for legibility of the badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Icon badge, top-left */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 dark:bg-neutral-950/90 backdrop-blur flex items-center justify-center shadow-lg">
                  <Icon
                    size={18}
                    className="text-emerald-600 dark:text-emerald-400"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Category, bottom-left */}
                {p.category && (
                  <span
                    className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider
                                   text-white bg-emerald-600/90 backdrop-blur px-2.5 py-1 rounded-full"
                  >
                    {p.category}
                  </span>
                )}
              </div>

              {/* ---------- CONTENT ---------- */}
              <div className="p-5 md:p-6">
                <h3 className="font-black text-lg md:text-xl text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                  {p.short}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold
                                 text-emerald-700 dark:text-emerald-400
                                 group-hover:gap-3 transition-all duration-300"
                >
                  Learn more
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <ProgramModal program={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
