import { Menu, X, ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import LoginModal from "./LoginModal";

export default function TopBar({ user, onLogin, onLogout, onDashboard }) {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ---------- HEADER SHELL ---------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-neutral-800/60 shadow-sm"
            : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
          {/* ---------- BRAND ---------- */}
          <a href="#top" className="flex items-center gap-3 min-w-0 group">
            <img
              src={logo}
              alt="Youth Foundry Rwanda"
              className={`rounded-full object-cover ring-2 transition-all duration-500 shrink-0 bg-white w-10 h-10 ${
                scrolled ? "ring-emerald-500/50" : "ring-white/70"
              }`}
            />
            <span
              className={`font-extrabold tracking-tight truncate text-sm sm:text-base md:text-lg transition-colors duration-500 ${
                scrolled
                  ? "bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent"
                  : "text-white drop-shadow-lg"
              }`}
            >
              Youth Foundry Rwanda
            </span>
          </a>

          {/* ---------- ACTIONS ---------- */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Dashboard — always brand-colored, visible on any bg */}
                <button
                  onClick={onDashboard}
                  className="hidden sm:inline-flex items-center gap-2
                             bg-gradient-to-r from-blue-700 to-emerald-600
                             hover:from-blue-800 hover:to-emerald-700
                             text-white text-sm font-bold px-4 py-2.5 rounded-full
                             shadow-md shadow-blue-700/25 hover:shadow-lg hover:shadow-emerald-600/30
                             hover:scale-[1.03] active:scale-[0.98]
                             transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                >
                  <LayoutDashboard size={14} strokeWidth={2.5} />
                  Dashboard
                </button>

                {/* Logout — red, softer glow */}
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-2
                             bg-gradient-to-r from-rose-500 to-red-600
                             hover:from-rose-600 hover:to-red-700
                             text-white text-sm font-bold px-4 py-2.5 rounded-full
                             shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-600/30
                             hover:scale-[1.03] active:scale-[0.98]
                             transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                >
                  <LogOut size={14} strokeWidth={2.5} />
                  Logout
                </button>
              </>
            ) : (
              /* Login — brand gradient (was yellow/amber) */
              <button
                onClick={() => setLoginOpen(true)}
                className="group relative inline-flex items-center gap-2
                           bg-gradient-to-r from-blue-700 to-emerald-600
                           hover:from-blue-800 hover:to-emerald-700
                           text-white text-sm font-bold px-5 py-2.5 rounded-full
                           shadow-md shadow-blue-700/25 hover:shadow-lg hover:shadow-emerald-600/30
                           hover:scale-[1.03] active:scale-[0.98]
                           transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
              >
                Login
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`md:hidden p-2 rounded-md transition ${
                scrolled
                  ? "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-neutral-900"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ---------- MOBILE MENU ---------- */}
        {open && (
          <div className="md:hidden border-t border-slate-200 dark:border-neutral-800 px-4 py-3 bg-white dark:bg-neutral-950 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    onDashboard();
                    setOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2
                             bg-gradient-to-r from-blue-700 to-emerald-600
                             hover:from-blue-800 hover:to-emerald-700
                             text-white font-bold py-2.5 rounded-full
                             transition-all duration-200"
                >
                  <LayoutDashboard size={16} strokeWidth={2.5} />
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2
                             bg-gradient-to-r from-rose-500 to-red-600
                             hover:from-rose-600 hover:to-red-700
                             text-white font-bold py-2.5 rounded-full
                             transition-all duration-200"
                >
                  <LogOut size={16} strokeWidth={2.5} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2
                           bg-gradient-to-r from-blue-700 to-emerald-600
                           hover:from-blue-800 hover:to-emerald-700
                           text-white font-bold py-2.5 rounded-full
                           transition-all duration-200"
              >
                Login
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}
      </header>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={(u) => {
          onLogin(u);
          setLoginOpen(false);
        }}
      />
    </>
  );
}
