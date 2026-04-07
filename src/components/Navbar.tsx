import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const links = [
    { href: "#about", label: "Giới thiệu" },
    { href: "#auctions", label: "Đấu giá" },
    { href: "#videos", label: "Video" },
    { href: "#services", label: "Dịch vụ" },
    { href: "#process", label: "Quy trình" },
    { href: "/recruitment", label: "Tuyển dụng" },
    { href: "#contact", label: "Liên hệ" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img src={logo} alt="Đấu Giá Hợp Danh Miền Tây" className="h-14 w-auto" />
        </a>

        {/* Desktop nav - centered */}
        <div className="hidden md:flex items-center gap-5 font-body text-sm font-medium flex-1 justify-center">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-foreground/70 hover:text-primary transition-colors whitespace-nowrap">{l.label}</a>
          ))}
        </div>

        {/* Search button */}
        <div className="hidden md:flex items-center shrink-0">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-foreground/70 hover:text-primary transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground/70">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card px-4 py-3">
          <form onSubmit={handleSearch} className="container flex gap-2">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tài sản đấu giá..."
              className="flex-1 px-4 py-2 bg-secondary border border-border rounded-md text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-body font-semibold">Tìm</button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-foreground/70 hover:text-primary font-body text-sm font-medium">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
