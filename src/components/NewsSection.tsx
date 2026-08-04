import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Post = Database['public']['Tables']['posts']['Row'];

const categories = [
  { key: "news", label: "Tin tức" },
  { key: "activity", label: "Hoạt động công ty" },
  { key: "video", label: "Video đấu giá" },
  { key: "legal", label: "Văn bản pháp luật" },
];

const NewsSection = () => {
  const [active, setActive] = useState("news");

  const { data, isLoading } = useQuery({
    queryKey: ["posts", active],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("category", active)
        .order("created_at", { ascending: false });

      return data;
    },
  });

  return (
    <section id="news" className="py-24 bg-white">
      <div className="container">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            Tin tức & Bài viết
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2 rounded-full border transition ${
                active === cat.key
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <p className="text-center">Đang tải...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {data?.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="aspect-[16/9] overflow-hidden">
          <img
          src={item.image_url || "https://via.placeholder.com/400"}
          alt={item.title}
          className="w-full h-full object-contain bg-white"
          />
          </div>

                <div className="p-4">
                  <span className="inline-flex px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary bg-primary/10 rounded-full">
                    {categories.find((cat) => cat.key === item.category)?.label || item.category}
                  </span>
                  <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;