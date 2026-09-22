"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JourneySection from "@/components/JourneySection";
import FeaturedWork from "@/components/FeaturedWork";
import Services from "@/components/Services";
import ColorGradingSlider from "@/components/ColorGradingSlider";
import About from "@/components/About";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import ClientTypes from "@/components/ClientTypes";
import Process from "@/components/Process";
import Tools from "@/components/Tools";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ReelModal from "@/components/ReelModal";
import { reels, type Reel } from "@/data/reels";

export default function Home() {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);

  const playByDestination = (destinationId: string) => {
    const reel = reels.find(
      (r) => r.destination.toLowerCase().replace(/\s+/g, "-") === destinationId
    );
    setActiveReel(reel ?? reels[0]);
  };

  return (
    <>
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero onWatchReel={() => setActiveReel(reels[0])} />
        <JourneySection onPlay={playByDestination} />
        <FeaturedWork onPlay={setActiveReel} />
        <Services />
        <ColorGradingSlider />
        <About />
        <WhyWorkWithMe />
        <ClientTypes />
        <Process />
        <Tools />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <ReelModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </>
  );
}
