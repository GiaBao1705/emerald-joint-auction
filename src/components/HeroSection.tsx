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
      {/* Banner background */}
      <div className="relative">
        <img
          src={bannerImg}
          alt="Công Ty Đấu Giá Hợp Danh Miền Tây"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-foreground/10 pointer-events-none" />

        {/* 2-column overlay inside banner */}
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
              {/* Left: Video */}
              {showVideo && (
                <div className="shrink-0">
                  <div className="w-[320px] h-[180px] md:w-[450px] md:h-[253px] rounded-2xl overflow-hidden shadow-2xl border border-primary-foreground/20 bg-foreground/80">
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
                </div>
              )}

              {/* Right: Text */}
              <div className="max-w-lg text-center md:text-left">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-display leading-tight mb-4 text-primary-foreground drop-shadow-lg">
                  Công Ty Đấu Giá Hợp Danh{" "}
                  <span className="text-accent">Miền Tây</span>
                </h1>
                <p className="text-primary-foreground/80 font-body text-sm md:text-base leading-relaxed mb-6 drop-shadow">
                  Đơn vị đấu giá tài sản uy tín, chuyên nghiệp hàng đầu khu vực Đồng bằng sông Cửu Long.
                </p>
                <a
                  href="#auctions"
                  className="inline-flex items-center px-7 py-3 bg-accent text-accent-foreground font-display font-semibold rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 text-sm md:text-base"
                >
                  Xem tài sản đấu giá
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
