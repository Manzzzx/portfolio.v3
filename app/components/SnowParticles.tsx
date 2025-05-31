"use client";

import { useEffect, useRef } from "react";

type SnowParticlesProps = {
  snowflakeCount?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minWind?: number;
  maxWind?: number;
};

export default function SnowParticles({
  snowflakeCount = 10,
  colors = ["#E3F4FE", "#F8FAFC"],
  minSize = 1.5,
  maxSize = 4,
  minSpeed = 0.3,
  maxSpeed = 1.2,
  minWind = -0.5,
  maxWind = 2.0,
}: SnowParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes = Array.from({ length: snowflakeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * (maxSize - minSize) + minSize,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      wind: Math.random() * (maxWind - minWind) + minWind,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const flake of snowflakes) {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fillStyle = flake.color;
        ctx.shadowColor = flake.color;
        ctx.shadowBlur = 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function update() {
      for (const flake of snowflakes) {
        flake.y += flake.speed;
        flake.x += flake.wind;
        if (flake.y > height) {
          flake.y = -flake.r;
          flake.x = Math.random() * width;
        }
        if (flake.x < -flake.r) flake.x = width + flake.r;
        if (flake.x > width + flake.r) flake.x = -flake.r;
      }
    }

    let animationId: number;
    function animate() {
      draw();
      update();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [snowflakeCount, colors, minSize, maxSize, minSpeed, maxSpeed, minWind, maxWind]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute left-0 top-0 w-full h-full z-10"
      aria-hidden="true"
    />
  );
} 