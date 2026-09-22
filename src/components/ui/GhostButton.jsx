export default function GhostButton({ children, href }) {
  return (
    <a
      href={href}
      className="cut tracked-label text-xs inline-flex items-center gap-2 border border-white/25 text-white px-6 py-3 hover:border-era-green hover:text-era-green transition-colors duration-200"
    >
      {children}
    </a>
  );
}
