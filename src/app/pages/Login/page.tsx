"use client";

import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { signin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signin(email, password);
      router.push("/pages/ProfileDashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Login | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Login to your account at The Black Company."
      />

      <Navbar />

      <section className="relative min-h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center px-auto md:px-8 py-16">
        {/* Background */}
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

        {/* Login Card */}
        <div className="relative z-20 w-full max-w-md bg-white/5 border border-white/20 backdrop-blur-md mx-6 px-8 py-12 md:px-12 md:py-16 shadow-xl animate-fade-in-down">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-wider uppercase mb-8">
            Sign In to <span className="text-white">The Black</span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-white/60 tracking-wider">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@black.co"
                className="w-full bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-white/60 tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-400 tracking-wide">{error}</p>
            )}

            {/* Forgot */}
            <div className="text-xs text-white/40 text-right hover:text-white/70 transition">
              <Link href="/pages/ForgotPassword">Forgot Password?</Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 bg-white text-black py-3 uppercase tracking-wide font-semibold hover:bg-black/40 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Bottom */}
          <div className="mt-10 text-center text-xs text-white/50">
            Don&apos;t have an account?{" "}
            <Link
              href="/pages/CreateAccount"
              className="text-white hover:underline"
            >
              Join the Black.
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
