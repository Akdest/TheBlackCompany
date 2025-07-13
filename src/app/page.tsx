import Image from "next/image";
import Hero from "./components/Hero";
import  FallCollection from "./components/Discover";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <FallCollection/>
    </>
  );
}
