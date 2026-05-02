import Link from "next/link";
import { ArrowRight, Bot, Sun, Moon } from "lucide-react";

export default function Nav({ scrolled, dark, toggleDark }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-200/60 dark:border-white/[0.06]" : ""}`}>
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between py-[18px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)" }}>
            <Bot size={18} color="#fff" />
          </div>
          <span className="font-sora font-bold text-[17px] text-zinc-900 dark:text-zinc-50">MockMate</span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {['Features', 'How it Works', 'Pricing', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-sm font-medium transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link href="/sign-in" className="inline-flex items-center gap-2 px-5 py-[10px] rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </nav>
  );
}