import logo from '../assets/logo.png'
import rwanda from '../assets/rwanda.webp'
import { site } from '../data/db'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <img src={rwanda} alt="Rwanda" className="absolute inset-0 w-full h-full object-cover scale-105 animate-kenburns" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/50 to-emerald-950/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
      <div className="relative z-10 text-center px-4 py-24 max-w-5xl mx-auto">
        <div className="relative mx-auto w-fit animate-float">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-emerald-400 to-blue-500 blur-3xl opacity-70 animate-pulse-slow" />
          <div className="relative rounded-full p-1.5 bg-gradient-to-tr from-yellow-400 via-emerald-400 to-blue-500 shadow-2xl">
            <img src={logo} alt={site.name} className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover bg-white ring-4 ring-white/40" />
          </div>
        </div>
        <h1 className="mt-10 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight animate-fade-in-up animation-delay-200">
          <span className="bg-gradient-to-r from-white via-yellow-200 to-emerald-200 bg-clip-text text-transparent drop-shadow-2xl">{site.name}</span>
        </h1>
        <p className="mt-5 text-lg md:text-2xl font-semibold text-white/95 max-w-3xl mx-auto animate-fade-in-up animation-delay-400 drop-shadow-lg">{site.tagline}</p>
        <p className="mt-3 text-sm md:text-base text-white/75 max-w-xl mx-auto animate-fade-in-up animation-delay-600">{site.description}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
          <a href="#programs" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-500 hover:from-yellow-500 hover:to-emerald-600 text-slate-900 font-bold px-7 py-3.5 rounded-full shadow-2xl shadow-yellow-500/40 hover:shadow-emerald-500/60 hover:scale-105 transition-all duration-300">
            Explore Programs
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300">Contact Us</a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/80" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent z-10" />
    </section>
  )
}
