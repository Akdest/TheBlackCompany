"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { products } from "../data/prod";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function WinterCollection() {
  const [ref1, inView1] = useInView({ threshold: 0.2 });
  const [ref2, inView2] = useInView({ threshold: 0.2 });
  const [ref3, inView3] = useInView({ threshold: 0.2 });
  const [ref4, inView4] = useInView({ threshold: 0.2 });

  return (
    <section className="min-h-screen bg-black text-white px-8 py-16 flex flex-col items-center gap-12">
      <div className="w-full max-w-7xl">
        <motion.div
          ref={ref1}
          variants={fadeUp}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          className="flex flex-row justify-between items-start gap-8"
        >
          <div>
            <h1 className="text-4xl lg:text-[6rem] font-bold leading-tight">
              WINTER <br /> COLLECTIONS
            </h1>
          </div>

          <Link href="/pages/OurProducts">
            <div className="relative w-24 h-24 md:w-36 md:h-36 lg:w-56 lg:h-56 flex items-center justify-center group">
              <svg
                className="absolute w-full h-full transition-transform duration-700 group-hover:rotate-180"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  />
                </defs>
                <text fontSize="6" fill="white" letterSpacing="2">
                  <textPath href="#circlePath" startOffset="0">
                    WINTER • WINTER • WINTER • WINTER
                  </textPath>
                </text>
              </svg>
              <ArrowUpRight className="w-12 h-12 md:w-20 md:h-20 text-white z-10 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-45" />
            </div>
          </Link>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <motion.div
            ref={ref2}
            variants={fadeUp}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            className="flex flex-col items-center relative"
          >
            <Link href="/pages/OurProducts">
              <Image
                src="/prod/hoodie.jpg"
                alt="Olimpia Jacket"
                width={320}
                height={700}
                className="object-cover h-[500px] md:h-[500px] z-10"
              />
              <p className="mt-4 text-sm text-center hover:underline z-10">
                {products[1].name}
              </p>
            </Link>
            <div className="hidden absolute -bottom-32 z-0 md:flex flex-col gap-1 items-center">
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`row1-diamond-${i}`}
                    className="w-4 h-4 rotate-15 bg-white/10 border border-white/30"
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`row2-diamond-${i}`}
                    className="w-4 h-4 rotate-15 bg-white/80 border border-white/30"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref3}
            variants={fadeUp}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            className="flex flex-col items-center gap-10"
          >
            <Link href="/pages/OurProducts">
              <Image
                src="/prod/trouser.jpg"
                alt="Balthus Polo"
                width={320}
                height={720}
                className="object-cover h-[500px] md:h-[500px]"
              />
              <p className="mt-4 text-sm text-center hover:underline">
                {products[7].name}
              </p>
            </Link>
          </motion.div>

          <motion.div
            ref={ref4}
            variants={fadeUp}
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            className="flex flex-col items-end gap-4"
          >
            <Image
              src="/prod/winter_model.jpg"
              alt="Hero Look"
              width={400}
              height={700}
              className="object-cover md:h-[700px] h-[500px] grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}