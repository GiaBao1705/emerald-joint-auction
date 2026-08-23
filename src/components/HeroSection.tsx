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
        .in("key", ["hero_video_url", "hero_image_url", "holiday_banner_image_url", "use_video_hero"]);

      const map: Record<string, string> = {};
      (data || []).forEach((item: any) => {
        map[item.key] = item.value || "";
      });
      return map;
    },
  });

  const useVideo = heroSettings?.use_video_hero === "true";
  const videoUrl = heroSettings?.hero_video_url || "";
  const heroImageUrl = heroSettings?.hero_image_url || "";
  const holidayBannerUrl = heroSettings?.holiday_banner_image_url || "";
  const backgroundImage = heroImageUrl || bannerImg;
  const showVideo = useVideo && videoUrl && !videoError;
  const showHolidayBanner = Boolean(holidayBannerUrl) && !showVideo;

  return (
    <section className="relative w-full overflow-hidden bg-slate-50">
      <div className="relative w-full">

        {/* Banner full width - TĂNG CHIỀU CAO, giữ nguyên toàn bộ nội dung */}
        <img
          src={backgroundImage}
          alt="Banner Công ty Đấu giá Hợp danh Miền Tây"
          className="w-full h-auto block mx-auto max-h-[750px] lg:max-h-[800px] xl:max-h-[850px]"
        />

        {/* Overlay nhẹ */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Holiday banner card overlay */}
        {showHolidayBanner && (
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <div className="w-full max-w-[1250px] flex justify-start -ml-12 sm:-ml-14 md:-ml-18 lg:-ml-22 xl:-ml-28">
              <div className="relative w-[460px] sm:w-[600px] md:w-[820px] lg:w-[960px]">
                <img
                  src={holidayBannerUrl}
                  alt="Lịch nghỉ lễ tết"
                  className="block w-full h-auto max-h-[580px] sm:max-h-[650px] object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.18)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Video Card */}
        {showVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <div className="w-full max-w-[1250px]">
              <div className="relative w-[440px] sm:w-[450px] md:w-[800px] lg:w-[910px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-black/30 backdrop-blur-sm">
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
                      setVideoMuted((prev) => {
                        const next = !prev;
                        if (videoRef.current) {
                          videoRef.current.muted = next;
                          if (!next) videoRef.current.play().catch(() => {});
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