import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, FileText, MapPin, Ruler, ChevronLeft, ChevronRight } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = useState(0);

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await supabase.from("properties").select("*").eq("id", id!).single();
      return data;
    },
    enabled: !!id,
  });

  const { data: galleryImages } = useQuery({
    queryKey: ["property-images", id],
    queryFn: async () => {
      const { data } = await (supabase.from as any)("property_images")
        .select("*")
        .eq("property_id", id!)
        .order("display_order", { ascending: true });
      return data || [];
    },
    enabled: !!id,
  });

  const allImages = [
    ...(property?.image_url ? [{ image_url: property.image_url, id: "main" }] : []),
    ...(galleryImages || []),
  ];

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

        {/* Image Gallery */}
        {allImages.length > 0 && (
          <div className="mb-8">
            <div className="relative">
              <img
                src={allImages[currentImage]?.image_url}
                alt={property.name}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage(i => (i - 1 + allImages.length) % allImages.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImage(i => (i + 1) % allImages.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentImage ? "bg-primary" : "bg-background/60"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-colors ${idx === currentImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <h1 className="text-2xl md:text-4xl font-display font-700 text-foreground">{property.name}</h1>
          <span className={`text-sm font-body font-semibold px-4 py-1.5 rounded-full ${
            property.status === "Đang nhận hồ sơ" ? "bg-green-brand/15 text-green-brand"
            : property.status === "Sắp diễn ra" ? "bg-accent/15 text-accent"
            : "bg-muted text-muted-foreground"
          }`}>{property.status}</span>
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
          {property.status === "Đang nhận hồ sơ" && (
            <>
              {property.sale_start_at && (
                <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground font-body block">Thời gian bán hồ sơ</span>
                    <span className="font-body font-medium text-sm">
                      {new Date(property.sale_start_at).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              )}
              {property.acceptance_start_at && (
                <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground font-body block">Thời gian tiếp nhận hồ sơ</span>
                    <span className="font-body font-medium text-sm">
                      {new Date(property.acceptance_start_at).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {property.status === "Sắp diễn ra" && property.auction_date && (
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
            <a href={property.documents_url} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-md hover:opacity-90 transition-opacity text-sm">
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
