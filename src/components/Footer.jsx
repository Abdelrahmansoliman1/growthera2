import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-800 px-6 md:px-10 py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Logo light className="h-6 w-6" />
          <span className="tracked-label text-xs text-neutral-400">Growth Era</span>
        </div>
        <span className="tracked-label text-[10px] text-neutral-500">
          © 2026 Growth Era. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
