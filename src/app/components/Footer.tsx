"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full px-6 py-12 md:px-16 font-['Poppins']">
      

      {/* Bottom Bar */}
      <div className=" border-t border-white/10 pt-6 text-xs text-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>&copy; {new Date().getFullYear()} THE BLACK COMPANY.<br/> All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="#privacy" className="hover:text-white">Privacy</Link>
          <Link href="#terms" className="hover:text-white">Terms</Link>
          <Link href="#cookies" className="hover:text-white">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
