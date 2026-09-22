export default function Logo({ light = false, className = "h-9 w-9" }) {
  return (
    <img
      src={light ? "/logo-light.png" : "/logo-dark.png"}
      alt="Growth Era"
      className={className}
    />
  );
}
