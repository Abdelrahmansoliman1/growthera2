import { ArrowDown } from "lucide-react";
import Logo from "./Logo.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";
import PrimaryButton from "./ui/PrimaryButton.jsx";
import GhostButton from "./ui/GhostButton.jsx";
import { trackPointer } from "./ui/Reveal.jsx";

export default function Hero() {
  return (
    <section
      id="home"
      onMouseMove={trackPointer}
      className="hero relative overflow-hidden bg-neutral-950 text-white px-6 md:px-10 py-28 md:py-0 min-h-screen md:h-screen flex flex-col justify-center"
    >
      {/* Background: grid lines, drifting green glow, glow that follows the pointer */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />
      <div className="animate-glow absolute -right-24 top-1/3 h-[240px] w-[240px] bg-era-green/15 blur-[70px] md:-right-40 md:top-1/4 md:h-[520px] md:w-[520px] md:bg-era-green/20 md:blur-[120px] rounded-full pointer-events-none" />
      <div className="hero-pointer absolute inset-0 pointer-events-none" />

      <div className="animate-float absolute -right-16 top-24 md:-right-10 md:top-1/2 md:-translate-y-1/2 opacity-15 md:opacity-25 pointer-events-none">
        <Logo light className="h-[260px] w-[260px] md:h-[460px] md:w-[460px] drop-shadow-[0_0_24px_rgba(134,224,0,0.25)] md:drop-shadow-[0_0_60px_rgba(134,224,0,0.35)]" />
      </div>

      <div className="relative max-w-4xl mx-auto lg:-translate-x-72">
        <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <Eyebrow dark>Integrated Marketing &amp; Creative Agency</Eyebrow>
        </div>
        <h1 className="font-display font-bold tracking-tight leading-[1.05] text-5xl sm:text-6xl md:text-7xl">
          <span className="block animate-fade-up" style={{ animationDelay: "250ms" }}>
            Marketing that
          </span>
          <span className="block animate-fade-up text-era-green" style={{ animationDelay: "400ms" }}>
            grows brands.
          </span>
        </h1>
        <p
          className="mt-6 max-w-xl text-neutral-300 text-base md:text-lg leading-relaxed animate-fade-up"
          style={{ animationDelay: "550ms" }}
        >
          Growth isn't a coincidence — it's built with purpose. We bring
          together a clear vision, a strong strategy, and creative ideas that
          make a difference, to help brands move forward and turn
          opportunities into growth.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "700ms" }}>
          <PrimaryButton href="#contact">Let's Grow Together</PrimaryButton>
          <GhostButton href="#services">See what we do</GhostButton>
        </div>
      </div>

      <a
        href="#about"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-neutral-500 hover:text-era-green transition-colors animate-fade-up"
        style={{ animationDelay: "1000ms" }}
        aria-label="Scroll to About"
      >
        <span className="tracked-label text-[10px]">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
