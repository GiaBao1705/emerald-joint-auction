import { motion } from "framer-motion";
import { ClipboardCheck, Gavel, Handshake, Search } from "lucide-react";

const steps = [
  { icon: Search, title: "Browse Lots", desc: "Explore available properties, review documentation and survey reports." },
  { icon: ClipboardCheck, title: "Register to Bid", desc: "Complete registration and submit your bidder qualification documents." },
  { icon: Gavel, title: "Place Your Bid", desc: "Participate in the live or online auction and place competitive bids." },
  { icon: Handshake, title: "Close the Deal", desc: "Winning bidders finalize contracts and complete the transaction." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm tracking-widest uppercase">Process</span>
          <h2 className="text-4xl md:text-5xl font-display font-700 mt-3 mb-4">How It Works</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/40 border border-accent/20 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-accent" />
              </div>
              <span className="text-xs font-body text-muted-foreground tracking-widest uppercase">Step {i + 1}</span>
              <h3 className="text-lg font-display font-600 mt-1 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
