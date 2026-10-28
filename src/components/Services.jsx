import Eyebrow from "./ui/Eyebrow.jsx";

const SERVICES = [
  {
    title: "Strategy & Growth",
    desc: "Structured strategies and effective digital campaigns, powered by audience insight, creative messaging, targeted advertising, and performance analysis.",
    items: [
      "Marketing Strategy & Planning",
      "Social Media Management",
      "Digital Advertising & Media Buying",
      "Campaign Management & Optimization",
      "Marketing Analytics & Reporting",
    ],
  },
  {
    title: "Branding & Creative",
    desc: "A strong brand is more than a logo. It's how a business looks, communicates, and connects.",
    items: [
      "Brand Strategy & Identity",
      "Graphic Design & Art Direction",
      "Creative Concepts & Campaign Development",
      "Corporate & Promotional Materials",
    ],
  },
  {
    title: "Content & Production",
    desc: "We turn brand messages into engaging content and visual stories. From direction to final assets, every piece serves a purpose.",
    items: [
      "Content Strategy & Creation",
      "Photography & Video Production",
      "Reels & Short-Form Video",
      "Event Media Coverage",
      "Advertising Campaign Production",
    ],
  },
  {
    title: "Events & Advertising",
    desc: "Events are moments to connect and leave a lasting impression. We capture them and turn them into brand experiences, from on-ground coverage to campaigns.",
    items: [
      "Event Coverage & Documentation",
      "On-Site Photo & Video Production",
      "Event Promotional Campaigns",
      "Advertising Materials & Brand Activations",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-neutral-50 border-y border-neutral-200 px-6 md:px-10 py-24 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <Eyebrow>Services Overview</Eyebrow>
        <div className="grid md:grid-cols-2 gap-6 items-end mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-950">
            One partner.
            <br />
            Multiple ways to grow.
          </h2>
          <p className="text-neutral-600 leading-relaxed md:text-right">
            Marketing, creative, and advertising, brought together to build brands.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="cut-card bg-white border border-neutral-200 hover:border-era-green transition-colors duration-200 p-7 md:p-8"
            >
              <div className="font-display text-3xl text-era-green mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display font-semibold text-xl text-neutral-950">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
              <ul className="mt-5 flex flex-col gap-2 border-t border-neutral-200 pt-5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-800">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-era-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 font-display font-semibold text-neutral-950 border-l-2 border-era-green pl-4">
          Integrated solutions. Tailored strategies. Creative execution.
        </p>
      </div>
    </section>
  );
}
