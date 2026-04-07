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
    <footer id="contact" className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display font-700 text-xl mb-3">{companyName}</h3>
            <p className="text-sm text-primary-foreground/70 font-body max-w-xs leading-relaxed mb-4">
              {companyDesc}
            </p>
            <ul className="space-y-2 text-sm font-body text-primary-foreground/70">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> {phone}</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> {email}</li>
              <li className="flex items-center gap-2"><Globe className="w-4 h-4 shrink-0" /> {website}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-600 mb-4 text-primary-foreground">Liên kết</h4>
            <ul className="space-y-2 text-sm font-body text-primary-foreground/70">
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">Giới thiệu</a></li>
              <li><a href="#auctions" className="hover:text-primary-foreground transition-colors">Tài sản đấu giá</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Dịch vụ</a></li>
              <li><a href="#process" className="hover:text-primary-foreground transition-colors">Quy trình</a></li>
              <li><a href="/recruitment" className="hover:text-primary-foreground transition-colors">Tuyển dụng</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1 md:col-span-2">
            <h4 className="font-display font-600 mb-4 text-primary-foreground">Hệ thống văn phòng</h4>
            <ul className="space-y-3 text-sm font-body text-primary-foreground/70">
              {offices.map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span><strong className="text-primary-foreground">{o.name}:</strong> {o.address}</span>
                </li>
              ))}
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
