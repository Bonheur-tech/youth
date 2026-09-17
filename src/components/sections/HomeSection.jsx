import { ArrowRight, Sparkles, Heart } from 'lucide-react'
import { db } from '../../data/db'

const resolveSrc = (img) => {
  if (!img) return ''
  if (img.startsWith('data:') || img.startsWith('http')) return img
  return new URL(`../../assets/${img}`, import.meta.url).href
}

export default function HomeSection() {
  const items = db.find('home')

  return (
    <div className="space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4">
          <Sparkles size={14} /> Welcome
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-800 via-emerald-600 to-yellow-500 dark:from-blue-300 dark:via-emerald-300 dark:to-yellow-300 bg-clip-text text-transparent">
            About Youth Foundry Rwanda
          </span>
        </h2>
        <p className="mt-5 text-slate-600 dark:text-neutral-300 leading-relaxed">
          Youth Foundry Rwanda is a youth-driven organisation forging the next generation
          of innovators, developers and entrepreneurs. Through hands-on training, mentorship
          and real-world projects, we help young people turn ideas into impact.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <div key={item._id} className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={resolveSrc(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white drop-shadow-lg">{item.title}</h3>
                {item.desc && <p className="mt-1 text-sm text-white/80">{item.desc}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center bg-gradient-to-br from-blue-800 via-blue-700 to-emerald-700 shadow-2xl shadow-blue-700/40">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,#fbbf24,transparent_50%),radial-gradient(circle_at_70%_80%,#10b981,transparent_50%)]" />
        <div className="relative">
          <Heart size={32} className="mx-auto text-yellow-300 mb-4 animate-pulse" />
          <h3 className="text-2xl md:text-4xl font-black text-white">Ready to build with us?</h3>
          <p className="mt-3 text-white/85 max-w-xl mx-auto text-sm md:text-base">Join a community of young innovators shaping the future of Rwanda.</p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 font-bold px-7 py-3.5 rounded-full hover:scale-105 hover:shadow-2xl shadow-yellow-500/40 transition-all duration-300">
            Get Started <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
