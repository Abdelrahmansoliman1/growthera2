export default function Eyebrow({ children, dark = false }) {
  return (
    <div
      className={`tracked-label text-xs mb-4 flex items-center gap-2 ${
        dark ? "text-era-green" : "text-neutral-400"
      }`}
    >
      <span className="inline-block h-3 w-px bg-current opacity-60" />
      {children}
    </div>
  );
}
