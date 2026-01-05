"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { User, ShoppingCart } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/pages/OurProducts" },
  { label: "Account", href: "/pages/Login" },
  { label: "Cart", href: "/pages/MyCart" },
  { label: "About", href: "/pages/About" },
  { label: "Get In Touch", href: "/pages/GetInTouch" },
];

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100]">
      {/* Top Nav */}
      <div
        className={`flex items-center px-6 md:px-10 h-16 mx-auto transition-all duration-300
        ${
          isScrolled
            ? "bg-black/30 backdrop-blur-md border-b border-white/20 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="relative flex items-center w-full">
          {/* Logo */}
          <div className="text-white font-extrabold text-xl md:text-2xl cursor-pointer select-none uppercase">
            <Link href="/">The Black Company</Link>
          </div>

          {/* Menu Button */}
          <div className="absolute lg:relative right-0 lg:right-auto lg:mx-auto">
            <button
              aria-label="Toggle menu"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 h-10"
            >
              <div className="flex flex-col gap-1">
                <span className="block h-1 w-8 bg-white" />
                <span className="block h-1 w-8 bg-white" />
              </div>
              <span className="text-sm text-white font-semibold tracking-widest uppercase">
                Menu
              </span>
            </button>
          </div>

          {/* Profile + Cart (lg only) */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            <Link
              href="/pages/Login"
              className="p-2 border border-white text-white hover:bg-white hover:text-black transition"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/pages/MyCart"
              className="p-2 border border-white text-white hover:bg-white hover:text-black transition"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 22,
            }}
            className="fixed inset-0 h-screen w-full bg-black/80 backdrop-blur-md text-white z-[150]"
          >
            {/* Close */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-6 right-6 text-4xl lg:text-[4rem] font-bold"
              aria-label="Close menu"
            >
              &times;
            </button>

            {/* Nav Content */}
            <div className="h-full pt-24 pb-32 px-8 overflow-y-auto flex flex-col">
              <div className="flex flex-col items-center gap-10 snap-y snap-mandatory">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <motion.span
                      className="relative block text-4xl lg:text-[4rem] font-extrabold tracking-wider text-gray-300 hover:text-white transition"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      {label}
                      <motion.span
                        variants={{
                          rest: { width: 0 },
                          hover: { width: "100%" },
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0, 0, 0.58, 1],
                        }}
                        className="absolute bottom-0 left-0 h-[3px] bg-white"
                      />
                    </motion.span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="absolute bottom-0 left-0 w-full px-8 py-6 bg-black/80 backdrop-blur-md border-t border-white/20">
              <div className="flex justify-center">
                <Link
                  href="/pages/GetInTouch"
                  className="px-8 py-3 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition"
                >
                  Reach Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
