import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";
import PrimaryButton from "./ui/PrimaryButton.jsx";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Toggles the header's solid background once the page scrolls
  // past a small threshold, so it starts fully transparent at the top.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Watches each section and marks its nav link active when that
  // section crosses the middle of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const href = `#${entry.target.id}`;
            setActive(href);
            window.history.replaceState(null, "", href);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Header is "light mode" (transparent bg, light text) only while
  // unscrolled and the mobile menu is closed.
  const isLight = !scrolled && !menuOpen;

  const linkClasses = (href, base) =>
    `tracked-label transition-colors ${base} ${
      active === href
        ? isLight
          ? "font-bold underline text-white"
          : "font-bold underline text-neutral-950"
        : isLight
          ? "text-white/70 hover:text-white"
          : "text-neutral-500 hover:text-neutral-950"
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-white border-b border-neutral-200"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Logo light={isLight} className="h-9 w-9" />
          <span
            className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${
              isLight ? "text-white" : "text-neutral-950"
            }`}
          >
            Growth Era
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={linkClasses(l.href, "text-xs")}>
              {l.label}
            </a>
          ))}
          <PrimaryButton href="#contact">Start a Project</PrimaryButton>
        </nav>

        <button
          className={`md:hidden transition-colors duration-300 ${
            isLight ? "text-white" : "text-neutral-950"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={linkClasses(l.href, "text-sm")}
            >
              {l.label}
            </a>
          ))}
          <PrimaryButton href="#contact" onClick={() => setMenuOpen(false)}>
            Start a Project
          </PrimaryButton>
        </div>
      )}
    </header>
  );
}
