export default function Stats() {
  const items = [
    { num: "10,000+", label: "Interviews Practiced" },
    { num: "94%", label: "Users Report Improved Confidence" },
    { num: "3x", label: "Faster Preparation" },
    { num: "50+", label: "Job Roles Covered" },
  ];

  return (
    <div className="border-y border-white/[0.06] py-10 bg-white/[0.02]">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ num, label }) => (
          <div key={label} className="text-center">
            <div className="font-sora font-extrabold text-[36px] text-zinc-50 leading-none">{num}</div>
            <div className="text-sm text-zinc-500 mt-1.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
