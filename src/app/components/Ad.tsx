"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const adTexts = [
  {
    id: 0,
    headline: "MIDNIGHT MADNESS SALE",
    subtext: "Up to 50% off on dark essentials",
  },
  {
    id: 1,
    headline: "THE FALL COLLECTION DROPS",
    subtext: "Street-born. Shadow-wrapped. Yours.",
  },
  {
    id: 2,
    headline: "BLACK FRIDAY UNLEASHED",
    subtext: "This chaos is limited edition.",
  },
];

export default function Ad() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % adTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full h-[100vh] text-white overflow-hidden bg-fixed bg-center bg-cover grayscale"
      style={{
        backgroundImage: "url('/bg/accessories.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Giant Rotated Rectangle Right Center */}
     <svg
  className="absolute right-[-300px] top-1/2 -translate-y-1/2 w-[900px] h-[900px] hidden lg:block  z-0"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  style={{ transform: "rotate(45deg)" }}
>
  <rect
    x="0"
    y="0"
    width="100"
    height="100"
    stroke="white"
    strokeWidth="4"
    rx="0"
    ry="0"
  />
</svg>


      {/* Faded Background Text */}
      <div className="absolute top-10 left-6 z-0 text-white/40 text-[10rem] font-extrabold uppercase tracking-widest select-none pointer-events-none hidden md:block">
        #FW25
      </div>
      <div className="absolute bottom-12 right-8 z-0 text-white/40 text-[8rem] font-bold uppercase tracking-wider select-none pointer-events-none hidden md:block">
        DROP
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={adTexts[index].id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-center w-full gap-12"
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold uppercase leading-tight tracking-tight drop-shadow-md max-w-full lg:max-w-[45%] text-center lg:text-left">
              {adTexts[index].headline}
            </h1>

            {/* Subtext + CTA */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-right max-w-full lg:max-w-[50%]">
              <p className="text-2xl md:text-2xl lg:text-[2.5rem] text-white/90 mb-4">
                {adTexts[index].subtext}
              </p>
              <button className="group inline-flex items-center gap-2 text-md  font-semibold  px-6 py-3 hover:underline transition-all duration-300">
                Shop Now
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
