const ITEMS = [
  "Strategy & Growth",
  "Branding & Creative",
  "Content & Production",
  "Events & Advertising",
  "Social Media",
  "Media Buying",
  "Photo & Video",
  "Brand Activations",
];

// Endless scrolling band of services. The list is rendered twice so the
// loop is seamless; the copy is hidden from screen readers.
export default function Marquee() {
  return (
    <div className="marquee bg-era-green text-neutral-950 py-4 overflow-hidden border-y border-neutral-950">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {ITEMS.map((item) => (
              <li key={item} className="flex items-center font-display font-semibold text-lg md:text-xl whitespace-nowrap">
                <span className="px-6">{item}</span>
                <span className="text-neutral-950/50">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
