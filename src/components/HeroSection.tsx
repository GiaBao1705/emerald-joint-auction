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
      <div className="relative">
        <img
          src={bannerImg}
          alt="Công Ty Đấu Giá Hợp Danh Miền Tây"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-foreground/10 pointer-events-none" />

        {/* Video card on the left */}
        {showVideo && (
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="pl-4 md:pl-8">
                <div className="w-[340px] md:w-[400px] aspect-video rounded-xl overflow-hidden shadow-xl border border-primary-foreground/10 bg-foreground/80">
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
