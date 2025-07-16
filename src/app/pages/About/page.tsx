"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function AboutPage() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen w-full  text-white px-6 md:px-12 py-20 overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        {/* <Image
          src="/bg/w_map.jpg"
          alt="About Background"
          fill
          className="object-cover opacity-10 grayscale"
          priority
        />
        <div className="backdrop-blur-2xl z-0"/> */}
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto space-y-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider uppercase">
            About <span className="text-white/60">The Black Company</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Born from the underground, we are more than a label—we are a lifestyle. Crafted in the shadows, our pieces are statements of rebellion, identity, and minimal brutality. 
          </p>
        </div>

        {/* Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Image
              src="/bg/w_map2.jpg"
              alt="Vision"
              width={800}
              height={600}
              className="object-cover w-full h-full border border-white/10 grayscale"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold uppercase tracking-tight">Our Vision</h2>
            <p className="text-white/70 text-lg">
              We exist to empower the bold. With every drop, we redefine modern urban fashion through clean silhouettes, monochrome aesthetics, and a fierce identity that cannot be ignored.
            </p>
            <p className="text-white/60 text-base">
              Our collections merge premium craftsmanship with street-bred attitude—built for those who move through life like a shadow: quiet, sharp, unstoppable.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center">
          {[
            {
              title: "Dark Aesthetic",
              desc: "Style rooted in mystery. We don’t follow trends—we forge identity.",
            },
            {
              title: "Sustainable Mindset",
              desc: "All our pieces are crafted with sustainability at the core, from design to production.",
            },
            {
              title: "Fearless Functionality",
              desc: "Performance meets design—each piece built to move, live, and last.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 p-6  border border-white/10 backdrop-blur-lg hover:scale-[1.02] transition-all"
            >
              <h3 className="text-2xl font-semibold mb-4 uppercase text-white">
                {item.title}
              </h3>
              <p className="text-white/60 text-base">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Join The Movement</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Become part of the blackout. Drop your email, follow the signal, and stay ahead of the next wave.
          </p>
          <Link
            href="/pages/CreateAccount"
            className="inline-block px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all uppercase font-semibold tracking-wider"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}
