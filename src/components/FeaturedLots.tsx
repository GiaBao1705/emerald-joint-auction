import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Car, Home, Landmark, MapPin, TreePine, Search, Package, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { formatDateDisplay } from "@/lib/utils";
import { getEffectivePropertyStatus } from "@/lib/property-status";

const PROPERTY_CATEGORIES = ["Bất động sản", "Động sản", "Tài sản khác"] as const;
const PAGE_SIZE = 6;

const getAssetCategory = (property: { name: string; property_type: string | null; area: string | null; description: string | null }) => {
  const searchableText = [property.property_type, property.name, property.area, property.description]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("vi-VN");

  if (["bất động sản", "quyền sử dụng đất", "qsdđ", "thửa đất", "đất nền", "đất nông nghiệp", "nhà ở", "nhà đất", "căn hộ", "m2", "m²"]
    .some(keyword => searchableText.includes(keyword))) return "Bất động sản";

  if (["động sản", "phương tiện", "xe ô tô", "ô tô", "xe máy", "máy móc", "thiết bị", "tàu thuyền"]
    .some(keyword => searchableText.includes(keyword))) return "Động sản";

  return "Tài sản khác";
};

const iconMap: Record<string, any> = {
  "Bất động sản": Home,
  "Động sản": Car,
  "Tài sản khác": Package,
  "Đất nền": Landmark,
  "Phương tiện": Car,
  "Nhà ở": Building2,
  "Đất nông nghiệp": TreePine,
};

const FeaturedLots = () => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties-public"],
    queryFn: async () => {
      const { data } = await supabase.from("properties").select("*").eq("published", true).order("created_at", { ascending: false });
      return data || [];
    },
  });

  const filtered = useMemo(() => {
    if (!properties) return [];
    let result = properties;
    if (activeCategory) result = result.filter(p => getAssetCategory(p) === activeCategory);
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.location || "").toLowerCase().includes(q) ||
        (p.property_type || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      );
    }
    return [...result].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  }, [properties, activeCategory, localSearch]);

  const visibleProperties = filtered.slice(0, visibleCount);

  // Group by category for display
  const groupedByCategory = useMemo(() => {
    return PROPERTY_CATEGORIES
      .map(category => [category, visibleProperties.filter(property => getAssetCategory(property) === category)] as const)
      .filter(([, items]) => items.length > 0);
  }, [visibleProperties]);

  return (
    <section id="auctions" className="py-24 bg-white">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-700 mt-3 mb-4 text-foreground">Danh Sách Tài sản đấu giá</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Các tài sản đang được tổ chức đấu giá công khai, minh bạch theo quy định pháp luật.
          </p>
        </motion.div>

        {/* Search + Category Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={localSearch}
              onChange={e => { setLocalSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
              placeholder="Tìm kiếm theo tên, vị trí..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => { setActiveCategory(null); setVisibleCount(PAGE_SIZE); }}
              className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${!activeCategory ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground/70 hover:text-foreground"}`}>
              Tất cả
            </button>
            {PROPERTY_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}
                className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground/70 hover:text-foreground"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground font-body">Đang tải...</p>
        ) : !filtered.length ? (
          <p className="text-center text-muted-foreground font-body">Không tìm thấy tài sản phù hợp.</p>
        ) : (
          <>
          <div className="space-y-12">
            {groupedByCategory.map(([category, items]) => {
              const CatIcon = iconMap[category] || Package;
              const categoryCount = filtered.filter(property => getAssetCategory(property) === category).length;
              return (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-[#6cb98d]/20 flex items-center justify-center">
                      <CatIcon className="w-5 h-5 text-[#6cb98d]" />
                    </div>
                    <h3 className="text-xl font-display font-600 text-foreground">{category}</h3>
                    <span className="text-sm text-muted-foreground font-body">({categoryCount})</span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {items.map((item, i) => {
                      const Icon = iconMap[item.property_type || ""] || iconMap[getAssetCategory(item)] || Home;
                      const status = getEffectivePropertyStatus(item.status, item.acceptance_end_at ?? item.acceptance_start_at);
                      return (
                        <motion.a href={`/property/${item.id}`} key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                          className="self-start h-fit bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block">
                          <div className="w-full h-[160px] sm:h-[190px] overflow-hidden rounded-t-xl bg-muted">
                            <img
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-contain object-center bg-muted transition-transform duration-500 group-hover:scale-105 brightness-110"
                              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                            />
                          </div>
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <span className={`text-xs font-body font-semibold px-3 py-1 rounded-full ${
                                status === "Đang nhận hồ sơ" ? "bg-green-brand/15 text-green-brand"
                                : status === "Sắp diễn ra" ? "bg-[#6cb98d]/15 text-[#6cb98d]"
                                : "bg-muted text-muted-foreground"
                              }`}>{status}</span>
                            </div>
                            <h3 className="text-lg font-display font-600 mb-2 group-hover:text-[#6cb98d] transition-colors leading-snug">{item.name}</h3>
                            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground font-body mb-3">
                              {item.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{item.location}</span>}
                              {item.property_type && <span className="px-2 py-0.5 bg-secondary rounded text-xs">{item.property_type}</span>}
                              {(item.acceptance_end_at || item.acceptance_start_at) && (
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDateDisplay(item.acceptance_end_at || item.acceptance_start_at, true)}</span>
                              )}
                              {item.area && <span className="text-xs">{item.area}</span>}
                            </div>
                            {item.description && <p className="text-sm text-muted-foreground font-body mb-3 line-clamp-2">{item.description}</p>}
                            <div className="flex items-center justify-between pt-3 border-t border-border">
                              <div>
                                <span className="text-xs text-muted-foreground font-body block">Giá khởi điểm</span>
                                <span className="text-xl font-display font-700 text-accent">{item.starting_price || "Liên hệ"}</span>
                              </div>
                              {item.auction_date && (
                                <span className="text-xs text-muted-foreground font-body">
                                  {formatDateDisplay(item.auction_date, true)}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {visibleCount < filtered.length && (
            <div className="mt-10 flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground font-body">
                Đang hiển thị {visibleProperties.length} / {filtered.length} tài sản
              </p>
              <button
                type="button"
                onClick={() => setVisibleCount(count => Math.min(count + PAGE_SIZE, filtered.length))}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Xem thêm tài sản
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedLots;
