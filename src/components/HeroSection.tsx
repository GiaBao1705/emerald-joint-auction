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
    <section className="pt-20 w-full bg-foreground/90">
      <div className="flex items-center justify-center py-10 md:py-16 px-4">
        {showVideo ? (
          <div className="w-full max-w-[600px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-primary-foreground/10">
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
          <img
            src={bannerImg}
            alt="Công Ty Đấu Giá Hợp Danh Miền Tây"
            className="w-full max-w-[600px] rounded-2xl shadow-2xl object-cover"
          />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
