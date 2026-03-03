import { useEffect, useState } from "react";

export default function AnimatedCounter({ value = 0, duration = 1200, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    let startTime = 0;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const next = Math.floor(progress * value);
      setDisplay(next);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

