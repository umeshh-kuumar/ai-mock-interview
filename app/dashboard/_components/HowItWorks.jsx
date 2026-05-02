import { Target, Mic, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: Target, title: "Set your context", desc: "Enter your target job role, tech stack, experience level, and the companies you're interviewing at." },
    { icon: Mic, title: "Practice with AI", desc: "Answer questions by voice in a real-time simulated interview. The AI adapts based on your responses." },
    { icon: TrendingUp, title: "Review & improve", desc: "Get detailed feedback, ideal answers, and a performance score for every question. Track your growth over time." },
  ];

  return (
    <section id="how-it-works" className="py-[100px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center">
          <div>
            <span className="inline-block text-[12px] font-semibold tracking-[0.12em] uppercase text-violet-500 dark:text-violet-400 mb-3.5">How it works</span>
            <h2 className="font-sora font-extrabold text-zinc-900 dark:text-zinc-50 leading-[1.15]" style={{ fontSize: "clamp(30px,4vw,42px)" }}>
              From nervous to<br />interview-ready in 3 steps
            </h2>
            <p className="text-base text-zinc-500 mt-3 leading-[1.6]">No fluff. Just focused practice that mirrors the real thing.</p>
          </div>

          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div key={step.title}>
                <div className="flex gap-5 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-sora font-bold text-base text-violet-500 dark:text-violet-400 border-[1.5px] border-violet-300 dark:border-violet-400/30" style={{ background: "rgba(167,139,250,0.12)" }}>
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px h-12 ml-0" style={{ background: "linear-gradient(to bottom, rgba(167,139,250,0.4), transparent)" }} />
                    )}
                  </div>
                  <div className={`pt-2.5 ${index < steps.length - 1 ? "pb-8" : ""}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon size={16} className="text-violet-500 dark:text-violet-400" />
                      <h3 className="font-sora font-bold text-[17px] text-zinc-900 dark:text-zinc-50">{step.title}</h3>
                    </div>
                    <p className="text-[14.5px] text-zinc-500 leading-[1.65]">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}