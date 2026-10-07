import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LoaderCircle } from "lucide-react";

const PAGE_SIZE = 9;

const categories = [
  { key: "all", label: "Tất cả" },
  { key: "news", label: "Tin tức" },
  { key: "activity", label: "Hoạt động công ty" },
  { key: "video", label: "Video đấu giá" },
  { key: "legal", label: "Văn bản pháp luật" },
];

const NewsSection = () => {
  const [active, setActive] = useState("all");

  const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts", active],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let query = supabase
        .from("posts")
        .select("*", { count: "exact" });

      if (active !== "all") query = query.eq("category", active);

      const { data: posts, error: queryError, count } = await query
        .order("created_at", { ascending: false })
        .range(pageParam, pageParam + PAGE_SIZE - 1);

      if (queryError) throw queryError;

      return {
        posts: posts || [],
        totalCount: count || 0,
        nextPage: posts && count != null && pageParam + posts.length < count ? pageParam + PAGE_SIZE : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;

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
              aria-pressed={active === cat.key}
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
        ) : error && !data ? (
          <p className="text-center text-destructive">Không tải được danh sách bài viết.</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground">Hiện chưa có bài viết trong mục này.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((item) => (
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

            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Đang hiển thị {posts.length} / {totalCount} bài viết
              </p>
              {hasNextPage && (
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity"
                >
                  {isFetchingNextPage && <LoaderCircle className="w-4 h-4 animate-spin" />}
                  {isFetchingNextPage ? "Đang tải..." : "Xem thêm bài viết"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
