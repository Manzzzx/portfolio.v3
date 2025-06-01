import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

// Utility function for combining class names
function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

// TextGenerateEffect Component
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scope.current) {
        animate(
          "span",
          {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
          },
          {
            duration: duration ? duration : 1,
            delay: stagger(0.08),
          }
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [scope, animate, duration, filter, delay]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-blue-100/80 opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("", className)}>
      <div className="text-blue-100/80 text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
        {renderWords()}
      </div>
    </div>
  );
};

// Complete About Me Section
export default function AboutMeSection() {
  const paragraph1 = `I'm just a college student with a weird hobby of building websites that sometimes confuse people (but that's what makes it fun, right?). As someone who is still in the "learning by breaking things" phase, I love experimenting with code until I accidentally create something completely different from my original plan - but that's what makes it unexpected and interesting!(｡♥‿♥｡)`;

  const paragraph2 = `My coding world is dominated by JavaScript and TypeScript (because who doesn’t love dynamic typing that sometimes causes panic in production? ಥ_ಥ). For building websites, I rely on the killer combination of Next.js and Tailwind CSS - because who has time to write CSS from scratch these days? Fun fact: 90% of my coding time is spent asking AI “why isn’t this working” and the remaining 10% is celebrating when it finally does! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`;

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8">
      <div className="w-full max-w-4xl p-4 sm:p-6 lg:p-8 mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-100 mb-6 text-center sm:text-left">
          About Me (つ≧▽≦)つ
        </h2>
        
        {/* First Paragraph */}
        <div className="mb-8 sm:mb-12">
          <TextGenerateEffect 
            words={paragraph1}
            duration={0.4}
            filter={true}
            delay={0}
          />
        </div>
        
        {/* Second Paragraph */}
        <div>
          <TextGenerateEffect 
            words={paragraph2}
            duration={0.4}
            filter={true}
            delay={4800}
          />
        </div>
      </div>
    </section>
  );
}