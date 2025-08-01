"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Profile() {
  const initialProfile = {
    username: "ayush",
    name: "Ayush",
    email: "ayush@blackco.com",
    phone: "+91 98765 43210",
    address: "123, Black Street, Dark City, India, 110011",
    gender: "Male",
    dob: "1999-08-15",
    joined: "12th July 2024",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [draftProfile, setDraftProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraftProfile(profile);
    }
  }, [isEditing]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(draftProfile);
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  const handleDiscard = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  return (
   <main className="relative min-h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center px-auto md:px-8 py-16">
   
         {/* Background Image */}
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
  
      <section className="w-full max-w-7xl bg-white/5 backdrop-blur-md p-10 border border-white/20 shadow-xl space-y-10">
     
        <h1 className="text-3xl font-bold uppercase tracking-wide border-b border-white/20 pb-3">
          My Profile
        </h1>

        <form onSubmit={handleSave} className="space-y-10">
          {/* Username & Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/20 pb-6">
            {[
              { label: "Username", name: "username", type: "text" },
              { label: "Full Name", name: "name", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-white/70 text-xs uppercase mb-2">
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type={type}
                    name={name}
                    value={draftProfile[name as keyof typeof draftProfile]}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/40 text-white border border-white/20 focus:outline-none focus:border-white placeholder-white/70"
                    required
                  />
                ) : (
                  <div className="bg-black/40 p-3 border border-white/20 select-text">
                    {profile[name as keyof typeof profile]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/20 pb-6">
            {[
              { label: "Email Address", name: "email", type: "email" },
              { label: "Phone Number", name: "phone", type: "tel" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-white/70 text-xs uppercase mb-2">
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type={type}
                    name={name}
                    value={draftProfile[name as keyof typeof draftProfile]}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/40 text-white border border-white/20 focus:outline-none focus:border-white placeholder-white/70 font-mono"
                    required
                  />
                ) : (
                  <div className="bg-black/40 p-3 border border-white/20 select-text font-mono">
                    {profile[name as keyof typeof profile]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Gender & DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/20 pb-6">
            <div>
              <label className="block text-white/70 text-xs uppercase mb-2">
                Gender
              </label>
              {isEditing ? (
               <select
  name="gender"
  value={draftProfile.gender}
  onChange={handleChange}
  className="w-full p-3 bg-black/60 text-white border border-white/20 focus:outline-none focus:border-white appearance-none rounded"
>
  <option value="Male" className="bg-black text-white">Male</option>
  <option value="Female" className="bg-black text-white">Female</option>
  <option value="Other" className="bg-black text-white">Other / Prefer not to say</option>
</select>

              ) : (
                <div className="bg-black/40 p-3 border border-white/20 select-text">
                  {profile.gender}
                </div>
              )}
            </div>
<input
  type="date"
  name="dob"
  value={draftProfile.dob}
  onChange={handleChange}
  className="w-full p-3 bg-black/60 text-white border border-white/20 focus:outline-none focus:border-white appearance-none"
  style={{
    colorScheme: "dark" // Tells the browser to theme the calendar popup dark (supported in Chromium)
  }}
/>

          </div>

          {/* Address */}
          <div className="border-b border-white/20 pb-6">
            <label className="block text-white/70 text-xs uppercase mb-2">
              Address
            </label>
            {isEditing ? (
              <textarea
                name="address"
                rows={3}
                value={draftProfile.address}
                onChange={handleChange}
                className="w-full p-3 bg-black/40 text-white border border-white/20 focus:outline-none focus:border-white resize-none placeholder-white/70"
                required
              />
            ) : (
              <div className="bg-black/40 p-3 border border-white/20 select-text">
                {profile.address}
              </div>
            )}
          </div>

          {/* Joined Date */}
          <div>
            <label className="block text-white/70 text-xs uppercase mb-2">
              Member Since
            </label>
            <div className="bg-black/40 p-3 border border-white/20 text-white select-text cursor-default">
              {profile.joined}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button
                type="submit"
                className="bg-white text-black py-3 px-8 uppercase font-bold tracking-wide hover:bg-gray-200 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="bg-transparent border border-white text-white py-3 px-8 uppercase font-bold tracking-wide hover:bg-white hover:text-black transition"
              >
                Discard
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-white text-black py-3 px-8 uppercase font-bold tracking-wide hover:bg-gray-200 transition"
            >
              Edit Profile
            </button>
          )}
        </form>
      </section>
    </main>
  );
}
