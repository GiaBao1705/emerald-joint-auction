import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import bannerImg from "@/assets/banner.jpg";

const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section className="pt-20 relative w-full overflow-hidden">
      {showVideo ? (
        <div className="relative w-full">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover"
            onError={() => setVideoError(true)}
          />
          <div className="absolute inset-0 bg-foreground/20 pointer-events-none" />
        </div>
      ) : (
        <img
          src={bannerImg}
          alt="Công Ty Đấu Giá Hợp Danh Miền Tây"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      )}
    </section>
  );
};

export default HeroSection;
