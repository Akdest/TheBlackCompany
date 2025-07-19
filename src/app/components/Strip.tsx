"use client";

import React from "react";

export default function ExclusiveStrip() {
  return (
    <div className="relative w-full h-40 overflow-hidden bg-transparent">

  
           {/* Decorative Strip */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-white flex items-center justify-center">
        <div className="whitespace-nowrap animate-marquee text-black text-4xl lg:text-[7rem] font-bold uppercase tracking-wider">
          {Array(2).fill("EXCLUSIVE").join("  •  ")}
        </div>
      </div>
    </div>
  );
}