import { ChevronDown } from "lucide-react";

export default function FAQ({ faqs, openFaq, setOpenFaq }) {
  return (
    <section id="faq" className="py-[100px]">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[12px] font-semibold tracking-[0.12em] uppercase text-violet-500 dark:text-violet-400 mb-3.5">FAQ</span>
          <h2 className="font-sora font-extrabold text-zinc-900 dark:text-zinc-50 leading-[1.15]" style={{ fontSize: "clamp(30px,4vw,42px)" }}>
            Frequently asked questions
          </h2>
        </div>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-zinc-200 dark:border-white/[0.07] py-5 cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
            <div className="flex justify-between items-center font-sora font-semibold text-base text-zinc-800 dark:text-zinc-200">
              {faq.q}
              <ChevronDown size={18} className={`faq-chevron flex-shrink-0 text-zinc-400 dark:text-zinc-500 ${openFaq === index ? "open" : ""}`} />
            </div>
            {openFaq === index && <p className="text-[14.5px] text-zinc-500 dark:text-zinc-500 leading-[1.7] mt-3">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}