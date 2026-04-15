import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import bannerImg from "@/assets/banner.jpg";

const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [volume, setVolume] = useState(0.75);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = videoMuted;
    videoRef.current.volume = volume;
  }, [videoMuted, volume]);

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
    <section className="relative overflow-hidden">
      <div className="relative w-full h-[500px] md:h-[550px]">

        {/* Banner - Giữ gần giống ảnh gốc nhất */}
        <img
          src={bannerImg}
          alt="Công Ty Đấu Giá Hợp Danh Miền Tây"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay nhẹ, gần với ảnh gốc */}
        <div className="absolute inset-0 bg-black/5" />

        {/* Video Card (nếu có) */}
        {showVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <div className="w-full max-w-[950px]">
              <div className="relative w-[340px] sm:w-[450px] md:w-[600px] lg:w-[650px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-black/30 backdrop-blur-sm">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  autoPlay
                  muted={videoMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onError={() => setVideoError(true)}
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-black/40 p-2 text-sm text-white shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setVideoMuted(prev => {
                        const next = !prev;
                        if (videoRef.current) {
                          videoRef.current.muted = next;
                          if (!next) {
                            videoRef.current.play().catch(() => {});
                          }
                        }
                        return next;
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
                  >
                    {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    {videoMuted ? "Bật âm" : "Tắt âm"}
                  </button>
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