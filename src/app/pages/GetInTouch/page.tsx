// /pages/GetInTouch.tsx
"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function GetInTouch() {
  return (
    <>
    <Navbar/>
    <section className="relative min-h-screen bg-black text-white px-6 md:px-16 py-24 overflow-hidden">
      {/* Background Image (optional mood layer) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg/blk_model1.jpg"
          alt="Contact Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <div className="max-w-5xl mx-auto space-y-12 text-white/90">
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight leading-tight text-center">
          Get In Touch
        </h1>

        <p className="text-center max-w-3xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed">
          Whether you're seeking custom collaborations, press inquiries, or just feel the pull of the shadows — we&apos;re always ready to connect. The Black Company thrives on conversations that challenge convention and create culture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm md:text-base tracking-wide">
          {/* Location */}
          <div className="space-y-2">
            <h3 className="uppercase text-white font-semibold">Visit Us</h3>
            <p className="text-white/70">
              The Black Company HQ<br />
              13th Floor, Obsidian Tower<br />
              Sector X, Neon District<br />
              New Delhi, IN 110001
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="uppercase text-white font-semibold">Reach Out</h3>
            <p className="text-white/70">
              Phone: +91 98765 43210<br />
              Email: contact@theblackco.in<br />
              Support: support@theblackco.in
            </p>
          </div>

          {/* Hours */}
          <div className="space-y-2">
            <h3 className="uppercase text-white font-semibold">Open Hours</h3>
            <p className="text-white/70">
              Mon – Fri: 10:00 AM – 7:00 PM<br />
              Sat: 11:00 AM – 4:00 PM<br />
              Sundays: Resting in shadows.
            </p>
          </div>
        </div>

        {/* Optional closing line */}
        <p className="text-center text-white/50 italic pt-12">
          We don&apos;t follow trends. We start them. Let&apos;s talk.
        </p>
      </div>
    </section>
    <Footer/>
    </>
  );
}
