import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, FileText, Building2 } from "lucide-react";

type Tab = "articles" | "properties";

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("articles");
  const [articles, setArticles] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/login");
  };

  const fetchData = async () => {
    setLoading(true);
    const [articlesRes, propertiesRes] = await Promise.all([
      supabase.from("articles").select("*").order("created_at", { ascending: false }),
      supabase.from("properties").select("*").order("created_at", { ascending: false }),
    ]);
    setArticles(articlesRes.data || []);
    setProperties(propertiesRes.data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleFileUpload = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from("uploads").upload(fileName, file);
    if (error) { alert("Lỗi upload: " + error.message); return null; }
    const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmitArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    let imageUrl = formData.image_url || null;

    if (formData.imageFile) {
      const url = await handleFileUpload(formData.imageFile);
      if (url) imageUrl = url;
    }

    const payload = { title: formData.title, content: formData.content, image_url: imageUrl, published: formData.published ?? true };

    if (editing) {
      await supabase.from("articles").update(payload).eq("id", editing);
    } else {
      await supabase.from("articles").insert(payload);
    }

    setShowForm(false);
    setFormData({});
    setEditing(null);
    setUploading(false);
    fetchData();
  };

  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    let imageUrl = formData.image_url || null;

    if (formData.imageFile) {
      const url = await handleFileUpload(formData.imageFile);
      if (url) imageUrl = url;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      property_type: formData.property_type,
      area: formData.area,
      starting_price: formData.starting_price,
      status: formData.status || "Đang nhận hồ sơ",
      image_url: imageUrl,
      published: formData.published ?? true,
      auction_date: formData.auction_date || null,
    };

    if (editing) {
      await supabase.from("properties").update(payload).eq("id", editing);
    } else {
      await supabase.from("properties").insert(payload);
    }

    setShowForm(false);
    setFormData({});
    setEditing(null);
    setUploading(false);
    fetchData();
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    await supabase.from(table).delete().eq("id", id);
    fetchData();
  };

  const editItem = (item: any) => {
    setFormData(item);
    setEditing(item.id);
    setShowForm(true);
  };

  const inputClass = "w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary";
  const labelClass = "block text-sm font-body text-muted-foreground mb-1";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-display font-700 text-lg">Quản trị nội dung</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body">
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </header>

      <div className="container py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => { setTab("articles"); setShowForm(false); }} className={`flex items-center gap-2 px-4 py-2 rounded-md font-body text-sm font-medium transition-colors ${tab === "articles" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            <FileText className="w-4 h-4" /> Bài viết
          </button>
          <button onClick={() => { setTab("properties"); setShowForm(false); }} className={`flex items-center gap-2 px-4 py-2 rounded-md font-body text-sm font-medium transition-colors ${tab === "properties" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            <Building2 className="w-4 h-4" /> Tài sản đấu giá
          </button>
        </div>

        {/* Add button */}
        <button onClick={() => { setShowForm(true); setEditing(null); setFormData({}); }} className="flex items-center gap-2 px-4 py-2 mb-6 bg-accent text-accent-foreground rounded-md font-body text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Thêm {tab === "articles" ? "bài viết" : "tài sản"}
        </button>

        {/* Form */}
        {showForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="font-display font-600 text-lg mb-4">{editing ? "Sửa" : "Thêm"} {tab === "articles" ? "bài viết" : "tài sản"}</h2>
            {tab === "articles" ? (
              <form onSubmit={handleSubmitArticle} className="space-y-4">
                <div>
                  <label className={labelClass}>Tiêu đề *</label>
                  <input value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Nội dung</label>
                  <textarea value={formData.content || ""} onChange={e => setFormData({ ...formData, content: e.target.value })} className={inputClass + " min-h-[120px]"} />
                </div>
                <div>
                  <label className={labelClass}>Hình ảnh</label>
                  <input type="file" accept="image/*" onChange={e => setFormData({ ...formData, imageFile: e.target.files?.[0] })} className={inputClass} />
                  {formData.image_url && <img src={formData.image_url} alt="" className="mt-2 h-20 rounded object-cover" />}
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.published ?? true} onChange={e => setFormData({ ...formData, published: e.target.checked })} id="pub" />
                  <label htmlFor="pub" className="text-sm font-body text-muted-foreground">Xuất bản</label>
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className="px-6 py-2 bg-primary text-primary-foreground font-body font-semibold rounded-md text-sm hover:opacity-90 disabled:opacity-50">
                    {uploading ? "Đang lưu..." : "Lưu"}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2 bg-secondary text-muted-foreground font-body rounded-md text-sm">Hủy</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitProperty} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Tên tài sản *</label><input value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} required /></div>
                  <div><label className={labelClass}>Vị trí</label><input value={formData.location || ""} onChange={e => setFormData({ ...formData, location: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Loại tài sản</label><input value={formData.property_type || ""} onChange={e => setFormData({ ...formData, property_type: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Diện tích</label><input value={formData.area || ""} onChange={e => setFormData({ ...formData, area: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Giá khởi điểm</label><input value={formData.starting_price || ""} onChange={e => setFormData({ ...formData, starting_price: e.target.value })} className={inputClass} /></div>
                  <div>
                    <label className={labelClass}>Trạng thái</label>
                    <select value={formData.status || "Đang nhận hồ sơ"} onChange={e => setFormData({ ...formData, status: e.target.value })} className={inputClass}>
                      <option>Đang nhận hồ sơ</option>
                      <option>Sắp diễn ra</option>
                      <option>Đã kết thúc</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Ngày đấu giá</label><input type="datetime-local" value={formData.auction_date ? formData.auction_date.slice(0, 16) : ""} onChange={e => setFormData({ ...formData, auction_date: e.target.value })} className={inputClass} /></div>
                </div>
                <div><label className={labelClass}>Mô tả</label><textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} className={inputClass + " min-h-[100px]"} /></div>
                <div>
                  <label className={labelClass}>Hình ảnh</label>
                  <input type="file" accept="image/*" onChange={e => setFormData({ ...formData, imageFile: e.target.files?.[0] })} className={inputClass} />
                  {formData.image_url && <img src={formData.image_url} alt="" className="mt-2 h-20 rounded object-cover" />}
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.published ?? true} onChange={e => setFormData({ ...formData, published: e.target.checked })} id="pub2" />
                  <label htmlFor="pub2" className="text-sm font-body text-muted-foreground">Xuất bản</label>
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={uploading} className="px-6 py-2 bg-primary text-primary-foreground font-body font-semibold rounded-md text-sm hover:opacity-90 disabled:opacity-50">
                    {uploading ? "Đang lưu..." : "Lưu"}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2 bg-secondary text-muted-foreground font-body rounded-md text-sm">Hủy</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* List */}
        {loading ? (
          <p className="text-muted-foreground font-body">Đang tải...</p>
        ) : tab === "articles" ? (
          <div className="space-y-3">
            {articles.length === 0 && <p className="text-muted-foreground font-body text-sm">Chưa có bài viết nào.</p>}
            {articles.map(a => (
              <div key={a.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
                {a.image_url && <img src={a.image_url} alt="" className="w-16 h-16 rounded object-cover shrink-0" />}
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-semibold text-sm truncate">{a.title}</h3>
                  <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString("vi-VN")} · {a.published ? "Đã xuất bản" : "Nháp"}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => editItem(a)} className="px-3 py-1 text-xs bg-secondary text-foreground rounded font-body">Sửa</button>
                  <button onClick={() => handleDelete("articles", a.id)} className="px-3 py-1 text-xs bg-destructive/10 text-destructive rounded font-body">Xóa</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {properties.length === 0 && <p className="text-muted-foreground font-body text-sm">Chưa có tài sản nào.</p>}
            {properties.map(p => (
              <div key={p.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
                {p.image_url && <img src={p.image_url} alt="" className="w-16 h-16 rounded object-cover shrink-0" />}
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-semibold text-sm truncate">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.location} · {p.starting_price} · {p.status}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => editItem(p)} className="px-3 py-1 text-xs bg-secondary text-foreground rounded font-body">Sửa</button>
                  <button onClick={() => handleDelete("properties", p.id)} className="px-3 py-1 text-xs bg-destructive/10 text-destructive rounded font-body">Xóa</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
