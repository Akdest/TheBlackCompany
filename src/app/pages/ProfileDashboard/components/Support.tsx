// Support.tsx
"use client";

import React, { useState } from "react";

export default function Support() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! Our ravens are in flight.");
  };

  return (
    <main className="pt-20 px-6 md:px-10 text-white  min-h-screen bg-black">
      <section className="max-w-7xl mx-auto bg-white/5 w-full">
        <h1 className="text-3xl font-bold uppercase  tracking-wide border-b border-white/10 p-6">
          Support
        </h1>

        <form onSubmit={handleSubmit} className="p-6 gap-6 flex flex-col">
          <div>
            <label htmlFor="name" className="text-sm uppercase block mb-2 text-white/70">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-black/40 text-white border border-white/20 p-3 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm uppercase block mb-2 text-white/70">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-black/40 text-white border border-white/20 p-3 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm uppercase block mb-2 text-white/70">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-black/40 text-white border border-white/20 p-3 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-6 py-3 uppercase font-semibold tracking-wide hover:bg-gray-200 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
