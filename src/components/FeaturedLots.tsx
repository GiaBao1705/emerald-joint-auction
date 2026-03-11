import { motion } from "framer-motion";
import { MapPin, Ruler, TreePine } from "lucide-react";

const lots = [
  { id: 1, name: "Elkhorn Valley Ranch", location: "Montana", acres: "2,400", type: "Ranch & Grazing", price: "$3.2M", highlight: true },
  { id: 2, name: "Red Mesa Parcels", location: "Arizona", acres: "860", type: "Development Land", price: "$1.1M", highlight: false },
  { id: 3, name: "Cedar Creek Timberland", location: "Oregon", acres: "5,100", type: "Timberland", price: "$4.8M", highlight: false },
  { id: 4, name: "Sage Flats Agricultural", location: "Idaho", acres: "1,750", type: "Agricultural", price: "$2.4M", highlight: false },
  { id: 5, name: "Golden Ridge Estate", location: "Colorado", acres: "320", type: "Residential Estate", price: "$5.6M", highlight: true },
  { id: 6, name: "Willow Basin Water Rights", location: "Wyoming", acres: "3,200", type: "Ranch & Water", price: "$3.9M", highlight: false },
];

const FeaturedLots = () => {
  return (
    <section id="lots" className="py-24 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm tracking-widest uppercase">Featured Properties</span>
          <h2 className="text-4xl md:text-5xl font-display font-700 mt-3 mb-4">Auction Lots</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Explore our curated selection of premium western properties available in the upcoming auction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lots.map((lot, i) => (
            <motion.div
              key={lot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent/40 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-body tracking-wider uppercase text-muted-foreground">Lot #{lot.id}</span>
                {lot.highlight && (
                  <span className="text-xs font-body font-semibold px-2 py-0.5 bg-accent/10 text-accent rounded-sm">Featured</span>
                )}
              </div>
              <h3 className="text-xl font-display font-600 mb-2 group-hover:text-accent transition-colors">{lot.name}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-body mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{lot.location}</span>
                <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{lot.acres} acres</span>
                <span className="flex items-center gap-1"><TreePine className="w-3.5 h-3.5" />{lot.type}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-2xl font-display font-700 text-accent">{lot.price}</span>
                <span className="text-sm font-body text-muted-foreground">Starting Bid</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLots;
