import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-[80px] pb-[100px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-[24px] text-center py-16 px-8 border border-violet-400/20" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(52,211,153,0.12) 100%)" }}>
          <div className="anim-orb absolute w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.25)", top: -80, left: "10%", filter: "blur(60px)" }} />
          <div className="anim-orb-2 absolute w-[250px] h-[250px] rounded-full pointer-events-none" style={{ background: "rgba(52,211,153,0.15)", bottom: -60, right: "15%", filter: "blur(60px)" }} />
          <div className="relative z-10">
            <h2 className="font-sora font-extrabold text-zinc-50 mb-4" style={{ fontSize: "clamp(30px,4vw,48px)" }}>
              Your dream job is one<br />mock interview away
            </h2>
            <p className="text-[17px] text-zinc-400 max-w-[440px] mx-auto mb-9">
              Join 10,000+ candidates who used MockMate to walk into interviews with confidence.
            </p>
            <Link href="/sign-in" className="inline-flex items-center gap-2 text-base font-semibold text-white px-9 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
              Start Practicing Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
