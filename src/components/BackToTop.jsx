import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`cut fixed bottom-6 right-6 z-50 bg-era-green text-neutral-950 p-3 shadow-lg hover:bg-neutral-950 hover:text-era-green transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUpRight size={18} strokeWidth={2.5} />
    </button>
  );
}
