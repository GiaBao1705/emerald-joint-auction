import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Footer = () => {
  const { data: settings } = useSiteSettings();

  const phone = settings?.phone || "02773.857.772";
  const email = settings?.email || "daugiamientaydt@gmail.com";
  const companyName = settings?.company_name || "Công ty Đấu giá Hợp danh Miền Tây";
  const companyDesc = settings?.company_description || "Công ty Đấu giá Hợp danh Miền Tây — Đơn vị đấu giá tài sản uy tín, chuyên nghiệp.";

  const offices = [
    { name: "Trụ sở chính", address: "Số 216 Trần Hưng Đạo, phường Cao Lãnh, tỉnh Đồng Tháp" },
    { name: "VP đại diện Tam Nông", address: "Đường Huỳnh Công Sính, khóm 2, TT Tràm Chim, huyện Tam Nông, tỉnh Đồng Tháp (Khu ao sen TT Tràm Chim)" },
    { name: "Chi nhánh Vĩnh Long", address: "Số 134/1 đường Trần Phú, khóm 2, phường 4, tỉnh Vĩnh Long" },
    { name: "Chi nhánh Cần Thơ", address: "Số 298/1A đường Tầm Vu, phường Tân An, thành phố Cần Thơ" },
  ];

  return (
    <footer id="contact" className="py-20 bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-fg))]">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div>
            <h3 className="font-display text-xl mb-4 text-[hsl(var(--footer-fg))]">{companyName}</h3>
            <p className="text-sm text-[hsl(var(--footer-muted))] font-body max-w-xs leading-relaxed mb-5">
              {companyDesc}
            </p>
            <ul className="space-y-3 text-sm font-body text-[hsl(var(--footer-muted))]">
              <li className="flex items-center gap-2 hover:text-[hsl(var(--footer-fg))] transition-colors"><Phone className="w-4 h-4 shrink-0" /> {phone}</li>
              <li className="flex items-center gap-2 hover:text-[hsl(var(--footer-fg))] transition-colors"><Mail className="w-4 h-4 shrink-0" /> {email}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display mb-5 text-accent">Liên kết</h4>
            <ul className="space-y-3 text-sm font-body text-[hsl(var(--footer-muted))]">
              <li><a href="#about" className="hover:text-hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">Giới thiệu</a></li>
              <li><a href="#auctions" className="hover:text-hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">Tài sản đấu giá</a></li>
              <li><a href="#services" className="hover:text-hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">Dịch vụ</a></li>
              <li><a href="#process" className="hover:text-hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">Quy trình</a></li>
              <li><a href="/recruitment" className="hover:text-hover:text-emerald-300 hover:translate-x-1 inline-block transition-all duration-200">Tuyển dụng</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1 md:col-span-2">
            <h4 className="font-display mb-5 text-accent">Hệ thống văn phòng</h4>
            <ul className="space-y-4 text-sm font-body text-[hsl(var(--footer-muted))]">
              {offices.map((o, i) => (
                <li key={i} className="flex items-start gap-2 hover:text-[hsl(var(--footer-fg))] transition-colors">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent/70" />
                  <span><strong className="text-[hsl(var(--footer-fg)/0.85)]">{o.name}:</strong> {o.address}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-[hsl(var(--footer-fg)/0.1)] text-center text-xs text-[hsl(var(--footer-fg)/0.4)] font-body">
          © 2026 {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
