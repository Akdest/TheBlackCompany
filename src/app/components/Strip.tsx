"use client";

import React from "react";

export default function ExclusiveStrip() {
  return (
    <div className="relative w-full h-32 overflow-hidden bg-transparent">
      <div
        className="absolute -left-1/2 -top-8 w-[200%] h-32 -rotate-7 bg-[#f7f7f7] flex items-center justify-center"
        style={{ transformOrigin: "center" }}
      >
        <div className="whitespace-nowrap animate-marquee text-black text-2xl font-bold uppercase tracking-wider">
          {Array(20)
            .fill("EXCLUSIVE")
            .join("  •  ")}
        </div>
      </div>
    </div>
  );
}