
// ✅ /app/pages/MyCart.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

export default function MyCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
};

  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleDelete = (slug: string, size: string) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug || item.size !== size));
  };

  const updateQuantity = (slug: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <title>My Cart | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Navbar />

      <main className="relative min-h-screen bg-black text-white px-4 md:px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg/blk_model1.jpg"
            alt="Cart Background"
            fill
            className="object-cover object-center opacity-10"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto space-y-14 mt-6 md:mt-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide border-b border-white/10 pb-4">
            My Cart
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-center text-white/70 text-xl mt-20">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, i) => (
                  <div
                    key={`${item.slug}-${item.size}-${i}`}
                    className="relative bg-white/10 backdrop-blur-xl border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6"
                  >
                    <button
                      onClick={() => handleDelete(item.slug, item.size)}
                      className="absolute top-3 right-3 text-white/40 hover:text-white block sm:hidden"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="relative w-full sm:w-[100px] h-[100px] sm:h-[120px] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 w-full text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
                      <p className="text-white/60 text-sm">₹{item.price.toLocaleString()}</p>
                      <p className="text-sm text-white/50">Size: {item.size}</p>
                      <div className="flex items-center gap-3 justify-center sm:justify-start mt-2">
                        <button
                          onClick={() => updateQuantity(item.slug, item.size, -1)}
                          className="w-8 h-8  border border-white flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.slug, item.size, 1)}
                          className="w-8 h-8 border border-white flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(item.slug, item.size)}
                      className="text-white/40 hover:text-white hidden sm:block"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 sm:p-8 space-y-6 h-fit lg:sticky top-24">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2 text-white/80 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="italic">Free</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between text-base sm:text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <Link href="/pages/Checkout">
                  <div className="w-full text-center bg-black text-white py-3 font-semibold hover:bg-white hover:text-black transition-all duration-200 uppercase">
                    Checkout
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
