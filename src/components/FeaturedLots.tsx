import { motion } from "framer-motion";
import { Building2, Car, Home, Landmark, MapPin, TreePine } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  "Bất động sản": Home,
  "Đất nền": Landmark,
  "Phương tiện": Car,
  "Nhà ở": Building2,
  "Đất nông nghiệp": TreePine,
};

const FeaturedLots = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties-public"],
    queryFn: async () => {
      const { data } = await supabase.from("properties").select("*").eq("published", true).order("created_at", { ascending: false });
      return data || [];
    },
  });

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

        {isLoading ? (
          <p className="text-center text-muted-foreground font-body">Đang tải...</p>
        ) : !properties?.length ? (
          <p className="text-center text-muted-foreground font-body">Hiện chưa có tài sản đấu giá.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((item, i) => {
              const Icon = iconMap[item.property_type || ""] || Home;
              return (
                <motion.a
                  href={`/property/${item.id}`}
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group block"
                >
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className={`text-xs font-body font-semibold px-3 py-1 rounded-full ${
                        item.status === "Đang nhận hồ sơ"
                          ? "bg-green-brand/15 text-green-brand"
                          : item.status === "Sắp diễn ra"
                          ? "bg-accent/15 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-600 mb-3 group-hover:text-primary transition-colors leading-snug">{item.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground font-body mb-4">
                      {item.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{item.location}</span>}
                      {item.property_type && <span className="px-2 py-0.5 bg-secondary rounded text-xs">{item.property_type}</span>}
                      {item.area && <span className="text-xs">{item.area}</span>}
                    </div>
                    {item.description && <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">{item.description}</p>}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-xs text-muted-foreground font-body block">Giá khởi điểm</span>
                        <span className="text-xl font-display font-700 text-accent">{item.starting_price || "Liên hệ"}</span>
                      </div>
                      {item.auction_date && (
                        <span className="text-xs text-muted-foreground font-body">
                          {new Date(item.auction_date).toLocaleDateString("vi-VN")}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedLots;
