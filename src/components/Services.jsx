import { ArrowUpRight } from "lucide-react";
import Eyebrow from "./ui/Eyebrow.jsx";

const SERVICES = [
  { title: "Brand Strategy", desc: "Positioning, messaging, and identity that gives your brand a clear edge." },
  { title: "Performance Marketing", desc: "Paid social, search, and programmatic campaigns engineered to convert." },
  { title: "Content & Social", desc: "Always-on content that builds an audience, not just impressions." },
  { title: "Web & Design", desc: "Sites and digital experiences designed to turn visitors into customers." },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-neutral-50 border-y border-neutral-200 px-6 md:px-10 py-24 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <Eyebrow>What We Do</Eyebrow>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-950 mb-12">
          Services
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="cut-card group bg-white border border-neutral-200 hover:border-era-green transition-colors duration-200 p-7"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display font-semibold text-lg text-neutral-950">{s.title}</h3>
                <ArrowUpRight
                  size={18}
                  className="text-neutral-300 group-hover:text-era-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
