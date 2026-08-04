import { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/#about", label: "Giới thiệu" },
    { href: "/#services", label: "Dịch vụ" },
    { href: "/#auctions", label: "Đấu giá" },
    { href: "/#process", label: "Quy trình" },
    { href: "/#news", label: "Tin tức" },
    { href: "/recruitment", label: "Tuyển dụng" },
    { href: "/#contact", label: "Liên hệ" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    if (href === "/recruitment") {
      navigate("/recruitment");
      return;
    }

    window.location.href = href;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        hasScrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "!bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center shrink-0"
        >
          <span
            className={`text-lg font-semibold transition-all duration-300 ${
              hasScrolled ? "text-gray-900" : "text-white"
            }`}
          ></span>
        </button>

        <div className="hidden md:flex items-center gap-12 font-medium text-base flex-1 justify-center">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href)}
              className={`transition-colors whitespace-nowrap ${
                hasScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-green-950 hover:text-green-600"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-3 rounded-full transition-all ${
              hasScrolled
                ? "text-gray-600 hover:bg-gray-100"
                : "text-black hover:bg-gray/20"
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

      {searchOpen && (
        <div
          className={`border-t transition-all duration-300 ${
            hasScrolled ? "bg-white" : "bg-black/70 backdrop-blur-md"
          } px-6 py-4`}
        >
          <form onSubmit={handleSearch} className="max-w-7xl mx-auto flex gap-3">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tài sản đấu giá, mã lô, tên khách hàng..."
              className="flex-1 px-5 py-3.5 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 placeholder:text-gray-400 text-base"
              autoFocus
            />
            <button
              type="submit"
              className="px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Tìm kiếm
            </button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div
          className={`md:hidden border-t transition-colors duration-300 ${
            hasScrolled ? "bg-white" : "bg-transparent backdrop-blur-sm"
          } px-6 py-6 space-y-4`}
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href)}
              className={`block w-full text-left py-3 font-semibold text-base transition-colors ${
                hasScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-green-700 hover:text-green-400"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;