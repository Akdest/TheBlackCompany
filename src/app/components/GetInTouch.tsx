"use client";

import Image from "next/image";
import React from "react";
import ExclusiveStrip from "./Strip";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <>
    <section className="relative bg-black text-white w-full px-6 py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute right-0 top-0 h-full w-full z-0 opacity-20">
        <Image
          src="/bg/blk_model1.jpg"
          alt="Walking Model"
          fill
          className="object-cover object-right"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Left block */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <Link href="/pages/GetInTouch">
          <div className="uppercase text-sm tracking-wide text-white/60 hover:text-white hover:underline">
            Get In Touch ↗
          </div>
          </Link>
          <div className="flex items-start gap-6">
            <h1 className="text-6xl lg:text-[8rem] font-extrabold leading-none">
              <span className="block">STAY</span>
              <span className="block">&nbsp;&nbsp;STYLISH</span>
            </h1>

            <div className="relative -left-1/3 -top-6 w-full h-40 rotate-12">
              <Image
                src="/prod/prod3.jpg"
                alt="Styled Model"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/70">
            Stay connected with The Black Company. Explore our world of luxury and elegance through our newsletter. Follow us on social media for the latest updates, exclusive offers, and more. Experience the epitome of sophistication with The Black Company.
          </p>
        </div>

        {/* Description with vertical bar (no image now) */}
        <div className="flex flex-col gap-4 z-10">
          <div className="flex items-start gap-3">
            <div className="w-[3px] h-full border-l-2 border-white bg-white/80" />
            <p className="text-sm text-white/70 leading-relaxed border-l-2 border-white px-4">
              Effortlessly cool. Boldly minimal. This look redefines street elegance for the season ahead.
              Draped in timeless monochrome, it merges raw attitude with refined silhouettes.
              Every thread whispers intention — clean lines, confident form, and a quiet rebellion against the ordinary.
              Made for those who don&apos;t just follow fashion — they shape it.
            </p>
          </div>
        </div>
      </div>

   {/* Footer-style links: brand left, links right */}
<div className="relative z-10 mt-20 max-w-7xl mx-auto flex justify-between items-start text-md">
  
  {/* Left: Brand name */}
  <div className="uppercase tracking-wider text-white/60">
    - The Black Company
  </div>

  {/* Right: Links */}
  <div className="flex flex-col md:flex-row gap-8 text-white/80 text-left">
    {/* Group 1 */}
    <div className="flex flex-col gap-1">
      <span>Studio</span>
      <span>Contact</span>
    </div>

    {/* Group 2 */}
    <div className="flex flex-col gap-1">
      <span>Instagram</span>
      <span>Twitter</span>
      <span>Facebook</span>
    </div>
  </div>
</div>

    </section>
    <ExclusiveStrip/>
    </>
  );
}
