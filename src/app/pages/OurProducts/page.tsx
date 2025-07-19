"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/app/data/prod";
import Navbar from "@/app/components/Navbar";

const categories = Array.from(new Set(products.map((p) => p.category)));
const seasons = Array.from(new Set(products.map((p) => p.season)));

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [showNewArrivalsOnly, setShowNewArrivalsOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(Math.max(...products.map((p) => p.price)));
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name-asc" | null>(null);

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const isProductInCart = (product: typeof products[0]) => {
    return cart.some((item) => item.id === product.id);
  };

  const addToCart = (product: typeof products[0]) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (product: typeof products[0]) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  let filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedSeason && product.season !== selectedSeason) return false;
    if (showNewArrivalsOnly && !product.isNewArrival) return false;
    if (product.price > maxPrice) return false;
    return true;
  });

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-black text-white px-6 py-16 overflow-hidden">
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
          <h1 className="text-4xl font-bold uppercase tracking-wide border-b border-white/20 py-6">
            Our Products
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 mb-8 items-center bg-white/20 backdrop-blur:md p-6">
            {/* Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold uppercase text-white/70">Category:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 border border-white/30 hover:border-white transition ${
                  selectedCategory === null ? "bg-white text-black" : "text-white/70"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 border border-white/30 hover:border-white transition ${
                    selectedCategory === cat ? "bg-white text-black" : "text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Season */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold uppercase text-white/70">Season:</span>
              <button
                onClick={() => setSelectedSeason(null)}
                className={`px-3 py-1 border border-white/30 hover:border-white transition ${
                  selectedSeason === null ? "bg-white text-black" : "text-white/70"
                }`}
              >
                All
              </button>
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-3 py-1 border border-white/30 hover:border-white transition ${
                    selectedSeason === season ? "bg-white text-black" : "text-white/70"
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>

            {/* New Arrivals Toggle */}
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showNewArrivalsOnly}
                  onChange={() => setShowNewArrivalsOnly((prev) => !prev)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 shadow-inner transition-colors duration-300 
                  ${showNewArrivalsOnly ? "bg-white" : "bg-white/20 backdrop-blur:md"}
                  hover:bg-white/70`}
                />
                <div
                  className={`dot absolute left-1 top-1 w-4 h-4 shadow-md transition-transform duration-300
                  ${showNewArrivalsOnly ? "translate-x-6 bg-black" : "translate-x-0 bg-white"}`}
                />
                <span className="ml-3 text-white/70 font-semibold uppercase">New Arrivals</span>
              </label>
            </div>
          </div>

          {/* Price and Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 gap-6 max-w-4xl mx-auto mb-8 bg-white/20 backdrop-blur:md p-2">
            <div className="flex items-center gap-4 max-w-md">
              <label htmlFor="priceRange" className="font-semibold uppercase text-white/70 whitespace-nowrap">
                Max Price: ₹{maxPrice.toLocaleString()}
              </label>
              <input
                id="priceRange"
                type="range"
                min={Math.min(...products.map((p) => p.price))}
                max={Math.max(...products.map((p) => p.price))}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full cursor-pointer accent-white"
              />
            </div>

            <div className="flex items-center gap-4 max-w-xs">
              <label htmlFor="sortBy" className="font-semibold uppercase text-white/70 whitespace-nowrap">
                Sort By:
              </label>
              <select
                id="sortBy"
                value={sortBy || ""}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black border border-white/30 text-white py-1 px-3 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                <option value="">None</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/5 border border-white/10 p-4 backdrop-blur-lg hover:scale-[1.02] transition-all shadow-md"
                >
                  <div className="relative w-full h-72 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="mt-4 space-y-1">
                    <h2 className="text-xl font-semibold truncate">{product.name}</h2>
                    <p className="text-white/60 text-sm">{product.category}</p>
                    <p className="text-white text-lg font-mono">
                      ₹{product.price.toLocaleString()}
                    </p>

                    <div className="flex gap-4 mt-2">
                      <Link
                        href={`/pages/Prod/${product.slug}`}
                        className="inline-block px-4 py-2 border border-white/20 hover:border-white text-sm hover:bg-white hover:text-black transition-all"
                      >
                        View Product
                      </Link>

                      <button
                        onClick={() =>
                          isProductInCart(product)
                            ? removeFromCart(product)
                            : addToCart(product)
                        }
                        className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                          isProductInCart(product)
                            ? "bg-white text-black border border-white"
                            : " text-white border border-white/20 hover:border-white"
                        }`}
                      >
                        {isProductInCart(product) ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/50 mt-20">
              No products match your filters. Try adjusting them!
            </p>
          )}
        </section>
      </main>
    </>
  );
}
