import { useEffect, useRef, useState } from "react";

// True once the element has scrolled into view (stays true after that).
export function useInView(options = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

// Fades and slides its content up the first time it scrolls into view.
// Once the entrance finishes it switches to quick transitions with no delay,
// so hover effects respond immediately.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const [ref, inView] = useInView();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setSettled(true), delay + 850);
    return () => clearTimeout(timer);
  }, [inView, delay]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${settled ? "is-settled" : ""} ${className}`}
      style={{ transitionDelay: settled ? "0ms" : `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Lets a card's ".spotlight" glow follow the pointer.
export function trackPointer(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}
