import { Bot, Mic, BarChart3, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Bot, title: "Role-Aware Questions", desc: "Custom questions tuned to your job title, tech stack, years of experience, and target company tier." },
  { icon: Mic, title: "Voice-First Interface", desc: "Speak your answers naturally. Real-time transcription means you practice exactly like a real interview." },
  { icon: BarChart3, title: "Deep Performance Analytics", desc: "Track your scores across sessions. See which topics need work with per-skill breakdown charts." },
  { icon: Sparkles, title: "AI-Powered Ideal Answers", desc: "After every question, see a model answer with explanation — learn the 'why' behind each response." },
];

export default function Features() {
  return (
    <section id="features" className="py-[100px] bg-zinc-50/50 dark:bg-white/[0.01]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[12px] font-semibold tracking-[0.12em] uppercase text-violet-500 dark:text-violet-400 mb-3.5">Features</span>
          <h2 className="font-sora font-extrabold text-zinc-900 dark:text-zinc-50 leading-[1.15]" style={{ fontSize: "clamp(30px,4vw,42px)" }}>
            Everything you need to land the job
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-500 mt-3 leading-[1.6] max-w-[500px] mx-auto">Built for serious job seekers who want real results, not just practice.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-[20px] p-7 border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] transition-all duration-300 hover:border-violet-400/40 dark:hover:border-violet-400/25 hover:bg-violet-50 dark:hover:bg-violet-400/[0.04] hover:-translate-y-[3px] shadow-sm dark:shadow-none">
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-violet-500 dark:text-violet-400 border border-violet-200 dark:border-violet-400/20 mb-[18px]" style={{ background: "rgba(167,139,250,0.12)" }}>
                <Icon size={22} />
              </div>
              <h3 className="font-sora font-bold text-[18px] text-zinc-900 dark:text-zinc-50 mb-2">{title}</h3>
              <p className="text-[14.5px] text-zinc-500 leading-[1.6]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}