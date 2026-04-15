import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { data: videos, isLoading } = useQuery({
    queryKey: ["videos-public"],
    queryFn: async () => {
      const { data } = await supabase.from("videos").select("*").eq("published", true).order("created_at", { ascending: false }).limit(6);
      return data || [];
    },
  });

  return (
    <section id="videos" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#7f1d1d] font-body text-sm tracking-widest uppercase font-semibold">Video</span>
          <h2 className="text-3xl md:text-5xl font-display font-700 mt-3 mb-4 text-foreground">Video Đấu Giá</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Xem các video về hoạt động đấu giá và hướng dẫn tham gia.
          </p>
        </motion.div>

        {isLoading ? (
          <p className="text-center text-muted-foreground font-body">Đang tải...</p>
        ) : !videos?.length ? (
          <p className="text-center text-muted-foreground font-body">Hiện chưa có video.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {activeVideo === video.id && video.video_url ? (
                  <video
                    src={video.video_url}
                    controls
                    autoPlay
                    className="w-full h-48 object-cover bg-foreground/5"
                  />
                ) : (
                  <div
                    className="relative w-full h-48 bg-foreground/5 cursor-pointer"
                    onClick={() => video.video_url && setActiveVideo(video.id)}
                  >
                    {video.thumbnail_url ? (
                      <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-contain object-center bg-foreground/5 brightness-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <Play className="w-12 h-12 text-primary/50" />
                      </div>
                    )}
                    {video.video_url && (
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-display font-600 mb-2 group-hover:text-primary transition-colors leading-snug">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-muted-foreground font-body line-clamp-2">{video.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
