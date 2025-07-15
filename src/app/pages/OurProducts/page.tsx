"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/app/data/prod"; 
import Navbar from "@/app/components/Navbar";

export default function ProductsPage() {
  return (
    <>
    <Navbar />
    <main className="relative min-h-screen bg-black text-white px-6 py-16  overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg/blk_model1.jpg"
          alt="Products Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <section className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold uppercase tracking-wide border-b border-white/20 pb-4">
          Our Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/5 border border-white/10 p-4 backdrop-blur-lg hover:scale-[1.02] transition-all shadow-md"
            >
              <div className="relative w-full h-72  overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h2 className="text-xl font-semibold truncate">{product.name}</h2>
                <p className="text-white/60 text-sm">{product.category}</p>
                <p className="text-white text-lg font-mono">
                  ₹{product.price.toLocaleString()}
                </p>
                <Link
                  href={`../pages//Prod/${product.slug}`}
                  className="inline-block mt-2 px-4 py-2 border border-white/20 hover:border-white text-sm hover:bg-white hover:text-black transition-all"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}