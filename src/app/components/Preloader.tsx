"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = "THE BLACK COMPANY";

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < text.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 100); // Speed of each letter fade-in
      return () => clearTimeout(timer);
    } else {
      // Small pause after last character
      const timer = setTimeout(() => onFinish(), 500);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex text-4xl md:text-6xl font-extrabold tracking-widest uppercase text-white">
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: i < visibleCount ? 1 : 0.1,
              }}
              transition={{ duration: 0.3 }}
              className="whitespace-pre" // To keep spaces visible
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
