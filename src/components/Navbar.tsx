import { Gavel } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <Gavel className="w-6 h-6 text-accent" />
          <span className="font-display font-700 text-lg">WRJV Auction</span>
        </a>
        <div className="hidden md:flex items-center gap-8 font-body text-sm">
          <a href="#lots" className="text-muted-foreground hover:text-accent transition-colors">Auction Lots</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-accent transition-colors">How It Works</a>
          <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors">Contact</a>
          <a href="#" className="px-5 py-2 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-gold-light transition-colors text-sm">
            Register to Bid
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
