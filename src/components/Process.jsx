import Eyebrow from "./ui/Eyebrow.jsx";
import Reveal, { trackPointer } from "./ui/Reveal.jsx";

const STEPS = [
  { title: "Brief & Alignment", desc: "Requirements, objectives, and scope." },
  { title: "Research & Planning", desc: "Context, priorities, and roadmap." },
  { title: "Strategy & Development", desc: "Direction, concepts, plans, and deliverables." },
  { title: "Execution & Production", desc: "The approved direction, brought to life." },
  { title: "Review & Delivery", desc: "Feedback aligned, deliverables finalized." },
  { title: "Evaluation & Optimization", desc: "Where applicable, performance reviewed and improved." },
];

export default function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 bg-neutral-950 text-white px-6 md:px-10 py-24 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="grid md:grid-cols-2 gap-6 items-end mb-14">
          <div>
            <Eyebrow dark>Our Process</Eyebrow>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
            From brief
            <br />
            to execution.
            </h2>
          </div>
          <p className="text-neutral-400 leading-relaxed md:text-right">
            Strategy meets creativity. A clear process means better
            collaboration, stronger alignment, and more effective delivery.
          </p>
        </Reveal>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={(i % 3) * 120}
              onMouseMove={trackPointer}
              className="group spotlight bg-neutral-950 hover:bg-neutral-900 transition-colors duration-300 p-7"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="font-display text-3xl text-era-green transition-transform duration-300 group-hover:-translate-y-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-neutral-800 relative overflow-hidden">
                  <span className="absolute inset-y-0 left-0 w-0 bg-era-green transition-all duration-500 group-hover:w-full" />
                </span>
              </div>
              <div className="font-display font-semibold text-lg mb-2">{step.title}</div>
              <div className="text-sm text-neutral-400 leading-relaxed">{step.desc}</div>
            </Reveal>
          ))}
        </ol>

        <Reveal as="p" className="mt-10 font-display font-semibold border-l-2 border-era-green pl-4">
          Every action has a purpose. Every idea starts with a reason.
        </Reveal>
      </div>
    </section>
  );
}
