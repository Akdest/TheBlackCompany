"use client";
import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SummerCollection() {
  return (
    <section className="min-h-screen bg-black text-white px-8 py-16 flex flex-col items-center gap-12">
      <div className="w-full max-w-7xl">
        <span className="text-white/60 text-3xl relative top-10 left-6/10">(2025)</span>

        {/* — Title and Description Flipped — */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
          {/* Right-Aligned Heading Now on Right */}
          <div className="lg:pt-28 w-full lg:w-[40%]">
            <p className="text-xl text-white/80 text-left">
              The Row&apos;s Fall Collection showcases timeless elegance and modern
              minimalism with luxurious fabrics, clean lines, and understated
              sophistication.
            </p>
          </div>

          {/* Left Heading Now on Right Side */}
          <div>
            <h1 className="text-4xl lg:text-[6rem] font-bold leading-tight text-right">
              SUMMER <br /> COLLECTIONS
            </h1>
          </div>
        </div>

        {/* — Gallery Grid Flipped — */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* — Right Column (now Leftmost) — */}
          <div className="flex flex-col items-start gap-4">
            <Image
              src="/prod/hoodie.jpg"
              alt="Hero Look"
              width={400}
              height={700}
              className="object-cover md:h-[700px] h-[500px]"
            />
          </div>

          {/* — Middle Column — */}
          <div className="flex flex-col items-center gap-10">
            {/* Circular Discover Button */}
            <Link href="#discover">
              <div className="relative w-56 h-56 flex items-center justify-center group">
                <svg
                  className="absolute w-full h-full transition-transform duration-700 group-hover:rotate-180"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50, 50
                        m -35, 0
                        a 35,35 0 1,1 70,0
                        a 35,35 0 1,1 -70,0"
                    />
                  </defs>
                  <text fontSize="6" fill="white" letterSpacing="2">
                    <textPath href="#circlePath" startOffset="0">
                      DISCOVER • DISCOVER • DISCOVER •
                    </textPath>
                  </text>
                </svg>

                <ArrowUpRight className="w-20 h-20 text-white z-10 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-45" />
              </div>
            </Link>

            {/* Middle Product */}
            <div className="flex flex-col items-center">
              <Image
                src="/prod/prod2.jpg"
                alt="Balthus Polo"
                width={320}
                height={720}
                className="object-cover h-[500px] md:h-[500px]"
              />
              <p className="mt-4 text-sm text-center">Black Shoes</p>
            </div>
          </div>

          {/* — Left Product (now Rightmost) — */}
          <div className="flex flex-col items-center relative">
            <Image
              src="/prod/tshirt.jpg"
              alt="Olimpia Jacket"
              width={320}
              height={700}
              className="object-cover h-[500px] md:h-[500px] z-10"
            />
            <p className="mt-4 text-sm text-center z-10">Black T-Shirts</p>

            {/* Decorative Diamond Grid */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
