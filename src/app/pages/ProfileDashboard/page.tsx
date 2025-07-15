"use client";

import React, { useState } from "react";

import NavbarProfileDash from "./components/NavbarProfileDash";
import Dashboard from "./components/Profile";  // Your profile dashboard component
import MyOrders from "./components/MyOrders";
import Wishlist from "./components/Wishlist";
import Addresses from "./components/Addresses";
import Settings from "./components/Settings";
import Support from "./components/Support";
import Footer from "@/app/components/Footer";
// You can create placeholder components for other sections similarly

export default function ProfileDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Helper to render section content based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <MyOrders />;
      case "wishlist":
        return <Wishlist />;
      case "addresses":
        return <Addresses />;
      case "settings":
        return <Settings />;
      case "support":
        return <Support />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <title>Profile Dashboard | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Manage your account, orders, and settings at The Black Company." />

      <NavbarProfileDash onSelectSection={setActiveSection} activeSection={activeSection} />

      <main className="pt-20 px-6 md:px-10 text-white font-['Poppins'] min-h-screen bg-black">
        {renderSection()}
      </main>
      <Footer />
    </>
  );
}
