"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleConfirm = (confirmed: boolean) => {
    if (confirmed) {
      router.push("/pages/ForgotPassword"); // route to password page
    } else {
      setShowConfirm(false); // collapse confirm section
    }
  };

  return (
    <main className="pt-20 px-6 md:px-10 text-white font-['Poppins'] min-h-screen bg-black">
      <section className="max-w-7xl mx-auto bg-white/5 w-full">
        <h1 className="text-3xl font-bold uppercase mb-8 tracking-wide border-b border-white/10 p-6">
          Settings
        </h1>

        <div className=" p-6">
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-white text-black p-4 uppercase font-bold tracking-wide hover:bg-gray-200 transition"
          >
            Change Password
          </button>

          {showConfirm && (
            <div className="mt-4 p-4 border border-white/20 bg-transparent ">
              <p className="mb-4 text-xl lg:text-2xl">Are you sure you want to change your password?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleConfirm(true)}
                  className="bg-transparent text-white py-2 px-6  hover:bg-white hover:text-black border-2 border-white/80 transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleConfirm(false)}
                  className="bg-transparent text-white py-2 px-6  hover:bg-white hover:text-black transition border-2 border-white/80"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
