import { Gavel } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="py-16 border-t border-border bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gavel className="w-5 h-5 text-accent" />
              <span className="font-display font-700">WRJV Auction</span>
            </div>
            <p className="text-sm text-muted-foreground font-body max-w-xs">
              Western Region Joint Venture Auction — connecting buyers with premium western properties since 2004.
            </p>
          </div>
          <div>
            <h4 className="font-display font-600 mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li><a href="#lots" className="hover:text-foreground transition-colors">Auction Lots</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Bidder Registration</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-600 mb-4 text-accent">Contact</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li>info@wrjvauction.com</li>
              <li>(555) 842-7100</li>
              <li>1200 Range Road, Bozeman, MT 59715</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground font-body">
          © 2026 Western Region Joint Venture Auction. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
