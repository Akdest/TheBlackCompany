"use client";

import React from "react";

const orders = [
  {
    id: "ORD123456",
    date: "2025-07-01",
    status: "Delivered",
    total: "₹3,499",
    items: [
      {
        name: "Shadow Blade Hoodie",
        qty: 1,
        price: "₹1,999",
      },
      {
        name: "Obsidian Joggers",
        qty: 1,
        price: "₹1,500",
      },
    ],
  },
  {
    id: "ORD654321",
    date: "2025-06-14",
    status: "Shipped",
    total: "₹2,500",
    items: [
      {
        name: "Ashen Ember T-Shirt",
        qty: 2,
        price: "₹1,250",
      },
    ],
  },
];

export default function MyOrders() {
  return (
    <main className="pt-20 px-6 md:px-10 text-white font-['Poppins'] min-h-screen bg-black">
      <section className="max-w-7xl bg-white/5 mx-auto">
        <h1 className="text-3xl font-bold uppercase mb-8 tracking-wide border-b border-white/20 p-6">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-white/60">No orders found.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-white/60">
                      Placed on {order.date} &middot; Status: {order.status}
                    </p>
                  </div>
                  <div className="text-white/80 font-medium mt-4 md:mt-0">
                    Total: {order.total}
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-white/60">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <div className="text-sm text-white/80">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
