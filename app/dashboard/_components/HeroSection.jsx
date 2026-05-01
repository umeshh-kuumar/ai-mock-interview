import Link from "next/link";
import { ArrowRight, Play, Mic, CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-[140px] pb-[100px] overflow-hidden">
      <div className="anim-orb absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.18)", top: -120, left: -80, filter: "blur(90px)" }} />
      <div className="anim-orb-2 absolute w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(52,211,153,0.1)", top: 60, right: -100, filter: "blur(90px)" }} />

      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
          <div className="flex flex-col gap-7">
            <div className="anim-fade-up delay-1">
              <span className="anim-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium text-violet-300 border border-violet-400/30"
                style={{ background: "rgba(167,139,250,0.12)" }}>
                <span className="w-[7px] h-[7px] rounded-full bg-violet-400 flex-shrink-0" />
                AI-Powered Interview Coach
              </span>
            </div>

            <h1 className="anim-fade-up delay-2 font-sora font-extrabold leading-[1.08] tracking-[-0.03em] text-zinc-50" style={{ fontSize: "clamp(42px,6vw,72px)" }}>
              Ace your next<br />
              <span className="text-violet-400">interview</span> with<br />
              <span className="text-emerald-400">AI practice</span>
            </h1>

            <p className="anim-fade-up delay-3 text-zinc-400 leading-[1.65] max-w-[480px]" style={{ fontSize: "clamp(16px,2vw,19px)" }}>
              Simulate real interviews, get instant AI feedback, and track your improvement — all before your actual interview day.
            </p>

            <div className="anim-fade-up delay-4 flex gap-3.5 flex-wrap">
              <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
                Start for Free <ArrowRight size={16} />
              </Link>
              <a href="https://youtu.be" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-medium text-zinc-200 border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.10] transition-all hover:-translate-y-0.5">
                <Play size={15} /> Watch Demo
              </a>
            </div>

            <div className="anim-fade-up delay-5 flex gap-5 pt-2">
              {[['10k+', 'Users trained'], ['94%', 'Offer rate'], ['Free', 'To start']].map(([value, label]) => (
                <div key={label}>
                  <div className="font-sora font-extrabold text-xl text-zinc-50">{value}</div>
                  <div className="text-[13px] text-zinc-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-center anim-fade-up delay-3">
            <div className="anim-float w-full max-w-[420px]">
              <div className="rounded-[20px] overflow-hidden w-full" style={{ background: "#111115", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.1)" }}>
                <div className="flex items-center gap-2.5 px-[18px] py-3.5 border-b border-white/[0.06]" style={{ background: "#17171d" }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-[13px] text-zinc-500 font-medium">MockMate AI • Live Session</span>
                  <div className="ml-auto">
                    <span className="anim-score-in inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-[12.5px] font-semibold text-emerald-400 border border-emerald-400/30" style={{ background: "rgba(52,211,153,0.15)" }}>
                      <CheckCircle size={12} /> Score: 9.1/10
                    </span>
                  </div>
                </div>

                <div className="p-[18px] flex flex-col gap-3.5">
                  <div className="text-[12px] text-zinc-600 font-semibold uppercase tracking-[0.08em]">Question 3 of 8 • System Design</div>

                  <div className="rounded-[0_14px_14px_14px] px-3.5 py-3 text-[13.5px] text-violet-300 leading-[1.5] max-w-[85%] border border-violet-400/20" style={{ background: "rgba(167,139,250,0.1)" }}>
                    Design a URL shortener like bit.ly. Walk me through your architecture and key trade-offs.
                    <span className="anim-blink inline-block w-[2px] h-3.5 bg-violet-400 ml-0.5 align-middle" />
                  </div>

                  <div className="rounded-[14px_14px_0_14px] px-3.5 py-3 text-[13.5px] text-emerald-300 leading-[1.5] max-w-[85%] self-end border border-emerald-400/20" style={{ background: "rgba(52,211,153,0.1)" }}>
                    I'd start with a REST API layer, use a NoSQL store like Redis for fast lookups, and a SQL DB for persistence. For scale, I'd add a CDN and consistent hashing...
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-500 border border-white/[0.08] bg-white/[0.04]">
                    <Mic size={16} className="text-violet-400 flex-shrink-0" />
                    <span className="flex-1">Listening... speak your answer</span>
                    <div className="flex gap-[3px]">
                      {[10, 18, 12, 22, 8, 16, 20].map((height, index) => (
                        <div key={index} style={{ width: 3, height, background: "#a78bfa", borderRadius: 2, opacity: 0.6 + index * 0.05 }} />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {['Clarity: 9/10', 'Depth: 8/10', 'Structure: 9/10'].map(tag => (
                      <span key={tag} className="text-[12px] text-violet-300 rounded-full px-2.5 py-1 border border-violet-400/20" style={{ background: "rgba(167,139,250,0.1)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
