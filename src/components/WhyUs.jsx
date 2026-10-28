import Eyebrow from "./ui/Eyebrow.jsx";

const REASONS = [
  { title: "Strategy Before Execution", desc: "Your goals first, then the right direction." },
  { title: "Creativity With Purpose", desc: "Ideas that communicate clearly and serve an objective." },
  { title: "Integrated Solutions", desc: "Strategy, branding, content, and production, together." },
  { title: "Tailored to Your Business", desc: "Solutions shaped around your specific needs." },
  { title: "Collaborative by Nature", desc: "Clear communication and productive partnerships." },
  { title: "Focused on Continuous Improvement", desc: "Learning from every project to get better." },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="scroll-mt-20 bg-neutral-50 border-y border-neutral-200 px-6 md:px-10 py-24 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <Eyebrow>Why Growth Era?</Eyebrow>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-950 mb-14">
          More than marketing.
          <br />
          <span className="text-era-green">A partner in growth.</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((r, i) => (
            <div key={r.title} className="cut-card bg-white border border-neutral-200 p-7">
              <div className="font-display text-sm text-era-green mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display font-semibold text-lg text-neutral-950 mb-2">{r.title}</div>
              <div className="text-sm text-neutral-500 leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>

        <p className="mt-10 font-display font-semibold text-neutral-950 border-l-2 border-era-green pl-4">
          Your vision. Our expertise. A shared ambition to grow.
        </p>
      </div>
    </section>
  );
}
