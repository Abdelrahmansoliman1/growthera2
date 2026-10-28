import Eyebrow from "./ui/Eyebrow.jsx";

const INDUSTRIES = [
  { title: "Logistics & Shipping", desc: "Corporate branding, digital content, and campaigns." },
  { title: "Food & Beverage", desc: "Visual content, social media, and digital advertising." },
  { title: "Beauty & Personal Care", desc: "Distinctive identities and product-value content." },
  { title: "Travel, Tourism & Hospitality", desc: "Visual storytelling and digital campaigns." },
  { title: "Retail & E-Commerce", desc: "Product visibility and digital marketing." },
  { title: "Lifestyle & Consumer Brands", desc: "Cohesive experiences across every channel." },
];

export default function Industries() {
  return (
    <section id="industries" className="scroll-mt-20 bg-white px-6 md:px-10 py-24 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Eyebrow>Industries We Understand</Eyebrow>
        <div className="grid md:grid-cols-2 gap-6 items-end mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-950">
            Different industries.
            <br />
            Different challenges.
          </h2>
          <p className="text-neutral-600 leading-relaxed md:text-right">
            Every industry has its own audience and needs. Our approach adapts to each.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {INDUSTRIES.map((ind, i) => (
            <div key={ind.title} className="border-t border-neutral-200 pt-5 relative">
              <span className="absolute -top-px left-0 h-0.5 w-12 bg-era-green" />
              <div className="flex gap-4">
                <span className="font-display text-2xl text-era-green leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-display font-semibold text-neutral-950 mb-1">{ind.title}</div>
                  <div className="text-sm text-neutral-500 leading-relaxed">{ind.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 font-display font-semibold text-neutral-950 border-l-2 border-era-green pl-4">
          Our solutions are shaped around each brand's goals, audience, and market context.
        </p>
      </div>
    </section>
  );
}
