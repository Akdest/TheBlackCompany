"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface WishlistItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        const parsed = JSON.parse(storedWishlist);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        console.error("Invalid wishlist data");
        setItems([]);
      }
    }
  }, []);

  const updateWishlist = (updated: WishlistItem[]) => {
    setItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const moveToCart = (item: WishlistItem) => {
    // Simulate adding to cart
    const cartRaw = localStorage.getItem("cart");
    let cart: WishlistItem[] = [];

    try {
      if (cartRaw) {
        const parsed = JSON.parse(cartRaw);
        if (Array.isArray(parsed)) {
          cart = parsed;
        }
      }
    } catch {
      cart = [];
    }

    const exists = cart.find((p) => p.slug === item.slug && p.size === item.size);
    if (exists) {
      cart = cart.map((p) =>
        p.slug === item.slug && p.size === item.size
          ? { ...p, quantity: p.quantity + item.quantity }
          : p
      );
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Remove from wishlist
    const updatedWishlist = items.filter(
      (i) => !(i.slug === item.slug && i.size === item.size)
    );
    updateWishlist(updatedWishlist);
  };

  const removeItem = (item: WishlistItem) => {
    const updatedWishlist = items.filter(
      (i) => !(i.slug === item.slug && i.size === item.size)
    );
    updateWishlist(updatedWishlist);
  };

  return (
    <main className="pt-20 px-6 md:px-10 text-white min-h-screen bg-black">
      <section className="max-w-7xl mx-auto bg-white/5 w-full">
        <h1 className="text-3xl font-bold uppercase mb-8 tracking-wide border-b border-white/10 p-6">
          Wishlist
        </h1>

        {items.length === 0 ? (
          <p className="text-white/60 p-6">Your wishlist is empty... for now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {items.map((item, index) => (
              <div
                key={`${item.slug}-${item.size}-${index}`}
                className="bg-white/5 p-4 border border-white/10 shadow-sm flex flex-col justify-between"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover mb-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-white/70 text-sm">₹{item.price}</p>
                  <p className="text-xs text-white/40 mt-1">Size: {item.size}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-white text-black px-4 py-2 text-sm uppercase tracking-wide hover:bg-gray-300 transition w-full"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item)}
                    className="border border-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition w-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
