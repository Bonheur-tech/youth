import { X, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo } from "react";

// Pre-bundled images from src/assets (for statically-defined programs)
const images = import.meta.glob("../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

// Inline SVG placeholder (used when no image is available)
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e40af"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="800" height="480" fill="url(#g)"/>
      <text x="50%" y="52%" text-anchor="middle" fill="white"
        font-family="system-ui" font-size="36" font-weight="800" opacity="0.95">
        Youth Foundry Rwanda
      </text>
    </svg>`,
  );

/**
 * Resolve an image reference to a usable <img src>.
 * Handles: filename in src/assets, direct URL, base64/data URL, blob URL.
 */
function resolveImage(image) {
  if (!image) return null;

  // 1. Direct URL / data URL / blob URL — use as-is
  if (
    typeof image === "string" &&
    (image.startsWith("http") ||
      image.startsWith("data:") ||
      image.startsWith("blob:") ||
      image.startsWith("/"))
  ) {
    // Special case: "/src/assets/foo.png" — try the glob map first
    if (image.startsWith("/src/assets/")) {
      const filename = image.split("/").pop();
      const viaGlob = images[`../assets/${filename}`];
      return viaGlob || image;
    }
    return image;
  }

  // 2. Filename only — try the glob map (relative to src/assets)
  const filename = String(image).split("/").pop();
  const viaGlob = images[`../assets/${filename}`];
  if (viaGlob) return viaGlob;

  // 3. Last resort — build a relative path and let onError handle it
  return `../assets/${filename}`;
}

export default function ProgramModal({ program, onClose }) {
  // Lock scroll + Escape key
  useEffect(() => {
    if (!program) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [program, onClose]);

  const imgSrc = useMemo(
    () => (program ? resolveImage(program.image) || FALLBACK_IMG : null),
    [program],
  );

  if (!program) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={program.title}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur text-white flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Hero image */}
        <div className="relative h-56 md:h-72 overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-neutral-800">
          <img
            src={imgSrc}
            alt={program.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <h2 className="absolute bottom-5 left-6 right-6 text-2xl md:text-3xl font-black text-white drop-shadow-lg">
            {program.title}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          {program.long && (
            <p className="text-slate-700 dark:text-neutral-300 leading-relaxed">
              {program.long}
            </p>
          )}

          {program.highlights?.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                What you'll gain
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {program.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-neutral-300"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
