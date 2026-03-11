import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-20">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="Đấu Giá Hợp Danh Miền Tây" className="h-14 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-6 font-body text-sm font-medium">
          <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">Giới thiệu</a>
          <a href="#services" className="text-foreground/70 hover:text-primary transition-colors">Dịch vụ</a>
          <a href="#auctions" className="text-foreground/70 hover:text-primary transition-colors">Đấu giá</a>
          <a href="#process" className="text-foreground/70 hover:text-primary transition-colors">Quy trình</a>
          <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Liên hệ</a>
          <a href="#" className="px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded-md hover:opacity-90 transition-opacity text-sm">
            Đăng ký đấu giá
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
