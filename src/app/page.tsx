import Hero from "./components/Hero";
import  FallCollection from "./components/Fall";
import Navbar from "./components/Navbar";
import SummerCollection from "./components/Summer";
import WinterCollection from "./components/Winter";
import GetInTouch from "./components/GetInTouch";
import Footer from "./components/Footer";
import ExclusiveStrip from "./components/Strip";


export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    
    <FallCollection/>
    <SummerCollection/>
    <WinterCollection/>
    <GetInTouch/>
    <ExclusiveStrip/>
    <Footer/>
    </>
  );
}
