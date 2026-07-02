import dynamic from 'next/dynamic';
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { HeroToCinematicMaster } from "@/components/HeroToCinematicMaster";

const Manifesto = dynamic(() => import('@/components/Manifesto').then(mod => mod.Manifesto));
const EducationalStack = dynamic(() => import('@/components/EducationalStack').then(mod => mod.EducationalStack));
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen overflow-clip">
      <Preloader />
      <Navbar />
      <HeroToCinematicMaster />
      <Manifesto />
      <EducationalStack />
      <Footer />
    </main>
  );
}
