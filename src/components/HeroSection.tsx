import { motion } from "framer-motion";
import heroImg from "@/assets/hero-landscape.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Western landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      </div>
      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block mb-4 px-4 py-1.5 border border-accent/40 text-accent font-body text-sm tracking-widest uppercase rounded-sm">
            Upcoming Auction · April 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-800 leading-[1.1] mb-6">
            Western Region
            <br />
            <span className="text-accent">Joint Venture</span>
            <br />
            Auction
          </h1>
          <p className="text-lg text-secondary-foreground max-w-lg mb-8 font-body">
            Premium land and property opportunities across the western region. 
            Trusted by investors, ranchers, and developers for over two decades.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#lots" className="inline-flex items-center px-8 py-3.5 bg-accent text-accent-foreground font-body font-semibold rounded-sm hover:bg-gold-light transition-colors">
              View Auction Lots
            </a>
            <a href="#how-it-works" className="inline-flex items-center px-8 py-3.5 border border-foreground/20 text-foreground font-body font-semibold rounded-sm hover:border-accent hover:text-accent transition-colors">
              How It Works
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
