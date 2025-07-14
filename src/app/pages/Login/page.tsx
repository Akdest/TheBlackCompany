"use client";

import Navbar from "@/app/components/Navbar";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import Footer from "@/app/components/Footer";

export default function Login() {
  return (
    <>
    <title>Login | The Black Company</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Login to your account at The Black Company." />
    <Navbar />
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center px-auto md:px-8 py-16">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg/blk_model1.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent backdrop-blur-sm" />
      </div>

      {/* Decorative Model Side Image (optional) */}
      <div className="hidden md:block absolute top-10 left-0 h-[500px] w-[300px] z-10 opacity-40">
        <Image
          src="/prod/prod3.jpg"
          alt="Side Model"
          fill
          className="object-cover object-top grayscale contrast-125 backdrop-blur-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />
      </div>
      <div className="hidden md:block absolute bottom-10 right-0 h-[500px] w-[300px] z-10 opacity-40">
        <Image
          src="/prod/hoodie.jpg"
          alt="Side Model"
          fill
          className="object-cover object-top grayscale contrast-125 backdrop-blur-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />
      </div>

      {/* Login Card */}
      <div className="relative z-20 w-full max-w-md bg-white/5 border border-white/20 backdrop-blur-md mx-6 px-8 py-12 md:px-12 md:py-16 shadow-xl animate-fade-in-down">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-wider uppercase mb-8">
          Sign In to <span className="text-white">The Black</span>
        </h2>

        <form className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-white/60 tracking-wider">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@black.co"
              className="w-full bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-white/60 tracking-wider">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Forgot Password */}
          
          <div className="text-xs text-white/40 text-right hover:text-white/70 transition cursor-pointer">
           <Link href="/pages/ForgotPassword">Forgot Password?</Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-6 bg-white text-black py-3 uppercase tracking-wide font-semibold hover:bg-black/40 hover:text-white transition cursor-pointer shadow-lg hover:shadow-md hover:shadow-white/10 "
          >
            Sign In
          </button>
        </form>

        {/* Bottom Text */}
        <div className="mt-10 text-center text-xs text-white/50">
          Don&apos;t have an account?{" "}
          <span className="text-white hover:underline cursor-pointer">
            <Link href="/pages/CreateAccount">Join the Black.</Link>
          </span>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
