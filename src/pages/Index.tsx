import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedLots from "@/components/FeaturedLots";
import ServiceSection from "@/components/ServiceSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import NewsSection from "@/components/NewsSection";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <FeaturedLots />
      <NewsSection />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;