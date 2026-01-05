"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ============================
   Motion Variant (FIXED)
   ============================ */
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0, 0, 0.58, 1], // ✅ TS-safe easeOut
    },
  },
};

export default function Feature() {
  const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative w-full text-white overflow-hidden min-h-screen py-20 px-6 md:px-12">
      {/* Background Map */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none">
        <Image
          src="/bg/w_map2.jpg"
          alt="Sustainable Map"
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* Ambient Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 border border-white/20 rounded-full blur-md z-0" />

      {/* Heading */}
      <motion.h2
        ref={ref1}
        variants={fadeUp}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        className="text-center text-3xl md:text-5xl font-extrabold tracking-wide uppercase mb-20"
      >
        Fashion With a Conscience{" "}
        <span className="text-white/60">by The Black Company</span>
      </motion.h2>

      {/* Content Blocks */}
      <div className="space-y-32 relative z-10">
        {/* Block 1 */}
        <motion.div
          ref={ref2}
          variants={fadeUp}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <p className="text-2xl md:text-3xl font-bold tracking-wide">
              Sustainable Isn&apos;t Optional
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Every thread we stitch honors the earth. We design with eco-conscious
              fabrics, low-impact dyes, and zero compromise on style. Dark looks,
              clean conscience.
            </p>
          </div>

          <div className="lg:w-1/2 relative h-[220px] md:h-[300px] w-full overflow-hidden shadow-xl">
            <Image
              src="/bg/feature_black.jpg"
              alt="Eco Fashion"
              fill
              className="object-cover border border-white/10 grayscale"
            />
          </div>
        </motion.div>

        {/* Block 2 */}
        <motion.div
          ref={ref3}
          variants={fadeUp}
          initial="hidden"
          animate={inView3 ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12"
        >
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <p className="text-2xl md:text-3xl font-bold tracking-wide">
              Designed for the Planet. Worn for the Streets.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              We don&apos;t follow fast fashion. We build enduring essentials —
              wrapped in recycled fibers, cruelty-free processes, and made-to-last
              tailoring.
            </p>
          </div>

          <div className="lg:w-1/2 relative h-[220px] md:h-[300px] w-full overflow-hidden shadow-xl">
            <Image
              src="/bg/street.jpg"
              alt="Sustainable Design"
              fill
              className="object-cover border border-white/10 grayscale"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
