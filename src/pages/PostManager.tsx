import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";


type Post = Database['public']['Tables']['posts']['Row'];

const initialForm = {
  title: "",
  content: "",
  image_url: "",
  category: "news",
};

const categories = [
  { key: "news", label: "Tin tức" },
  { key: "activity", label: "Hoạt động công ty" },
  { key: "video", label: "Video đấu giá" },
  { key: "legal", label: "Văn bản pháp luật" },
];


const PostManager = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      setMessage({ type: "error", text: "Không tải được danh sách bài viết." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage(null);
  };

  const validateForm = () => {
    if (!form.title.trim() || !form.content.trim() || !form.category) {
      setMessage({ type: "error", text: "Vui lòng điền đầy đủ tiêu đề, nội dung và chuyên mục." });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!validateForm()) return;

  try {
    let imageUrl = form.image_url;

    // 🔥 upload ảnh nếu có
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    if (editingId) {
      const { error } = await supabase
        .from("posts")
        .update({
          title: form.title.trim(),
          content: form.content.trim(),
          image_url: imageUrl || null,
          category: form.category,
        })
        .eq("id", editingId)
        .select();

      if (error) throw error;
      setMessage({ type: "success", text: "Cập nhật bài viết thành công." });
    } else {
      const { error } = await supabase
        .from("posts")
        .insert([{
          title: form.title.trim(),
          content: form.content.trim(),
          image_url: imageUrl || null,
          category: form.category,
        }]);

      if (error) throw error;
      setMessage({ type: "success", text: "Tạo bài viết thành công." });
    }

    resetForm();
    setImageFile(null); // reset file
    fetchPosts();
  } catch (error: any) {
    setMessage({ type: "error", text: error.message || "Đã xảy ra lỗi." });
  }
};

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      content: post.content,
      image_url: post.image_url || "",
      category: post.category,
    });
    setMessage(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này không?")) return;

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setMessage({ type: "success", text: "Xóa bài viết thành công." });
      fetchPosts();
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Đã xảy ra lỗi." });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-10">  
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          <section className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Danh sách bài viết</h2>
                <p className="mt-1 text-sm text-slate-500">Tất cả bài viết đang có</p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Làm mới form
              </button>
            </div>

            {message ? (
              <div className={`rounded-2xl px-4 py-3 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
                {message.text}
              </div>
            ) : null}

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-700">Tiêu đề</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Chuyên mục</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Ngày tạo</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                        Đang tải...
                      </td>
                    </tr>
                  ) : posts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                        Chưa có bài viết nào.
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 font-medium text-slate-900">{post.title}</td>
                        <td className="px-4 py-4 text-slate-600">{categories.find((cat) => cat.key === post.category)?.label || post.category}</td>
                        <td className="px-4 py-4 text-slate-600">{new Date(post.created_at).toLocaleDateString("vi-VN")}</td>
                        <td className="px-4 py-4 space-x-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(post)}
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post.id)}
                            className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900">{editingId ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}</h2>
            <p className="mt-1 text-sm text-slate-500">Điền thông tin và nhấn lưu.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Tiêu đề</label>
                <input
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nội dung</label>
                <textarea
                  value={form.content}
                  onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
                  rows={6}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Nhập nội dung bài viết"
                />
              </div>

              <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Ảnh</label>
             <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />

  {imageFile && (
    <img
      src={URL.createObjectURL(imageFile)}
      className="aspect-[16/9] object-cover"
    />
  )}
</div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Chuyên mục</label>
                <select
                  value={form.category}
                  onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  {editingId ? "Cập nhật" : "Tạo mới"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Hủy
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
      
    </main>
  );
};
export default PostManager;