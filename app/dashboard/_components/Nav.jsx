import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export default function Nav({ scrolled }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-950/85 backdrop-blur-xl border-b border-white/[0.06]" : ""}`}>
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between py-[18px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)" }}>
            <Bot size={18} color="#fff" />
          </div>
          <span className="font-sora font-bold text-[17px] text-zinc-50">MockMate</span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {['Features', 'How it Works', 'Pricing', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors">
              {item}
            </a>
          ))}
        </div>

        <Link href="/sign-in" className="inline-flex items-center gap-2 px-5 py-[10px] rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
          Get Started <ArrowRight size={14} />
        </Link>
      </div>
    </nav>
  );
}
