import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-12 pb-8">
      <div className="max-w-[1100px] mx-auto px-6 flex justify-between items-start flex-wrap gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)" }}>
              <Bot size={15} color="#fff" />
            </div>
            <span className="font-sora font-bold text-[16px] text-zinc-50">MockMate</span>
          </div>
          <p className="text-[13.5px] text-zinc-600 max-w-[240px] leading-[1.6]">AI-powered mock interviews for modern job seekers.</p>
        </div>

        <div className="flex gap-12">
          {[
            { heading: "Product", links: ["Features", "How it Works", "Pricing", "Changelog"] },
            { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { heading: "Legal", links: ["Privacy", "Terms", "Cookies"] },
          ].map(column => (
            <div key={column.heading}>
              <div className="text-[12px] font-semibold text-zinc-600 uppercase tracking-[0.10em] mb-3.5">{column.heading}</div>
              <div className="flex flex-col gap-2.5">
                {column.links.map(link => (
                  <a key={link} href="#" className="text-sm text-zinc-500 hover:text-zinc-100 no-underline transition-colors">{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto px-6 mt-10 pt-6 border-t border-white/[0.05]">
        <p className="text-[13px] text-zinc-700">© 2025 MockMate. All rights reserved.</p>
      </div>
    </footer>
  );
}
