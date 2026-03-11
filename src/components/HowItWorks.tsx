import { motion } from "framer-motion";
import { ClipboardCheck, FileSearch, Gavel, Handshake } from "lucide-react";

const steps = [
  { icon: FileSearch, title: "Tìm hiểu tài sản", desc: "Xem thông tin chi tiết tài sản, hồ sơ pháp lý và thông báo đấu giá." },
  { icon: ClipboardCheck, title: "Đăng ký tham gia", desc: "Nộp hồ sơ đăng ký, đặt tiền cọc theo quy định để tham gia đấu giá." },
  { icon: Gavel, title: "Tham gia đấu giá", desc: "Tham gia phiên đấu giá trực tiếp hoặc trực tuyến theo lịch trình." },
  { icon: Handshake, title: "Hoàn tất giao dịch", desc: "Ký hợp đồng mua bán, thanh toán và nhận bàn giao tài sản." },
];

const HowItWorks = () => {
  return (
    <section id="process" className="py-24 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-body text-sm tracking-widest uppercase font-semibold">Quy trình</span>
          <h2 className="text-3xl md:text-5xl font-display font-700 mt-3 mb-4">Quy Trình Đấu Giá</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Quy trình đấu giá minh bạch, chuyên nghiệp theo đúng quy định pháp luật.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-body font-bold flex items-center justify-center mx-auto" style={{ left: "calc(50% + 16px)" }}>
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-display font-600 mt-1 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
