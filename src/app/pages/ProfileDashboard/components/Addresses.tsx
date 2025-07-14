// Addresses.tsx
"use client";

import React, { useState } from "react";

export default function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      fullAddress:
        "123, Black Street, Near Shadow Market, Dark City, India - 110011",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      label: "Work",
      fullAddress: "456, Blade Avenue, Grim Tower, Nocturne, India - 220022",
      phone: "+91 91234 56789",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedAddress, setEditedAddress] = useState({
    label: "",
    fullAddress: "",
    phone: "",
  });

  const handleEdit = (addr: typeof addresses[number]) => {
    setEditingId(addr.id);
    setEditedAddress({
      label: addr.label,
      fullAddress: addr.fullAddress,
      phone: addr.phone,
    });
  };

  const handleSave = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === id ? { ...addr, ...editedAddress } : addr
      )
    );
    setEditingId(null);
  };

  const handleDiscard = () => {
    setEditingId(null);
    setEditedAddress({ label: "", fullAddress: "", phone: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({ ...prev, [name]: value }));
  };

  const removeAddress = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <main className="pt-20 px-6 md:px-10 text-white font-['Poppins'] bg-black flex justify-center">
      <section className="max-w-7xl mx-auto bg-white/5 w-full">
       <h1 className="text-3xl font-bold uppercase mb-8 tracking-wide border-b border-white/20 p-6">
          My Addresses
        </h1>

        {addresses.length === 0 ? (
          <p className="text-white/60">You have no saved addresses.</p>
        ) : (
          <div className="space-y-6">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white/5 border border-white/10 p-6 flex flex-col gap-2"
              >
                {editingId === addr.id ? (
                  <>
                    <input
                      type="text"
                      name="label"
                      value={editedAddress.label}
                      onChange={handleChange}
                      className="w-full bg-black/40 text-white p-2 border border-white/20"
                    />
                    <textarea
                      name="fullAddress"
                      value={editedAddress.fullAddress}
                      onChange={handleChange}
                      className="w-full bg-black/40 text-white p-2 border border-white/20"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={editedAddress.phone}
                      onChange={handleChange}
                      className="w-full bg-black/40 text-white p-2 border border-white/20"
                    />
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleSave(addr.id)}
                        className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black uppercase text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleDiscard}
                        className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black uppercase text-sm"
                      >
                        Discard
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold uppercase">{addr.label}</h2>
                    <p className="text-white/80 text-sm">{addr.fullAddress}</p>
                    <p className="text-white/50 text-sm">Phone: {addr.phone}</p>
                    <div className="flex gap-4 mt-4">
                      <button
                        className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black uppercase text-sm"
                        onClick={() => handleEdit(addr)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black uppercase text-sm"
                        onClick={() => removeAddress(addr.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}