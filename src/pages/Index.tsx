import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedLots from "@/components/FeaturedLots";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedLots />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
