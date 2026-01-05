"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = "THE BLACK COMPANY";

interface PreloaderProps {
  onFinish: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visibleCount < text.length) {
      timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 100); // letter reveal speed
    } else {
      timer = setTimeout(() => {
        onFinish();
      }, 500); // pause after full text
    }

    return () => clearTimeout(timer);
  }, [visibleCount, onFinish]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} // material-like ease
      >
        <div className="flex text-2xl md:text-6xl font-extrabold tracking-widest uppercase text-white">
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: i < visibleCount ? 1 : 0,
                y: i < visibleCount ? 0 : 10,
              }}
              transition={{
                duration: 0.3,
                ease: [0, 0, 0.58, 1],
              }}
              className="whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
