// SustainabilityShowcase.tsx
"use client";

import React from "react";
import Image from "next/image";

export default function Feature() {
  return (
   <section className="relative w-full text-white overflow-hidden min-h-screen py-20 px-6 md:px-12">
  {/* Background image only inside section */}
  <div className="fixed inset-0 -z-10">
    <Image
      src="/bg/blk_model1.jpg"
      alt="Background"
      fill
      style={{ objectFit: "cover" }}
      className="opacity-10"
    />
  </div>

      
      {/* Content Rows */}
      <div className="space-y-24">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
            <p className="text-white/70 font-bold text-[2rem]">
              Using Efficient Technology And Sustainable Materials To Reduce
              Emissions And Enhance Performance
            </p>
          </div>
          <div className="lg:w-1/2 relative h-[150px] md:h-[250px] w-full">
            <Image
              src="/bg/blk_model1.jpg"
              alt="Technology"
              fill
              style={{ objectFit: "cover" }}
              className="border border-white/10"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
            <p className="text-white/70 font-bold text-[2rem]">
              Each Of Our Fireplaces Is Designed To Minimize Environmental Impact
            </p>
          </div>
          <div className="lg:w-1/2 relative h-[150px] md:h-[250px] w-full">
            <Image
              src="/bg/blk_model1.jpg"
              alt="Environment"
              fill
              style={{ objectFit: "cover" }}
              className="border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
