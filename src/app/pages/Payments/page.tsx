"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { products } from "@/app/data/prod"; // your actual product list

export default function Payments() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Get cart from localStorage (stored as string[])
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Calculate total using matching products
    

   const cartItems = storedCart.map((id: string) => {
  const product = products.find((p) => p.id === parseInt(id));
  return product ? product.price : 0;
});

const totalPrice = cartItems.reduce((acc: number, price: number) => acc + price, 0);

    setTotal(totalPrice);
  }, []);

  return (
    <>
      <title>Payment | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Navbar />

      <main className="relative min-h-screen text-white px-6 py-16 overflow-hidden">
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

        <h1 className="text-3xl font-semibold text-center py-6 uppercase">
          Complete Your Payment
        </h1>

        {/* Payment Form */}
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 p-10 shadow-[0_0_40px_rgba(255,255,255,0.1)] space-y-8">
          <form className="space-y-6">
            <div>
              <label className="block text-white/60 text-sm mb-2">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="Ayush Raj"
                className="w-full p-3 bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 bg-black/30 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">
                  Expiry
                </label>
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

            {/* Pay Button with Total */}
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-bold tracking-wide rounded hover:bg-gray-200 transition-all"
            >
              Pay ₹{total.toLocaleString()}
            </button>
          </form>

          {/* Total Summary (Optional display) */}
          <div className="pt-4 border-t border-white/20 mt-4 flex justify-between text-lg font-semibold text-white">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </main>
    </>
  );
}
