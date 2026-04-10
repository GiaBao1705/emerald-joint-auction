import { motion } from "framer-motion";
import { FileText, Scale, Building2, MessageSquare } from "lucide-react";

const ServiceSection = () => {
  const services = [
    { icon: FileText, title: "Đấu giá quyền sử dụng đất", desc: "Tổ chức đấu giá quyền sử dụng đất theo quyết định của cơ quan nhà nước có thẩm quyền." },
    { icon: Scale, title: "Đấu giá tài sản thi hành án", desc: "Đấu giá tài sản kê biên theo quyết định của cơ quan thi hành án dân sự." },
    { icon: Building2, title: "Đấu giá tài sản công", desc: "Đấu giá tài sản nhà nước, tài sản thanh lý, tài sản tịch thu sung quỹ." },
    { icon: MessageSquare, title: "Tư vấn đấu giá", desc: "Tư vấn pháp lý, thủ tục và hỗ trợ khách hàng trong quá trình đấu giá tài sản." },
  ];

  return (
    <section id="services" className="py-28 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm tracking-widest uppercase font-semibold">Dịch vụ</span>
          <h2 className="text-3xl md:text-5xl font-display mt-3 mb-4">Dịch Vụ Đấu Giá</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 p-7 bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center mt-1 group-hover:bg-accent/20 transition-colors duration-300">
                <svc.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-display text-lg mb-2">{svc.title}</h3>
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
