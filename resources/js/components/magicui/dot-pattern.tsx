"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useId, useRef, useState, useMemo } from "react";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
  maxDots?: number;
  [key: string]: unknown;
}

export function DotPattern({
                             width = 32,        // naik dari 16 → 32 (agar lebih jarang)
                             height = 32,
                             x = 0,
                             y = 0,
                             cx = 1,
                             cy = 1,
                             cr = 1,
                             className,
                             glow = false,
                             maxDots = 300,     // batasi total dot
                             ...props
                           }: DotPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const dots = useMemo(() => {
    const cols = Math.ceil(dimensions.width / width);
    const rows = Math.ceil(dimensions.height / height);
    const total = Math.min(cols * rows, maxDots);

    return Array.from({ length: total }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 2,
      };
    });
  }, [dimensions, width, height, cx, cy, x, y, maxDots]);

  return (
      <svg
          ref={containerRef}
          aria-hidden="true"
          className={cn(
              "pointer-events-none absolute inset-0 h-full w-full",
              className,
          )}
          {...props}
      >
        <defs>
          <radialGradient id={`${id}-gradient`}>
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {dots.map((dot, index) => (
            <motion.circle
                key={`${dot.x}-${dot.y}-${index}`}
                cx={dot.x}
                cy={dot.y}
                r={cr}
                fill={glow ? `url(#${id}-gradient)` : "currentColor"}
                className="text-neutral-400/80"
                initial={glow && !shouldReduceMotion ? { opacity: 0.3, scale: 1 } : {}}
                animate={
                  glow && !shouldReduceMotion
                      ? { opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }
                      : {}
                }
                transition={
                  glow && !shouldReduceMotion
                      ? {
                        duration: dot.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: dot.delay,
                        ease: "easeInOut",
                      }
                      : {}
                }
            />
        ))}
      </svg>
  );
}
