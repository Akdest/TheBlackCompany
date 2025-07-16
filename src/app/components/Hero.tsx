"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const heroHeadings = [
  "THE RAW COLLECTION",
  "STITCHED IN SHADOW",
  "ELEGANCE UNLEASHED",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Scroll animation control
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroHeadings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-[100vh] mx-auto bg-black text-white overflow-hidden"
    >
      {/* The Model Image */}
      <div className="absolute right-0 top-0 h-full w-[60%]">
        <Image
          src="/bg/bg_hoodie.jpg"
          alt="The Black Company"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>

      {/* Heading Content */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/2 md:top-1/4 left-8 md:left-24 z-10"
      >
        <p className="text-lg md:text-[4rem] lg:text-[4rem] text-white/60">(2025)</p>

        <AnimatePresence mode="wait">
          <motion.h1
            key={heroHeadings[index]}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="mt-2 text-5xl md:text-[4rem] lg:text-[8rem] font-extrabold leading-tight tracking-tight"
          >
            {heroHeadings[index]}
          </motion.h1>
        </AnimatePresence>

        <p className="mt-6 text-sm md:text-base text-white/60 max-w-sm">
          Explore our captivating collections, embracing elegance in unparalleled luxury style.
        </p>
      </motion.div>

      {/* Hex Code Footer */}
      <div className="hidden md:block absolute bottom-1/8 right-1/12 text-white/40 text-sm tracking-widest z-20">
        0x54484520424C41434B20434F4D50414E59
      </div>
    </section>
  );
}
