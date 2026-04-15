import { motion } from "framer-motion";
import { Award, Scale, Shield, Users } from "lucide-react";

const features = [
  { icon: Shield, title: "Uy tín & Pháp lý", desc: "Hoạt động theo đúng quy định của Luật Đấu giá tài sản, đảm bảo quyền lợi các bên." },
  { icon: Scale, title: "Minh bạch", desc: "Quy trình đấu giá công khai, minh bạch, đảm bảo tính công bằng cho tất cả người tham gia." },
  { icon: Users, title: "Đội ngũ chuyên nghiệp", desc: "Đấu giá viên có chứng chỉ hành nghề, nhiều năm kinh nghiệm trong lĩnh vực đấu giá." },
  { icon: Award, title: "Hiệu quả cao", desc: "Tỷ lệ đấu giá thành công cao, tối ưu giá trị tài sản cho người có tài sản đấu giá." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm tracking-widest uppercase font-semibold">Về chúng tôi</span>
          <h2 className="text-3xl md:text-5xl font-display font-700 mt-3 mb-4">Vì Sao Nên Chọn Chúng Tôi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Công ty Đấu giá Hợp danh Miền Tây là đơn vị đấu giá tài sản uy tín, hoạt động chuyên nghiệp theo đúng quy định của pháp luật Việt Nam.
Chúng tôi cam kết mang đến giải pháp minh bạch, hiệu quả và tối ưu giá trị cho khách hàng.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-lg border border-border bg-background hover:shadow-md transition-shadow text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-600 text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
