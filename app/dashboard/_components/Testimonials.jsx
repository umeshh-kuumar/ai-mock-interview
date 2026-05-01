import { Star } from "lucide-react";

const TESTIMONIALS = [
  { quote: "I went from blanking on system design questions to confidently explaining distributed systems. Got the offer from my dream company after 2 weeks of MockMate.", name: "Priya S.", role: "SDE-2 @ Google", initials: "PS", bg: "bg-purple-900/30", text: "text-purple-400" },
  { quote: "The behavioral question bank is insane. STAR-format feedback helped me structure my answers perfectly. Landed a PM role at a Series B startup!", name: "Arjun M.", role: "Product Manager", initials: "AM", bg: "bg-teal-900/30", text: "text-teal-400" },
  { quote: "Best money I spent on job prep. The AI catches things like filler words and vague answers that humans wouldn't notice. 3 offers in 3 weeks.", name: "Sara K.", role: "Frontend Engineer", initials: "SK", bg: "bg-pink-900/30", text: "text-pink-400" },
];

export default function Testimonials() {
  return (
    <section className="py-[100px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[12px] font-semibold tracking-[0.12em] uppercase text-violet-400 mb-3.5">Testimonials</span>
          <h2 className="font-sora font-extrabold text-zinc-50 leading-[1.15]" style={{ fontSize: "clamp(30px,4vw,42px)" }}>
            Used by 10,000+ job seekers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ quote, name, role, initials, bg, text }) => (
            <div key={name} className="rounded-[20px] p-7 border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:border-violet-400/20 hover:-translate-y-[3px]">
              <div className="flex gap-[3px] mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="text-[15px] text-zinc-400 leading-[1.7] mb-5">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${bg} ${text}`}>
                  {initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-50">{name}</div>
                  <div className="text-[13px] text-zinc-500">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
