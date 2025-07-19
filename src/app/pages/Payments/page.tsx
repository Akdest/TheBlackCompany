
"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
export default function Payments() {
  return (
    <>
      <title>Payment | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Navbar />

      <main className="relative min-h-screen  text-white px-6 py-16  overflow-hidden">
        {/* 🔮 Background */}
        <div className="absolute inset-0 -z-10">
         <Image
            src="/bg/blk_model1.jpg"
            alt="Payment Background"
            fill
            className="object-cover object-center opacity-10"
            priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
       
          <h1 className="text-3xl font-semibold text-center py-6 uppercase">Complete Your Payment</h1>
          
          {/* Payment Form */}

        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 p-10  shadow-[0_0_40px_rgba(255,255,255,0.1)] space-y-8">
          

          <form className="space-y-6">
            <div>
              <label className="block text-white/60 text-sm mb-2">Name on Card</label>
              <input
                type="text"
                placeholder="Ayush Raj"
                className="w-full p-3 bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-3 bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">CVV</label>
                <input
                  type="password"
                  placeholder="123"
                  className="w-full p-3 bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-bold tracking-wide rounded hover:bg-gray-200 transition-all"
            >
              Pay ₹12,495
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
