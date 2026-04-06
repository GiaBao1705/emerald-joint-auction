import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, FileText, MapPin, Ruler } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await supabase.from("properties").select("*").eq("id", id!).single();
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 container">
          <p className="text-muted-foreground font-body">Đang tải...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 container text-center">
          <h1 className="text-2xl font-display font-700 mb-4">Không tìm thấy tài sản</h1>
          <Link to="/#auctions" className="text-primary font-body underline">← Quay lại danh sách</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 container max-w-4xl">
        <Link to="/#auctions" className="inline-flex items-center gap-2 text-sm text-muted-foreground font-body hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </Link>

        {property.image_url && (
          <img src={property.image_url} alt={property.name} className="w-full h-64 md:h-96 object-cover rounded-lg mb-8" />
        )}

        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <h1 className="text-2xl md:text-4xl font-display font-700 text-foreground">{property.name}</h1>
          <span className={`text-sm font-body font-semibold px-4 py-1.5 rounded-full ${
            property.status === "Đang nhận hồ sơ"
              ? "bg-green-brand/15 text-green-brand"
              : property.status === "Sắp diễn ra"
              ? "bg-accent/15 text-accent"
              : "bg-muted text-muted-foreground"
          }`}>
            {property.status}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {property.location && (
            <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground font-body block">Vị trí</span>
                <span className="font-body font-medium text-sm">{property.location}</span>
              </div>
            </div>
          )}
          {property.area && (
            <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
              <Ruler className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground font-body block">Diện tích</span>
                <span className="font-body font-medium text-sm">{property.area}</span>
              </div>
            </div>
          )}
          {property.property_type && (
            <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
              <FileText className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground font-body block">Loại tài sản</span>
                <span className="font-body font-medium text-sm">{property.property_type}</span>
              </div>
            </div>
          )}
          {property.auction_date && (
            <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground font-body block">Ngày đấu giá</span>
                <span className="font-body font-medium text-sm">
                  {new Date(property.auction_date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-accent/10 border border-accent/20 rounded-lg mb-8">
          <span className="text-sm text-muted-foreground font-body block mb-1">Giá khởi điểm</span>
          <span className="text-3xl font-display font-700 text-accent">{property.starting_price || "Liên hệ"}</span>
        </div>

        {property.description && (
          <div className="mb-8">
            <h2 className="text-xl font-display font-600 mb-4">Mô tả chi tiết</h2>
            <p className="text-foreground/80 font-body leading-relaxed whitespace-pre-line">{property.description}</p>
          </div>
        )}

        {property.documents_url && (
          <div className="mb-8">
            <h2 className="text-xl font-display font-600 mb-4">Hồ sơ tài sản</h2>
            <a
              href={property.documents_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              <FileText className="w-4 h-4" /> Tải hồ sơ tài sản
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
