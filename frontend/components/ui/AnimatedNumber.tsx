"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  format?: (value: number) => string;
  durationMs?: number;
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Counts from the previously shown value to `value`, so live updates animate too. */
export function AnimatedNumber({ value, format = (n) => Math.round(n).toLocaleString("tr-TR"), durationMs = 1200 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const progress = Math.min(1, (now - start) / durationMs);
      const current = from + (value - from) * easeOutCubic(progress);
      fromRef.current = current;
      setDisplay(current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return <span className="tabular-nums">{format(display)}</span>;
}
