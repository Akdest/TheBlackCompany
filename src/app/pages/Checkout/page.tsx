"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

const steps = ["Contact Info", "Shipping", "Review"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
      const totalAmount = parsedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(totalAmount);
    }
  }, []);

  const nextStep = () => step < steps.length - 1 && setStep(step + 1);
  const prevStep = () => step > 0 && setStep(step - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Final form submitted:", form);
    router.push("/pages/Payments");
  };

  return (
    <>
      <title>Checkout | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Navbar />

      <main className="relative min-h-screen text-white px-6 py-16 overflow-hidden">
        {/* 🌌 Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg/blk_model1.jpg"
            alt="Checkout Background"
            fill
            className="object-cover object-center opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent backdrop-blur-md" />
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* 🧠 Heading */}
          <div className="text-center py-6 space-y-2">
            <h1 className="text-4xl font-extrabold tracking-wide uppercase">
              Checkout
            </h1>
            <p className="text-lg text-white/70">
              Review your order and complete your purchase
            </p>
          </div>

          {/* Step tracker */}
          <div className="flex items-center justify-center gap-4 text-md text-white/60">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`px-3 py-1 border transition-all ${
                  i === step ? "border-white text-white" : "border-white/20"
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-xl p-8 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)] space-y-6">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                  />
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={form.zip}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-semibold mb-2">Review Info:</h2>
                  <div className="space-y-1 text-white/80">
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Phone:</strong> {form.phone}</p>
                    <p>
                      <strong>Address:</strong> {form.address}, {form.city}, {form.state} - {form.zip}
                    </p>
                  </div>

                  {/* Cart Items Review */}
                  <div className="pt-6 border-t border-white/20">
                    <h2 className="text-lg font-semibold mb-2">Items in Your Order:</h2>
                    <div className="max-h-[250px] overflow-y-auto snap-y snap-mandatory space-y-4 pr-2">
                      {cartItems.length === 0 ? (
                        <p className="text-white/60">Your cart is empty.</p>
                      ) : (
                        cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center bg-white/10 p-3 backdrop-blur-sm border border-white/10 text-white/90 snap-start"
                          >
                            <div className="space-y-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-white/60">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-mono">₹{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/20 mt-4 flex justify-between text-lg font-semibold text-white">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between text-sm mt-6">
              <button
                disabled={step === 0}
                onClick={prevStep}
                className="disabled:opacity-30 hover:bg-white hover:text-black text-white px-4 py-2 border border-white transition-all text-lg"
              >
                Back
              </button>

              {step === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="text-white hover:bg-white hover:text-black px-4 py-2 border border-white transition-all text-lg"
                >
                  Confirm & Pay
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={
                    (step === 0 && (!form.name || !form.email || !form.phone)) ||
                    (step === 1 && (!form.address || !form.city || !form.state || !form.zip))
                  }
                  className="text-white hover:bg-white hover:text-black px-4 py-2 border border-white transition-all text-lg"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
