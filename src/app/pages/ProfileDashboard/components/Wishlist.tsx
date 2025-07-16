"use client";

import React, { useState } from "react";
import Image from "next/image";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Shadow Blade Hoodie",
      price: 2499,
      image: "/wishlist/item1.jpg",
    },
    {
      id: 2,
      name: "Dark Reaper Sneakers",
      price: 4599,
      image: "/wishlist/item2.jpg",
    },
    {
      id: 3,
      name: "Phantom Watch",
      price: 9999,
      image: "/wishlist/item3.jpg",
    },
  ]);

  const moveToCart = (id: number) => {
    alert("Moved to cart! (Pretend cart API called)");
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="pt-20 px-6 md:px-10 text-white  min-h-screen bg-black">
      <section className="max-w-7xl mx-auto bg-white/5 w-full">
        <h1 className="text-3xl font-bold uppercase mb-8 tracking-wide border-b border-white/10 p-6">
          Wishlist
        </h1>

        {items.length === 0 ? (
          <p className="text-white/60">Your wishlist is empty... for now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {items.map((item) => (
              <div
                key={item.id}
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
                  <p className="text-white/70 text-sm mb-4">₹{item.price}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => moveToCart(item.id)}
                    className="bg-white text-black px-4 py-2 text-sm uppercase tracking-wide hover:bg-gray-300 transition w-full"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
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
