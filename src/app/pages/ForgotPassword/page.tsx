"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, XSquare, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Focus tracking for password inputs
  const [focused, setFocused] = useState(false);
  const [, setFocusCount] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const isLong = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[\W_]/.test(password);
  const allValid =
    isLong && hasUpper && hasLower && hasNumber && hasSymbol && password === confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (allValid) {
      console.log("Password updated successfully.");
    }
  };
  useEffect(() => {
    // This runs only on client
    function updateWidth() {
      setViewportWidth(window.innerWidth);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleFocus = () => {
    setFocusCount((c) => c + 1);
    setFocused(true);
  };

  const handleBlur = () => {
    setFocusCount((c) => {
      const newCount = c - 1;
      if (newCount <= 0) {
        setFocused(false);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <>
      <title>Reset Password | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Set a new password for your account at The Black Company."
      />
      <Navbar />

      <section className="relative min-h-screen w-full bg-black text-white flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/prod/hoodie.jpg"
            alt="Reset Background"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/90" />
        </div>

        {/* Side Model */}
        <div className="hidden lg:block absolute top-12 left-12 w-[300px] h-[450px] z-10 opacity-30">
          <Image
            src="/prod/prod3.jpg"
            alt="Model"
            fill
            className="object-cover object-top grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90" />
        </div>

        {/* Parent container that expands horizontally or vertically */}
        <motion.div
          // On lg+, animate width. On sm/md, animate height.
          initial={false}
           animate={{
          width: focused
            ? viewportWidth >= 1024
              ? 720
              : "100%"
            : viewportWidth >= 1024
            ? 420
            : "auto",
          height: focused ? (viewportWidth < 1024 ? "auto" : "auto") : "auto",
        }}
          transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.5 }}
          className="relative z-20 bg-white/5 border border-white/10 backdrop-blur-md px-10 py-14 md:px-14 md:py-16 shadow-xl flex flex-col lg:flex-row overflow-hidden"
          style={{ minWidth: 300 }}
        >
            
          {/* Left form */}
          <div className="flex-1 mb-8 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-wider uppercase mb-6">
              Reset Password
            </h2>

            <p className="text-sm text-white/70 mb-6">
              Enter your email and set a new password for your account.
            </p>

            {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-md"
          >
           
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm text-white/60 tracking-wider"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="you@black.co"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="newPassword"
                className="text-sm text-white/60 tracking-wider"
              >
                New Password
              </label>
              <input
                type={showNewPass ? "text" : "password"}
                id="newPassword"
                value={password}
                placeholder="••••••••"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent border-b py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none transition ${
                  attempted && !allValid
                    ? "border-red-500 animate-pulse"
                    : "border-white/30 focus:border-white"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-1 top-[2.1rem] text-white/50 hover:text-white transition focus:outline-none"
                tabIndex={-1}
                aria-label={showNewPass ? "Hide password" : "Show password"}
              >
                {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-white/60 tracking-wider"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPass ? "text" : "password"}
                id="confirmPassword"
                value={confirm}
                placeholder="••••••••"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setConfirm(e.target.value)}
                className={`w-full bg-transparent border-b py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none transition ${
                  attempted && password !== confirm
                    ? "border-red-500 animate-pulse"
                    : "border-white/30 focus:border-white"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-1 top-[2.1rem] text-white/50 hover:text-white transition"
                tabIndex={-1}
                aria-label={showConfirmPass ? "Hide password" : "Show password"}
              >
                {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 bg-white text-black py-3 uppercase tracking-wide font-semibold hover:bg-black/40 hover:text-white transition cursor-pointer shadow-lg hover:shadow-md hover:shadow-white/10"
            >
              Update Password
            </button>
              {/* Back to Login */}
        <div className="relative z-20 mt-10 text-center text-xs text-white/50 max-w-4xl">
          Want to go back?{" "}
          <span className="text-white hover:underline cursor-pointer">
            <Link href="/pages/Login">Return to Login</Link>
          </span>
        </div>

            {/* Conditions on sm/md (expand below inputs) */}
            <AnimatePresence>
              {focused && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 overflow-hidden border-t border-white/20 pt-4 text-white/70 text-sm space-y-2 select-none lg:hidden"
                >
                  <p className="text-white/60 uppercase text-xs tracking-wider mb-2">
                    Your password should include:
                  </p>
                  <ul className="space-y-2">
                    <Condition met={isLong} label="At least 8 characters" />
                    <Condition met={hasUpper} label="An uppercase letter" />
                    <Condition met={hasLower} label="A lowercase letter" />
                    <Condition met={hasNumber} label="A number" />
                    <Condition met={hasSymbol} label="A special character" />
                    <Condition
                      met={password === confirm && password !== ""}
                      label="Passwords match"
                    />
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          </div>

          {/* Conditions panel for lg+ */}
          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="hidden lg:flex overflow-hidden text-sm text-white/70 leading-relaxed border-l border-white/20 pl-6 select-none"
              >
                <div>
                  <p className="text-white/60 uppercase text-xs tracking-wider mb-2">
                    Your password should include:
                  </p>
                  <ul className="space-y-2">
                    <Condition met={isLong} label="At least 8 characters" />
                    <Condition met={hasUpper} label="An uppercase letter" />
                    <Condition met={hasLower} label="A lowercase letter" />
                    <Condition met={hasNumber} label="A number" />
                    <Condition met={hasSymbol} label="A special character" />
                    <Condition
                      met={password === confirm && password !== ""}
                      label="Passwords match"
                    />
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </motion.div>

      
      </section>
      <Footer/>
    </>
  );
}

function Condition({ met, label }: { met: boolean; label: string }) {
  const Icon = met ? CheckSquare : XSquare;
  return (
    <li
      className={`flex items-center gap-2 ${
        met ? "text-white" : "text-white/40"
      }`}
    >
      <Icon size={16} className="shrink-0" />
      <span>{label}</span>
    </li>
  );
}
