import { ArrowUpRight } from "lucide-react";

export default function PrimaryButton({ children, href, onClick, type = "button" }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      className="cut tracked-label text-xs inline-flex items-center gap-2 bg-era-green text-neutral-950 px-6 py-3 font-semibold hover:bg-white transition-colors duration-200"
    >
      {children}
      <ArrowUpRight size={14} strokeWidth={2.5} />
    </Comp>
  );
}
