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
  ${isScrolled ? "bg-black/30 backdrop-blur-md border-b border-white/20 shadow-sm" : ""}`}
>
  <div className="relative flex items-center w-full">
    
    {/* Logo - left always */}
    <div className="text-white font-extrabold text-xl md:text-2xl cursor-pointer select-none uppercase leading-tight">
      <Link href="/">The Black Company</Link>
    </div>

    {/* Menu */}
    <div className="absolute lg:relative right-0 lg:right-auto lg:mx-auto ">
      <button
        aria-label="Toggle menu"
        onClick={() => setSidebarOpen(true)}
        className="flex flex-row items-center gap-1 w-auto h-10"
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

    {/* Profile + Cart - visible only on lg */}
    <div className="hidden lg:flex items-center gap-4 ml-auto">
      <Link
        href="/pages/Login"
        className="px-4 py-2 text-white border border-white hover:bg-white hover:text-black transition duration-300"
      >
        <User className="w-5 h-5" />
      </Link>
      <Link
        href="/pages/MyCart"
        className="px-4 py-2 text-white border border-white hover:bg-white hover:text-black transition duration-300"
      >
        <ShoppingCart className="w-5 h-5" />
      </Link>
    </div>
  </div>
</div>


    
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-md text-white z-[150] ]"
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-4xl lg:text-[4rem] font-bold text-white"
              onClick={() => setSidebarOpen(false)}
            >
              &times;
            </button>

            {/* Scrollable Nav Content */}
            <div className="h-full w-full pt-24 pb-32 px-8 overflow-y-auto flex flex-col">
              {/* Snap container */}
              <div className="flex flex-col items-center gap-10 snap-y snap-mandatory ">
                {navLinks.map(({ label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className="text-4xl lg:text-[4rem] tracking-wider font-extrabold hover:text-white text-gray-300 transition duration-300 relative snap-start"
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
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-0 left-0 h-[3px] bg-white"
                      style={{ display: "block" }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

           {/* Horizontal Line + Fixed Button */}
<div className="absolute bottom-0 left-0 w-full px-8 py-6 bg-black/80 backdrop-blur-md border-t border-white/20">
  {/* <hr className="border-white/80 mb-6 w-full" /> */}
  <div className="flex justify-center">
    <Link
      href="#contact"
      className="px-8 py-3 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition duration-300 max-w-max"
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
