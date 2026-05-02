import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    desc: "Get started with the basics",
    features: ["5 mock interviews/month", "3 job roles", "Basic feedback report", "Voice + text answers"],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "12",
    desc: "For serious interview prep",
    features: ["Unlimited mock interviews", "All 50+ job roles", "Deep analytics dashboard", "Ideal answer comparison", "Company-specific questions", "Priority AI response"],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Teams",
    price: "29",
    desc: "For bootcamps & cohorts",
    features: ["Everything in Pro", "Up to 10 seats", "Admin dashboard", "Progress tracking", "Custom question sets", "Dedicated support"],
    cta: "Get Teams",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-[100px] bg-zinc-50/50 dark:bg-white/[0.01]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[12px] font-semibold tracking-[0.12em] uppercase text-violet-500 dark:text-violet-400 mb-3.5">Pricing</span>
          <h2 className="font-sora font-extrabold text-zinc-900 dark:text-zinc-50 leading-[1.15]" style={{ fontSize: "clamp(30px,4vw,42px)" }}>
            Simple, transparent pricing
          </h2>
          <p className="text-base text-zinc-500 mt-3">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map(plan => (
            <div key={plan.name} className={`rounded-[20px] p-8 border transition-all duration-300 hover:-translate-y-1 ${plan.featured ? "border-violet-400/35 bg-violet-50 dark:bg-violet-400/[0.08]" : "border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none"}`} style={plan.featured ? { boxShadow: "0 0 60px rgba(124,58,237,0.15)" } : {}}>
              {plan.featured && (
                <div className="inline-block text-[12px] font-semibold rounded-full px-3 py-1 mb-4 text-violet-600 dark:text-violet-300 bg-violet-100 dark:bg-violet-400/20">Most Popular</div>
              )}
              <h3 className="font-sora font-bold text-[18px] text-zinc-900 dark:text-zinc-50 mb-1.5">{plan.name}</h3>
              <p className="text-sm text-zinc-500 mb-5">{plan.desc}</p>
              <div className="mb-7">
                <span className="font-sora font-extrabold text-[42px] text-zinc-900 dark:text-zinc-50 leading-none">${plan.price}</span>
                <span className="text-sm text-zinc-500"> / month</span>
              </div>
              <div className="flex flex-col gap-0.5 mb-7">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-center gap-2.5 text-[14.5px] text-zinc-600 dark:text-zinc-400 py-1.5">
                    <CheckCircle size={15} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              <Link href="/sign-in" className={`w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:-translate-y-0.5 ${plan.featured ? "text-white hover:opacity-90" : "text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-white/[0.12] bg-zinc-50 dark:bg-white/[0.06] hover:bg-zinc-100 dark:hover:bg-white/[0.10]"}`} style={plan.featured ? { background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" } : {}}>
                {plan.cta} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}