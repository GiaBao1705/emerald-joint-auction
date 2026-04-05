import { motion } from "framer-motion";
import bannerImg from "@/assets/banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img src={bannerImg} alt="Đấu Giá Hợp Danh Miền Tây" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(150,30%,12%)]/90 via-[hsl(150,30%,12%)]/65 to-transparent" />
      </div>
      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/90 font-body text-sm tracking-wide">
              Đang nhận hồ sơ đấu giá
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-800 leading-[1.1] mb-6 text-white">
            Công Ty Đấu Giá
            <br />
            Hợp Danh{" "}
            <span className="text-accent">Miền Tây</span>
          </h1>
          <p className="text-lg text-white/80 max-w-lg mb-4 font-body leading-relaxed">
            Chuyên nghiệp — Công Tâm — Chuẩn mực
          </p>
          <p className="text-sm text-white/60 max-w-lg mb-8 font-body">
            Địa chỉ: Số 66 Đường Trần Hưng Đạo, Phường 1, TP. Cao Lãnh, tỉnh Đồng Tháp
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#auctions" className="inline-flex items-center px-8 py-3.5 bg-accent text-accent-foreground font-body font-semibold rounded-md hover:opacity-90 transition-opacity">
              Xem tài sản đấu giá
            </a>
            <a href="#articles" className="inline-flex items-center px-8 py-3.5 border border-white/25 text-white font-body font-semibold rounded-md hover:bg-white/10 transition-colors">
              Tin tức & Bài viết
            </a>
          </div>
          
          <div className="flex gap-12 mt-14 pt-8 border-t border-white/15">
            {[
              { num: "500+", label: "Cuộc đấu giá" },
              { num: "1,200+", label: "Tài sản đã bán" },
              { num: "98%", label: "Tỷ lệ thành công" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-display font-700 text-accent">{stat.num}</div>
                <div className="text-sm text-white/50 font-body mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
