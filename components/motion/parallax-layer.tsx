"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { ImageAsset } from "@/content/assets";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  asset: ImageAsset;
  className?: string;
}

/**
 * docs/motion-system.md §3.5 `parallax-layer` — the site's only scroll-linked
 * continuous motion. A decorative background image layer only, at ~40% of
 * foreground scroll speed — never applied to foreground content or text
 * (§5's depth rule). Limited to exactly one instance per page; this project
 * uses it once, on the Hero background (components/sections/hero.tsx), its
 * documented use case.
 */
export function ParallaxLayer({ asset, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <div ref={ref} aria-hidden="true" className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
        <Image
          src={asset.path}
          alt=""
          width={asset.width}
          height={asset.height}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
