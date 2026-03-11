import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServiceSection from "@/components/ServiceSection";
import FeaturedLots from "@/components/FeaturedLots";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <FeaturedLots />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
