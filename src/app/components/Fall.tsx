"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { products } from "../data/prod";

/* ============================
   Motion Variants (FIXED)
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

export default function FallCollection() {
  const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref5, inView5] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="min-h-screen bg-black text-white mx-auto px-8 lg:py-16 flex flex-col items-center gap-12">
      <div className="w-full max-w-7xl">
        {/* Year */}
        <motion.span
          ref={ref1}
          variants={fadeUp}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          className="text-white/60 text-3xl relative top-8 left-1/2 md:left-1/3"
        >
          (2025)
        </motion.span>

        {/* Heading + Description */}
        <motion.div
          ref={ref2}
          variants={fadeUp}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row justify-between items-start gap-8"
        >
          <div>
            <h1 className="text-4xl lg:text-[6rem] font-bold leading-tight">
              FALL OF <br /> COLLECTIONS
            </h1>
          </div>

          <div className="lg:pt-28 w-full lg:w-[40%]">
            <p className="text-xl text-white/80 text-right">
              The Fall Collection showcases timeless elegance and modern
              minimalism with luxurious fabrics, clean lines, and understated
              sophistication.
            </p>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Left Product */}
          <motion.div
            ref={ref3}
            variants={fadeUp}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            className="flex flex-col items-center relative"
          >
            <Link href="/pages/OurProducts">
              <Image
                src="/prod/jacket.jpg"
                alt="Olimpia Jacket"
                width={320}
                height={700}
                className="object-cover h-[500px] z-10"
              />
              <p className="mt-4 text-md text-center hover:underline z-10">
                {products[4].name}
              </p>
            </Link>

            {/* Decorative Grid */}
            <div className="hidden absolute -bottom-32 z-0 md:flex flex-col gap-1 items-center">
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`row1-${i}`}
                    className="w-4 h-4 rotate-12 bg-white/10 border border-white/30"
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`row2-${i}`}
                    className="w-4 h-4 rotate-12 bg-white/80 border border-white/30"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center Product + CTA */}
          <motion.div
            ref={ref4}
            variants={fadeUp}
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            className="flex flex-col items-center gap-10"
          >
            <Link href="/pages/OurProducts">
              <div className="relative w-56 h-56 flex items-center justify-center group">
                <svg
                  className="absolute w-full h-full transition-transform duration-700 group-hover:rotate-180"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    />
                  </defs>
                  <text fontSize="6" fill="white" letterSpacing="2">
                    <textPath href="#circlePath">
                      DISCOVER • DISCOVER • DISCOVER •
                    </textPath>
                  </text>
                </svg>

                <ArrowUpRight className="w-20 h-20 text-white z-10 transition-all duration-300 hover:scale-110 hover:rotate-45" />
              </div>
            </Link>

            <Link href="/pages/OurProducts">
              <Image
                src="/prod/sneakers.jpg"
                alt="Sneakers"
                width={320}
                height={720}
                className="object-cover h-[500px]"
              />
              <p className="mt-4 text-md text-center hover:underline">
                {products[9].name}
              </p>
            </Link>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div
            ref={ref5}
            variants={fadeUp}
            initial="hidden"
            animate={inView5 ? "visible" : "hidden"}
            className="flex flex-col items-end gap-4 relative"
          >
            <div className="absolute top-0 right-1/4 w-[400px] h-[4px] bg-[#c7c7c7] opacity-90" />
            <div className="absolute top-0 right-1/2 h-[96px] w-[4px] bg-[#c7c7c7] opacity-70" />

            <Image
              src="/prod/model_fall.jpg"
              alt="Hero Look"
              width={400}
              height={700}
              className="object-cover mt-24 h-[500px] md:h-[700px] grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
