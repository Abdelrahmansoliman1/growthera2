import { ArrowUpRight } from "lucide-react";
import Eyebrow from "./ui/Eyebrow.jsx";

const VALUES = [
  { title: "Strategy first", desc: "We start with positioning and audience — never tactics." },
  { title: "Built to perform", desc: "Every channel is measured against real growth metrics." },
  { title: "Brand-obsessed", desc: "Creative that builds equity, not just impressions." },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white px-6 md:px-10 py-24 md:py-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-950 mb-6">
            About Growth Era
          </h2>
          <p className="text-neutral-600 leading-relaxed text-base md:text-lg">
            Growth Era is a marketing agency built for brands that are ready
            to move into their next phase. We pair strategic thinking with
            hands-on execution, so every campaign compounds — not just
            converts.
          </p>
          <p className="mt-4 text-neutral-600 leading-relaxed text-base md:text-lg">
            No bloated retainers. No generic playbooks. Just marketing built
            around how your brand actually grows.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {VALUES.map((item) => (
            <div
              key={item.title}
              className="cut-card border border-neutral-200 px-6 py-5 flex items-start gap-4"
            >
              <ArrowUpRight size={18} className="text-era-green mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              <div>
                <div className="font-display font-semibold text-neutral-950 mb-1">{item.title}</div>
                <div className="text-sm text-neutral-500 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
