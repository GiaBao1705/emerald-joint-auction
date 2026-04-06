import logo from "@/assets/logo.png";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Footer = () => {
  const { data: settings } = useSiteSettings();

  const phone = settings?.phone || "0292 123 4567";
  const email = settings?.email || "info@daugiamientay.vn";
  const address = settings?.address || "123 Đường 3/2, Q. Ninh Kiều, TP. Cần Thơ";
  const companyName = settings?.company_name || "Công ty Đấu giá Hợp danh Miền Tây";
  const companyDesc = settings?.company_description || "Công ty Đấu giá Hợp danh Miền Tây — Đơn vị đấu giá tài sản uy tín, chuyên nghiệp tại khu vực miền Tây Nam Bộ.";

  return (
    <footer id="contact" className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src={logo} alt="Logo" className="h-14 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/70 font-body max-w-xs leading-relaxed">
              {companyDesc}
            </p>
          </div>
          <div>
            <h4 className="font-display font-600 mb-4 text-primary-foreground">Liên kết</h4>
            <ul className="space-y-2 text-sm font-body text-primary-foreground/70">
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">Giới thiệu</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Dịch vụ</a></li>
              <li><a href="#auctions" className="hover:text-primary-foreground transition-colors">Tài sản đấu giá</a></li>
              <li><a href="#process" className="hover:text-primary-foreground transition-colors">Quy trình</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-600 mb-4 text-primary-foreground">Liên hệ</h4>
            <ul className="space-y-3 text-sm font-body text-primary-foreground/70">
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> {phone}</li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> {email}</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-primary-foreground/15 text-center text-xs text-primary-foreground/50 font-body">
          © 2026 {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
