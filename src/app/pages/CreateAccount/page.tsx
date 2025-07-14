"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { User, Mail, Calendar, MapPin, Lock, EyeOff, Eye, CheckSquare } from "lucide-react";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function CreateAccount() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    address: "",
    pincode: "",
    password: "",
    confirmPassword: ""
  });
  const [dobError, setDobError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // New error states for password validation
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear errors on input change
    if (e.target.name === "password") setPasswordError("");
    if (e.target.name === "confirmPassword") setConfirmPasswordError("");
  };

  // Password strength checker: minimum 8 chars, uppercase, lowercase, number, special char
  const validatePasswordStrength = (password: string) => {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[^A-Za-z0-9]/;

    if (!minLength.test(password)) return "Password must be at least 8 characters.";
    if (!upper.test(password)) return "Password must include an uppercase letter.";
    if (!lower.test(password)) return "Password must include a lowercase letter.";
    if (!number.test(password)) return "Password must include a number.";
    if (!special.test(password)) return "Password must include a special character.";

    return "";
  };

  const nextStep = () => {
    if (step === 3) {
      const dobDate = new Date(formData.dob);
      const ageDiff = new Date().getFullYear() - dobDate.getFullYear();
      if (ageDiff < 15) {
        setDobError("You must be at least 15 years old.");
        return;
      } else {
        setDobError("");
      }
    }

    // On step 5, validate password strength and match before moving forward (or submitting)
    if (step === 5) {
      const pwdError = validatePasswordStrength(formData.password);
      if (pwdError) {
        setPasswordError(pwdError);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        return;
      }
      // If all good, no next step beyond 5, so no setStep here
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation on submit as a fallback
    const pwdError = validatePasswordStrength(formData.password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // If all valid, proceed with form submission
    console.log(formData);
    alert("Account created! Check console for details. Remove this alert in production.");
  };

const leftContentByStep: Record<number, { title: string; description: React.ReactNode }> = {
    1: {
        title: "Welcome to The Black Company",
        description: (
            <ul className="space-y-8 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Every legend starts with a name—yours.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Step into a world where fashion meets mystery.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Your story starts here. Ready to make your mark?
                </li>
            </ul>
        )
    },
    2: {
        title: "Connect With Us",
        description: (
            <ul className="space-y-8 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Get exclusive offers and secret launches.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    No spam—only vital transmissions.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Your privacy is respected and protected.
                </li>
            </ul>
        )
    },
    3: {
        title: "Age of Elegance",
        description: (
            <ul className="space-y-8 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Membership begins at age 15+.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    This is your rite of passage.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Let your legacy grow with us.
                </li>
            </ul>
        )
    },
    4: {
        title: "Your Domain",
        description: (
            <ul className="space-y-8 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Fast, secure, and discreet deliveries.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Your address is safe in our vault.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Every address tells a story—let yours be next.
                </li>
            </ul>
        )
    },
    5: {
        title: "Secure the Vault",
        description: (
            <ul className="space-y-8 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Choose a strong, unique password.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Protect your secrets and your style.
                </li>
                <li className="flex items-start gap-2">
                    <CheckSquare className="text-white/80 mt-0.5" size={18} />
                    Your legacy deserves the best defense.
                </li>
            </ul>
        )
    }
};

  return (
    <>
      <title>Create Account | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Create your account at The Black Company." />

      <Navbar />
      <section className="relative min-h-screen w-full bg-black text-white flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/prod/hoodie.jpg"
            alt="Background"
            fill
            priority
            className="object-cover opacity-20"
          />
        
        </div>

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2  shadow-xl backdrop-blur-md">
          {/* Left Column: Dynamic Info */}
          <div className="hidden lg:flex flex-col justify-center border-r border-white/20 p-10 space-y-6 h-full min-h-[600px]">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-semibold uppercase tracking-wide text-white">
                {leftContentByStep[step]?.title}
              </h2>
              <div className="text-white/70 text-sm">{leftContentByStep[step]?.description}</div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="p-10 flex flex-col h-full justify-center w-full bg-white/5 border border-white/10">
            <div className="uppercase text-xs text-white/40 tracking-widest mb-4">
              Step {step} of 5
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold tracking-wide uppercase mb-4 text-white">
                Create Your Account
              </h2>

              {/* Step 1: Name */}
              <AnimatePresence>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex flex-col">
                      <label htmlFor="firstName" className="text-sm text-white/60">
                        <User className="text-white/50 inline-block mr-1" /> First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="lastName" className="text-sm text-white/60">
                        <User className="text-white/50 inline-block mr-1" /> Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 2: Email */}
              <AnimatePresence>
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col gap-2"
                  >
                    <label htmlFor="email" className="text-sm text-white/60">
                      <Mail className="inline-block mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none"
                      placeholder="you@black.co"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3: DOB */}
              <AnimatePresence>
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col gap-2"
                  >
                    <label htmlFor="dob" className="text-sm text-white/60">
                      <Calendar className="text-white/50 inline-block mr-1" /> Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none appearance-none [&::-webkit-calendar-picker-indicator]:invert"
                      required
                    />

                    {dobError && <span className="text-xs text-red-500">{dobError}</span>}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 4: Address */}
              <AnimatePresence>
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex flex-col">
                      <label htmlFor="address" className="text-sm text-white/60">
                        <MapPin className="text-white/50 inline-block mr-1" /> Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none"
                        placeholder="123 Fashion Ave"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="pincode" className="text-sm text-white/60">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white/30 py-2 px-1 text-sm text-white placeholder-white/40 focus:outline-none"
                        placeholder="123456"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 5: Password */}
              <AnimatePresence>
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Password Field */}
                    <div className="flex flex-col relative">
                      <label htmlFor="password" className="text-sm text-white/60">
                        <Lock className="text-white/50 inline-block mr-1" /> Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`bg-transparent border-b py-2 px-1 pr-8 text-sm placeholder-white/40 focus:outline-none ${
                          passwordError ? "border-red-500 text-red-400" : "border-white/30 text-white"
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-8 text-white/50 hover:text-white transition"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {passwordError && (
                        <span className="text-xs text-red-500 mt-1">{passwordError}</span>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col relative">
                      <label htmlFor="confirmPassword" className="text-sm text-white/60">
                        <Lock className="text-white/50 inline-block mr-1" /> Confirm Password
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`bg-transparent border-b py-2 px-1 pr-8 text-sm placeholder-white/40 focus:outline-none ${
                          confirmPasswordError ? "border-red-500 text-red-400" : "border-white/30 text-white"
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-8 text-white/50 hover:text-white transition"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {confirmPasswordError && (
                        <span className="text-xs text-red-500 mt-1">{confirmPasswordError}</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-white hover:underline"
                  >
                    Back
                  </button>
                )}
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-white text-black px-6 py-2 uppercase tracking-wide font-semibold hover:bg-white/90"
                  >
                    Next
                  </button>
                ) : (
                 <Link href="/pages/ProfileDashboard">
                   <button
                     type="submit"
                     className="bg-white text-black px-6 py-2 uppercase tracking-wide font-semibold hover:bg-white/90"
                   >
                     Create Account
                   </button>
                 </Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
