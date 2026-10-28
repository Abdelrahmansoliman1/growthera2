import Eyebrow from "./ui/Eyebrow.jsx";

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
        <Eyebrow dark>Our Process</Eyebrow>
        <div className="grid md:grid-cols-2 gap-6 items-end mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl">
            From brief
            <br />
            to execution.
          </h2>
          <p className="text-neutral-400 leading-relaxed md:text-right">
            Strategy meets creativity. A clear process means better
            collaboration, stronger alignment, and more effective delivery.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
          {STEPS.map((step, i) => (
            <li key={step.title} className="bg-neutral-950 p-7">
              <div className="font-display text-3xl text-era-green mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display font-semibold text-lg mb-2">{step.title}</div>
              <div className="text-sm text-neutral-400 leading-relaxed">{step.desc}</div>
            </li>
          ))}
        </ol>

        <p className="mt-10 font-display font-semibold border-l-2 border-era-green pl-4">
          Every action has a purpose. Every idea starts with a reason.
        </p>
      </div>
    </section>
  );
}
