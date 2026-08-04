import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ArticlesSection = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["news-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .eq("category", "news")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Lỗi tải tin tức:", error);
        return [];
      }

      return data || [];
    },
  });

  return (
    <section id="articles" className="py-24 bg-[#6cb98d]/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#7f1d1d] font-body text-sm tracking-widest uppercase font-semibold">
            Tin tức
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-700 mt-3 mb-4">
            Tin Tức & Bài Viết
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Cập nhật thông tin, thông báo đấu giá và tin tức mới nhất.
          </p>
        </motion.div>

        {isLoading ? (
          <p className="text-center text-muted-foreground font-body">
            Đang tải...
          </p>
        ) : !articles?.length ? (
          <p className="text-center text-muted-foreground font-body">
            Hiện chưa có bài viết.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {articles.map((article: any, i: number) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-full h-[220px] overflow-hidden rounded-t-xl bg-muted">
                  <img
                    src={article.image_url || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder.svg";
                    }}
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs text-muted-foreground font-body">
                    {new Date(article.created_at).toLocaleDateString(
                      "vi-VN"
                    )}
                  </span>

                  <h3 className="text-lg font-display font-600 mt-2 mb-3 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground font-body line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;