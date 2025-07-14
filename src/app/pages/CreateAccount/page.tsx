"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { User, Mail, Calendar, MapPin, Lock, EyeOff, Eye } from "lucide-react";
import Footer from "@/app/components/Footer";

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

const leftContentByStep: Record<number, { title: string; description: string }> = {
    1: {
        title: "Welcome to The Black Company",
        description:
            "Crafted in the shadows of elegance. Our garments aren’t worn—they’re embodied. Begin the journey. Every legend starts with a name—yours.\n\nStep into a world where fashion meets mystery. Your name is the first mark on your legend. We believe in individuality—let your identity shine. This is more than a signup; it’s an initiation. The Black Company is a family, and every member is unique. Your story starts here. Ready to make your mark?"
    },
    2: {
        title: "Connect With Us",
        description:
            "Stay in the loop with drops, events, and encrypted fashion memos. We don’t spam. We whisper. Your email is your key to the inner circle.\n\nExpect only the most vital transmissions—exclusive offers, secret launches, and invitations to private events. We value your privacy and never share your details. Communication is sacred here. Your inbox will be a portal to our world. Join the conversation, and never miss a moment of the movement."
    },
    3: {
        title: "Age of Elegance",
        description:
            "Style has no age—but our coven begins at 15. Ensure you're ready to wield it. Your birthdate unlocks the next chapter.\n\nWe honor the wisdom of experience and the spark of youth. This is a rite of passage—prove you’re ready to join the ranks. Age is more than a number; it’s a badge of readiness. Your journey is just beginning. Let your legacy grow with us. The next chapter awaits those who are prepared."
    },
    4: {
        title: "Your Domain",
        description:
            "Let us know where your cloak flies. A well-placed delivery is the start of everything. Your address is safe in our vault.\n\nWe deliver not just products, but experiences. Your location is the gateway to our world. Rest assured, your information is guarded with utmost care. Expect swift, secure, and discreet deliveries. Every address tells a story—let yours be the next. Welcome to the network of the chosen."
    },
    5: {
        title: "Secure the Vault",
        description:
            "A strong password. A sealed pact. Guard your account like it’s sacred—it is. Only you hold the key to your legacy.\n\nSecurity is our highest priority. Choose a password that stands the test of time. Protect your secrets and your style. This is your digital fortress—make it impenetrable. Your legacy deserves the best defense. Trust in your strength, and step forward with confidence."
    },
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
              <p className="text-white/70 text-sm">{leftContentByStep[step]?.description}</p>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="p-10 flex flex-col justify-center w-full bg-white/5 border border-white/10">
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
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-2 uppercase tracking-wide font-semibold hover:bg-white/90"
                  >
                    Create Account
                  </button>
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
