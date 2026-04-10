import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Footer = () => {
  const { data: settings } = useSiteSettings();

  const phone = settings?.phone || "02773.857.772";
  const email = settings?.email || "info@daugiamientaydt.com";
  const website = settings?.website || "www.daugiamientaydt.com";
  const companyName = settings?.company_name || "Công ty Đấu giá Hợp danh Miền Tây";
  const companyDesc = settings?.company_description || "Công ty Đấu giá Hợp danh Miền Tây — Đơn vị đấu giá tài sản uy tín, chuyên nghiệp.";

  const offices = [
    { name: "Trụ sở chính", address: "Số 216 Đường Trần Hưng Đạo, phường 1, TP. Cao Lãnh, tỉnh Đồng Tháp" },
    { name: "VP đại diện Tam Nông", address: "Đường Huỳnh Công Sính, khóm 2, TT Tràm Chim, huyện Tam Nông, tỉnh Đồng Tháp (Khu ao sen TT Tràm Chim)" },
    { name: "Chi nhánh Vĩnh Long", address: "Số 134/1 đường Trần Phú, khóm 2, phường 4, TP. Vĩnh Long, tỉnh Vĩnh Long" },
    { name: "Chi nhánh Cần Thơ", address: "Số 298/1A đường Tầm Vu, phường Hưng Lợi, quận Ninh Kiều, TP. Cần Thơ" },
  ];

  return (
    <footer id="contact" className="py-20 bg-[hsl(125,55%,15%)] text-primary-foreground">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div>
            <h3 className="font-display text-xl mb-4 text-primary-foreground">{companyName}</h3>
            <p className="text-sm text-primary-foreground/65 font-body max-w-xs leading-relaxed mb-5">
              {companyDesc}
            </p>
            <ul className="space-y-3 text-sm font-body text-primary-foreground/65">
              <li className="flex items-center gap-2 hover:text-primary-foreground/90 transition-colors"><Phone className="w-4 h-4 shrink-0" /> {phone}</li>
              <li className="flex items-center gap-2 hover:text-primary-foreground/90 transition-colors"><Mail className="w-4 h-4 shrink-0" /> {email}</li>
              <li className="flex items-center gap-2 hover:text-primary-foreground/90 transition-colors"><Globe className="w-4 h-4 shrink-0" /> {website}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display mb-5 text-accent">Liên kết</h4>
            <ul className="space-y-3 text-sm font-body text-primary-foreground/65">
              <li><a href="#about" className="hover:text-primary-foreground hover:translate-x-1 inline-block transition-all duration-200">Giới thiệu</a></li>
              <li><a href="#auctions" className="hover:text-primary-foreground hover:translate-x-1 inline-block transition-all duration-200">Tài sản đấu giá</a></li>
              <li><a href="#services" className="hover:text-primary-foreground hover:translate-x-1 inline-block transition-all duration-200">Dịch vụ</a></li>
              <li><a href="#process" className="hover:text-primary-foreground hover:translate-x-1 inline-block transition-all duration-200">Quy trình</a></li>
              <li><a href="/recruitment" className="hover:text-primary-foreground hover:translate-x-1 inline-block transition-all duration-200">Tuyển dụng</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1 md:col-span-2">
            <h4 className="font-display mb-5 text-accent">Hệ thống văn phòng</h4>
            <ul className="space-y-4 text-sm font-body text-primary-foreground/65">
              {offices.map((o, i) => (
                <li key={i} className="flex items-start gap-2 hover:text-primary-foreground/90 transition-colors">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent/70" />
                  <span><strong className="text-primary-foreground/85">{o.name}:</strong> {o.address}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40 font-body">
          © 2026 {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
