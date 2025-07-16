"use client";

import { useState } from "react";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import FallCollection from "./components/Fall";
import Navbar from "./components/Navbar";
import SummerCollection from "./components/Summer";
import WinterCollection from "./components/Winter";
import GetInTouch from "./components/GetInTouch";
import Footer from "./components/Footer";
import Feature from "./components/Feature";
import Ad from "./components/Ad";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete && <Preloader onFinish={() => setLoadingComplete(true)} />}
      {loadingComplete && (
        <>
          <Navbar />
          <Hero />
          <FallCollection />
          <Ad />
          <SummerCollection />
          <Feature />
          <WinterCollection />
          <GetInTouch />
          <Footer />
        </>
      )}
    </>
  );
}
