import { useEffect, useState } from "react";

export function useScroll(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setY(sy);
      setScrolled(sy > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrolled, y };
}
