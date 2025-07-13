"use client";
import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
    <section className="relative w-full h-[100vh] bg-black text-white overflow-hidden">
      {/* The Model Image */}
      <div className="absolute right-0 top-0 h-full w-[60%]">
        <Image
          src="/bg/bg_hoodie.jpg" // Replace with your actual image
          alt="The Black Company "
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>

      {/* Heading Content Overlaid */}
      <div className="absolute top-1/2 md:top-1/4 left-8 md:left-24 z-10">
        <p className="text-lg md:text-[4rem] lg:text-[4rem] text-white/60">(2025)</p>

        <h1 className="mt-2 text-5xl md:text-[4rem] lg:text-[8rem] font-extrabold leading-tight tracking-tight">
          THE RAW<br />COLLECTION
        </h1>

        <p className="mt-6 text-sm md:text-base text-white/60 max-w-sm">
          Explore our captivating collections, embracing elegance in unparalleled luxury style.
        </p>
      </div>
      {/* Hex Code Footer - Bottom Right */}
<div className="hidden md:block absolute bottom-1/8 right-1/12 text-white/40 text-sm tracking-widest z-20">
  0x54484520424C41434B20434F4D50414E59
</div>

    </section>
    </>
  );
}
