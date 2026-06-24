import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { HeroToCinematicMaster } from "@/components/HeroToCinematicMaster";
import { Manifesto } from "@/components/Manifesto";
import { EducationalStack } from "@/components/EducationalStack";
import { Footer } from "@/components/Footer";

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
