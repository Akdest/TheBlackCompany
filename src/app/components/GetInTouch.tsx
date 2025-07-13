"use client";

import Image from "next/image";
import React from "react";

export default function GetInTouch() {
  return (
    <section className="bg-black text-white w-full px-6 py-20 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Left block */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <div className="uppercase text-sm tracking-wide text-white/80">
            Get In Touch ↗
          </div>

          <div className="flex items-start gap-6">
            <h1 className="text-6xl lg:text-[8rem] font-extrabold leading-none">
              <span className="block">STAY</span>
              <span className="block">STYLISH</span>
            </h1>

            <div className="relative w-20 h-20 rotate-12">
              <Image
                src="/prod/prod3.jpg"
                alt="Styled Model"
                fill
                className="object-cover"
              />
            </div>

            <span className="text-5xl font-extrabold ml-4">+</span>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/70">
            Stay connected with The Row. Explore our world of luxury and elegance through our newsletter. Follow us on social media for the latest updates, exclusive offers, and more. Experience the epitome of sophistication with The Row.
          </p>
        </div>

        {/* Right image block */}
        <div className="w-full h-[400px] relative">
          <Image
            src="/prod/hoodie.jpg"
            alt="Walking Model"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Footer-style links */}
      <div className="mt-20 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 text-sm gap-y-6">
        <div className="uppercase tracking-wider text-white/60">The Row</div>

        <div className="flex flex-col gap-1 text-white/80">
          <span>Studio</span>
          <span>Contact</span>
          <span>@maisontherow</span>
        </div>

        <div className="flex flex-col gap-1 text-white/80">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>Facebook</span>
        </div>

       
      </div>
    </section>
  );
}
