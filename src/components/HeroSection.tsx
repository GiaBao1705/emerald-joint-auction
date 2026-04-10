import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import bannerImg from "@/assets/banner.jpg";

const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);

  const { data: heroSettings } = useQuery({
    queryKey: ["hero-settings"],
    queryFn: async () => {
      const { data } = await (supabase.from as any)("site_settings")
        .select("*")
        .in("key", ["hero_video_url", "use_video_hero"]);
      const map: Record<string, string> = {};
      (data || []).forEach((item: any) => { map[item.key] = item.value || ""; });
      return map;
    },
  });

  const useVideo = heroSettings?.use_video_hero === "true";
  const videoUrl = heroSettings?.hero_video_url || "";
  const showVideo = useVideo && videoUrl && !videoError;

  return (
    <section className="pt-20 relative w-full overflow-hidden bg-background">
      {/* Banner image */}
      <div className="relative">
        <img
          src={bannerImg}
          alt="Công Ty Đấu Giá Hợp Danh Miền Tây"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-foreground/10 pointer-events-none" />
      </div>

      {/* 2-column: Video left + Text right */}
      <div className="container py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Left: Video */}
          <div className="shrink-0">
            {showVideo ? (
              <div className="w-[320px] h-[180px] md:w-[460px] md:h-[259px] rounded-2xl overflow-hidden shadow-xl border border-border bg-foreground/5">
                <video
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  onError={() => setVideoError(true)}
                />
              </div>
            ) : (
              <div className="w-[320px] h-[180px] md:w-[460px] md:h-[259px] rounded-2xl overflow-hidden shadow-xl border border-border bg-muted flex items-center justify-center">
                <span className="text-muted-foreground font-body text-sm">Video chưa được cấu hình</span>
              </div>
            )}
          </div>

          {/* Right: Text */}
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display leading-tight mb-5">
              Công Ty Đấu Giá Hợp Danh <span className="text-primary">Miền Tây</span>
            </h1>
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8">
              Đơn vị đấu giá tài sản uy tín, chuyên nghiệp hàng đầu khu vực Đồng bằng sông Cửu Long.
            </p>
            <a
              href="#auctions"
              className="inline-flex items-center px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
            >
              Xem tài sản đấu giá
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
