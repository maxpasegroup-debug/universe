"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  speed: number;
};

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let alive = true;

    const stars: Star[] = [];
    const maxStars = 120;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const devicePixelRatio = window.devicePixelRatio || 1;

    const seed = () => {
      stars.length = 0;
      for (let i = 0; i < maxStars; i++) {
        stars.push({
          x: Math.random() * (canvas.clientWidth || window.innerWidth),
          y: Math.random() * (canvas.clientHeight || window.innerHeight),
          z: Math.random(),
          speed: 0.08 + Math.random() * 0.35,
        });
      }
    };

    const draw = () => {
      if (!alive) return;
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      const t = performance.now() / 1000;

      ctx.clearRect(0, 0, width, height);

      // Soft nebula glow.
      const g = ctx.createRadialGradient(width * 0.2, height * 0.15, 0, width * 0.2, height * 0.15, width * 0.8);
      g.addColorStop(0, "rgba(255, 215, 0, 0.07)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      for (const s of stars) {
        s.y += (s.speed * (0.2 + s.z)) * 0.35;
        s.x += Math.cos(t * (0.25 + s.z)) * (0.02 + s.z * 0.02);
        if (s.y > height + 10) {
          s.y = -10;
          s.x = Math.random() * width;
          s.z = Math.random();
          s.speed = 0.08 + Math.random() * 0.35;
        }

        const r = 0.6 + s.z * 1.1;
        const alpha = 0.18 + s.z * 0.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        // Tiny glow.
        ctx.shadowColor = `rgba(255, 215, 0, ${Math.min(0.35, alpha)})`;
        ctx.shadowBlur = 8;
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = prefersReducedMotion ? 0 : window.requestAnimationFrame(draw);
    };

    resize();
    seed();
    const onResize = () => {
      resize();
      seed();
    };

    window.addEventListener("resize", onResize);
    raf = prefersReducedMotion ? 0 : window.requestAnimationFrame(draw);
    if (prefersReducedMotion) draw();

    return () => {
      alive = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

