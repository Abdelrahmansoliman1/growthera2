import Logo from "./Logo.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";
import PrimaryButton from "./ui/PrimaryButton.jsx";
import GhostButton from "./ui/GhostButton.jsx";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white px-6 md:px-10 py-28 md:py-0 min-h-screen md:h-screen flex flex-col justify-center">
      <div className="absolute -right-24 -top-24 opacity-10 city pointer-events-none">
        <Logo light className="h-[420px] w-[420px]" />
      </div>

      <div className="relative max-w-4xl mx-auto lg:-translate-x-72">
        <Eyebrow dark>Growth Era — Marketing Agency</Eyebrow>
        <h1 className="font-display font-bold tracking-tight leading-[1.05] text-5xl sm:text-6xl md:text-7xl">
          Marketing that
          <br />
          <span className="text-era-green">grows brands.</span>
        </h1>
        <p className="mt-6 max-w-xl text-neutral-300 text-base md:text-lg leading-relaxed">
          We're a performance-driven marketing partner for brands ready for
          their next phase — pairing sharp strategy with hands-on execution
          across brand, content, and paid growth.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <PrimaryButton href="#contact">Start a Project</PrimaryButton>
          <GhostButton href="#services">See what we do</GhostButton>
        </div>
      </div>
    </section>
  );
}
