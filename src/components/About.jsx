import { useEffect, useState } from "react";
import Eyebrow from "./ui/Eyebrow.jsx";
import Reveal, { useInView, trackPointer } from "./ui/Reveal.jsx";

// Counts up from 0 to `to` once it scrolls into view.
function CountUp({ to, duration = 1400 }) {
  const [ref, inView] = useInView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return <span ref={ref}>{value}</span>;
}

const VALUES = [
  { title: "Strategic Thinking", desc: "Every decision starts with understanding the bigger picture." },
  { title: "Creative Excellence", desc: "We turn ideas into meaningful and distinctive brand experiences." },
  { title: "Collaboration", desc: "We believe the best work comes from strong partnerships." },
  { title: "Accountability", desc: "We take ownership of our work and commitments." },
  { title: "Continuous Improvement", desc: "We learn, adapt, and evolve with every opportunity." },
];

const PURPOSE = [
  {
    label: "Our Vision",
    text: "To become a trusted growth partner for ambitious brands, shaping the future of marketing through strategic thinking, creative innovation, and meaningful collaboration.",
  },
  {
    label: "Our Mission",
    text: "To empower businesses with integrated marketing and creative solutions that strengthen their presence, connect them with the right audiences, and support sustainable growth.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white px-6 md:px-10 py-24 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-start">
          <Reveal>
            <Eyebrow>About Us</Eyebrow>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-950 mb-6">
              About Growth Era
            </h2>
            <p className="text-neutral-950 leading-relaxed text-lg md:text-xl">
              An integrated marketing and creative agency, backed by a team with
              5 years of industry experience, helping businesses build stronger
              brands and grow sustainably.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-6 text-neutral-600 leading-relaxed">
              <p>
                We combine strategy, branding, advertising, content, and event
                coverage into cohesive experiences tailored to each business.
              </p>
              <p>
                From brand identities to campaigns, events, and advertising, we
                turn objectives into actionable marketing.
              </p>
            </div>
            <p className="mt-8 font-display font-semibold text-neutral-950 border-l-2 border-era-green pl-4">
              We don't believe in one-size-fits-all solutions. We believe in
              building what works for your brand.
            </p>
          </Reveal>

          <Reveal delay={150} className="md:border-l md:border-neutral-200 md:pl-12 md:pt-10">
            <div className="font-display font-bold text-8xl md:text-9xl leading-none text-neutral-950">
              <CountUp to={5} />
              <span className="text-era-green">.</span>
            </div>
            <div className="tracked-label text-xs text-neutral-500 mt-4 max-w-[14rem] leading-relaxed">
              Years of industry experience across our team
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-6">
          {PURPOSE.map((p, i) => (
            <Reveal
              key={p.label}
              delay={i * 120}
              onMouseMove={trackPointer}
              className="spotlight cut-card bg-neutral-950 text-white p-8 md:p-10"
            >
              <div className="tracked-label text-xs text-era-green mb-4">{p.label}</div>
              <p className="font-display text-xl md:text-2xl leading-snug">{p.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Eyebrow>Our Core Values</Eyebrow>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 90}
                className={`cut-card lift p-6 h-full ${
                  i === VALUES.length - 1
                    ? "bg-era-green text-neutral-950"
                    : "border border-neutral-200 hover:border-era-green"
                }`}
              >
                <div
                  className={`font-display text-2xl mb-3 ${
                    i === VALUES.length - 1 ? "text-neutral-950" : "text-era-green"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display font-semibold text-neutral-950 mb-2">{v.title}</div>
                <div
                  className={`text-sm leading-relaxed ${
                    i === VALUES.length - 1 ? "text-neutral-800" : "text-neutral-500"
                  }`}
                >
                  {v.desc}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
