// src/app/page.tsx
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Friction from "@/components/sections/Friction";
import Sandbox from "@/components/sections/Sandbox";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main
      id="theme-wrapper"
      className="min-h-screen w-full bg-[#0D0E0D] text-[#ECDFCC] overflow-x-hidden"
    >
      <Navbar />
      <Hero />
      <Friction />
      <Sandbox />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}
