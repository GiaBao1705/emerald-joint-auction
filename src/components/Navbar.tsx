import { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav 
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        hasScrolled 
          ? "bg-white shadow-md border-b border-gray-200" 
          : "!bg-transparent"
      }`}
      style={{
        backgroundColor: hasScrolled ? "#ffffff" : "transparent !important",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <a href="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="Đấu Giá Hợp Danh Miền Tây"
            className={`h-14 w-auto transition-all duration-300 ${
              hasScrolled ? "" : "brightness-150 contrast-125 drop-shadow-md"
            }`}
          />
        </a>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm flex-1 justify-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors whitespace-nowrap ${
                hasScrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white drop-shadow-md hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-3 rounded-full transition-all ${
              hasScrolled 
                ? "text-gray-600 hover:bg-gray-100" 
                : "text-white hover:bg-white/20"
            }`}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-3 rounded-full transition-colors ${
            hasScrolled ? "text-gray-700" : "text-white"
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className={`border-t transition-colors duration-300 ${hasScrolled ? "bg-white" : "bg-transparent backdrop-blur-sm"} px-6 py-4`}>
          <form onSubmit={handleSearch} className="max-w-7xl mx-auto flex gap-3">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tài sản đấu giá..."
              className="flex-1 px-5 py-3 bg-white/30 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-white/60"
              autoFocus
            />
            <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
              Tìm
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t transition-colors duration-300 ${hasScrolled ? "bg-white" : "bg-transparent backdrop-blur-sm"} px-6 py-6 space-y-4`}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 font-medium transition-colors ${hasScrolled ? "text-gray-700 hover:text-blue-600" : "text-white drop-shadow-md hover:text-white/90"}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;