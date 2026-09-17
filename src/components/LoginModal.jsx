import { X, LogIn, Mail, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { db } from "../data/db";

export default function LoginModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      setError("");
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = db.authenticate(email, password);
    if (!user) {
      setError("Invalid email or password");
      return;
    }
    onSuccess(user);
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-2xl animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 flex items-center justify-center transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-emerald-700 px-6 pt-10 pb-8 text-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,#fbbf24,transparent_50%),radial-gradient(circle_at_70%_80%,#10b981,transparent_50%)]" />
          <div className="relative">
            <img
              src={logo}
              alt="Youth Foundry Rwanda"
              className="w-20 h-20 mx-auto rounded-full object-cover bg-white ring-4 ring-white/40 shadow-2xl"
            />
            <h2 className="mt-4 text-xl md:text-2xl font-black text-white">
              Welcome Back
            </h2>
            <p className="mt-1 text-white/80 text-sm">
              Sign in to your account
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-neutral-400 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-neutral-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-sm"
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-rose-500 font-medium text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 via-emerald-600 to-yellow-500 hover:from-blue-800 hover:to-yellow-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/40 hover:shadow-emerald-600/50 hover:scale-[1.01] transition-all duration-300"
          >
            <LogIn size={16} />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
