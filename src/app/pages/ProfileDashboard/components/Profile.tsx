"use client";

import React, { useState, useEffect } from "react";

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

  // This will reset edits when editing mode is left without saving (optional safeguard)
  useEffect(() => {
    if (!isEditing) {
      setDraftProfile(profile);
    }
  }, [isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(draftProfile); // Save the changes
    setIsEditing(false); // Exit edit mode
    alert("Profile saved successfully!");
  };

  const handleDiscard = () => {
    setDraftProfile(profile); // Reset edits
    setIsEditing(false); // Exit edit mode
  };

  return (
    <main className="pt-20 px-6 md:px-10 text-white font-['Poppins'] min-h-screen bg-black flex justify-center">
      <section className="max-w-7xl w-full bg-white/5 p-10 border border-white/20 shadow-lg">
        <h1 className="text-3xl font-bold uppercase mb-8 tracking-wide border-b border-white/20 pb-3">
          My Profile
        </h1>

        <form onSubmit={handleSave} className="space-y-10">
          {/* Username and Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/20 pb-6">
            {[
              { label: "Username", name: "username", type: "text" },
              { label: "Full Name", name: "name", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-white/70 text-xs uppercase mb-2">{label}</label>
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
                  <div className="bg-black/40 p-3 border border-white/20 select-text">{profile[name as keyof typeof profile]}</div>
                )}
              </div>
            ))}
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/20 pb-6">
            {[
              { label: "Email Address", name: "email", type: "email", mono: true },
              { label: "Phone Number", name: "phone", type: "tel", mono: true },
            ].map(({ label, name, type, mono }) => (
              <div key={name}>
                <label className="block text-white/70 text-xs uppercase mb-2">{label}</label>
                {isEditing ? (
                  <input
                    type={type}
                    name={name}
                    value={draftProfile[name as keyof typeof draftProfile]}
                    onChange={handleChange}
                    className={`w-full p-3 bg-black/40 text-white border border-white/20 focus:outline-none focus:border-white placeholder-white/70 ${mono ? "font-mono" : ""}`}
                    required
                  />
                ) : (
                  <div className={`bg-black/40 p-3 border border-white/20 select-text ${mono ? "font-mono" : ""}`}>
                    {profile[name as keyof typeof profile]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Gender and DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/20 pb-6">
            <div>
              <label className="block text-white/70 text-xs uppercase mb-2">Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={draftProfile.gender}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/40 text-white border border-white/20 focus:outline-none focus:border-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
              ) : (
                <div className="bg-black/40 p-3 border border-white/20 select-text">{profile.gender}</div>
              )}
            </div>

            <div>
              <label className="block text-white/70 text-xs uppercase mb-2">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={draftProfile.dob}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/40 text-white border border-white/20 focus:outline-none focus:border-white"
                />
              ) : (
                <div className="bg-black/40 p-3 border border-white/20 select-text">{profile.dob}</div>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="border-b border-white/20 pb-6">
            <label className="block text-white/70 text-xs uppercase mb-2">Address</label>
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
              <div className="bg-black/40 p-3 border border-white/20 select-text">{profile.address}</div>
            )}
          </div>

          {/* Joined Date */}
          <div>
            <label className="block text-white/70 text-xs uppercase mb-2">Member Since</label>
            <div className="bg-black/40 p-3 border border-white/20 text-white select-text cursor-default">
              {profile.joined}
            </div>
          </div>

{isEditing ? (
  <>
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
  </>
) : (
  <button
    type="button" // ✅ fixed: don't submit form
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
