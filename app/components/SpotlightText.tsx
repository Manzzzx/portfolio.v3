"use client";
import React from "react";
import { Spotlight } from "./ui/spotlight-new";
import { useEffect, useState } from "react";

export function SpotlightText() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center antialiased relative bg-transparent">
      {!isMobile && (
        <Spotlight
          width={400}
          height={900}
          smallWidth={190}
          translateY={-150}
          xOffset={30}
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 55%, .015) 60%, transparent 100%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .008) 0, hsla(210, 100%, 55%, .005) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .003) 0, hsla(210, 100%, 45%, .002) 80%, transparent 100%)"
        />
      )}
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-0 md:pt-0 mt-[-6rem]">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-40 to-neutral-200 bg-opacity-50">
          Hi, I&apos;m Manzzx
        </h1>
        <p className="mt-4 font-normal text-base text-blue-200 max-w-lg text-center mx-auto">
          <i>Vibe Coder</i>
        </p>
      </div>
    </div>
  );
}
