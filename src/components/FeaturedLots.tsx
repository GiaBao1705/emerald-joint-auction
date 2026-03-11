import { motion } from "framer-motion";
import { Building2, Car, Home, Landmark, MapPin, TreePine } from "lucide-react";

const auctions = [
  { id: 1, name: "Quyền sử dụng đất tại TP. Cần Thơ", location: "Cần Thơ", type: "Bất động sản", area: "150 m²", price: "2.5 tỷ VNĐ", icon: Home, status: "Đang nhận hồ sơ" },
  { id: 2, name: "Lô đất nền khu dân cư Vĩnh Long", location: "Vĩnh Long", type: "Đất nền", area: "200 m²", price: "1.8 tỷ VNĐ", icon: Landmark, status: "Sắp diễn ra" },
  { id: 3, name: "Tài sản thi hành án - Xe ô tô", location: "An Giang", type: "Phương tiện", area: "—", price: "850 triệu VNĐ", icon: Car, status: "Đang nhận hồ sơ" },
  { id: 4, name: "Nhà đất huyện Phong Điền", location: "Cần Thơ", type: "Nhà ở", area: "320 m²", price: "3.2 tỷ VNĐ", icon: Building2, status: "Đang nhận hồ sơ" },
  { id: 5, name: "Đất nông nghiệp Kiên Giang", location: "Kiên Giang", type: "Đất nông nghiệp", area: "5,000 m²", price: "4.1 tỷ VNĐ", icon: TreePine, status: "Sắp diễn ra" },
  { id: 6, name: "Quyền sử dụng đất tại Sóc Trăng", location: "Sóc Trăng", type: "Bất động sản", area: "180 m²", price: "1.5 tỷ VNĐ", icon: Home, status: "Đang nhận hồ sơ" },
];

const FeaturedLots = () => {
  return (
    <section id="auctions" className="py-24 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm tracking-widest uppercase font-semibold">Tài sản đấu giá</span>
          <h2 className="text-3xl md:text-5xl font-display font-700 mt-3 mb-4 text-foreground">Danh Sách Đấu Giá</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Các tài sản đang được tổ chức đấu giá công khai, minh bạch theo quy định pháp luật.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-xs font-body font-semibold px-3 py-1 rounded-full ${
                    item.status === "Đang nhận hồ sơ" 
                      ? "bg-green-brand/10 text-green-brand" 
                      : "bg-gold-accent/10 text-gold-accent"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-lg font-display font-600 mb-3 group-hover:text-primary transition-colors leading-snug">{item.name}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground font-body mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{item.location}</span>
                  <span className="px-2 py-0.5 bg-secondary rounded text-xs">{item.type}</span>
                  {item.area !== "—" && <span className="text-xs">{item.area}</span>}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-xs text-muted-foreground font-body block">Giá khởi điểm</span>
                    <span className="text-xl font-display font-700 text-accent">{item.price}</span>
                  </div>
                  <a href="#" className="text-sm font-body font-semibold text-primary hover:underline">Chi tiết →</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLots;
