import { motion } from "framer-motion";
import { FileText, Scale, Building2, MessageSquare, Landmark, } from "lucide-react";


const ServiceSection = () => {
  const services = [
    { icon: MessageSquare, title: "Tư vấn đấu giá/Sau đấu giá", desc: "Tư vấn pháp lý, thủ tục và hỗ trợ khách hàng trong quá trình đấu giá tài sản. ký kết hợp đồng mua bán ts, thủ tục cấp giấy chứng nhận quyền sử dung đất,..." },
    { icon: FileText, title: "Đấu giá quyền sử dụng đất/Quyền khai thác khoáng sản", desc: "Tổ chức đấu giá quyền sử dụng đất/quyền khai thác khoáng sản theo quyết định của cơ quan nhà nước có thẩm quyền." },
    { icon: Scale, title: "Đấu giá tài sản thi hành án", desc: "Đấu giá tài sản kê biên theo quyết định của cơ quan thi hành án dân sự." },
    { icon: Building2, title: "Đấu giá tài sản công", desc: "Đấu giá tài sản nhà nước, tài sản thanh lý, tài sản tịch thu sung quỹ." },
    { icon: Landmark, title: "Đấu giá tài sản khác", desc: "Đấu giá tài sản bảo đảm ngân hàng, tài sản thỏa thuận của các tổ chức, cá nhân và các loại tài sản khác theo quy định của pháp luật." },
    
  ];

  return (
    <section id="services" className="py-28 bg-[#6cb98d]/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#7f1d1d] font-body text-sm tracking-widest uppercase font-semibold">Dịch vụ</span>
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
