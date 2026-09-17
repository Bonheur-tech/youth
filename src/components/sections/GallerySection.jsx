import { gallery } from '../../data/db'

export default function GallerySection() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-800 via-emerald-600 to-yellow-500 dark:from-blue-300 dark:via-emerald-300 dark:to-yellow-300 bg-clip-text text-transparent">Our Gallery</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-neutral-400">Moments from our journey</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {gallery.map((g, i) => (
          <div key={g._id} className="group relative aspect-square overflow-hidden rounded-3xl bg-slate-100 dark:bg-neutral-900 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
              <span className="text-sm md:text-base font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{g.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
