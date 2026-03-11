import { motion } from "framer-motion";
import { FileText, Mail, MapPin, Phone } from "lucide-react";

const ServiceSection = () => {
  const services = [
    { title: "Đấu giá quyền sử dụng đất", desc: "Tổ chức đấu giá quyền sử dụng đất theo quyết định của cơ quan nhà nước có thẩm quyền." },
    { title: "Đấu giá tài sản thi hành án", desc: "Đấu giá tài sản kê biên theo quyết định của cơ quan thi hành án dân sự." },
    { title: "Đấu giá tài sản công", desc: "Đấu giá tài sản nhà nước, tài sản thanh lý, tài sản tịch thu sung quỹ." },
    { title: "Tư vấn đấu giá", desc: "Tư vấn pháp lý, thủ tục và hỗ trợ khách hàng trong quá trình đấu giá tài sản." },
  ];

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm tracking-widest uppercase font-semibold">Dịch vụ</span>
          <h2 className="text-3xl md:text-5xl font-display font-700 mt-3 mb-4">Dịch Vụ Đấu Giá</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center mt-1">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-600 text-lg mb-2">{svc.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
