"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ReelModal from "@/components/ReelModal";
import { reels, type Reel } from "@/data/reels";

// Below-the-fold sections: lazy-loaded so they don't block the initial JS bundle.
// Each chunk is only downloaded + parsed when the browser is ready.
const JourneySection = dynamic(() => import("@/components/JourneySection"), { ssr: false });
const FeaturedWork   = dynamic(() => import("@/components/FeaturedWork"),   { ssr: false });
const Services       = dynamic(() => import("@/components/Services"),       { ssr: false });
const ColorGradingSlider = dynamic(() => import("@/components/ColorGradingSlider"), { ssr: false });
const About          = dynamic(() => import("@/components/About"),          { ssr: false });
const WhyWorkWithMe  = dynamic(() => import("@/components/WhyWorkWithMe"),  { ssr: false });
const ClientTypes    = dynamic(() => import("@/components/ClientTypes"),    { ssr: false });
const Process        = dynamic(() => import("@/components/Process"),        { ssr: false });
const Tools          = dynamic(() => import("@/components/Tools"),          { ssr: false });
const FinalCTA       = dynamic(() => import("@/components/FinalCTA"),       { ssr: false });
const Contact        = dynamic(() => import("@/components/Contact"),        { ssr: false });
const Footer         = dynamic(() => import("@/components/Footer"),         { ssr: false });

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
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <ReelModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </>
  );
}
