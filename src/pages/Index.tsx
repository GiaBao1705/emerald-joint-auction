import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedLots from "@/components/FeaturedLots";
import VideoSection from "@/components/VideoSection";
import ArticlesSection from "@/components/ArticlesSection";
import ServiceSection from "@/components/ServiceSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturedLots />
      <VideoSection />
      <ArticlesSection />
      <HowItWorks />
      <ServiceSection />
      <Footer />
    </div>
  );
};

export default Index;
