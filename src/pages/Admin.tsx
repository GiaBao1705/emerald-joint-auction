import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, FileText, Building2, Video, Trash2, Pencil, Settings, Save, Users, Image, Link as LinkIcon, X } from "lucide-react";

const PROPERTY_CATEGORIES = ["Bất động sản", "Động sản", "Tài sản khác"];

type Tab = "articles" | "properties" | "videos" | "recruitments" | "hero" | "settings";

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("articles");
  const [articles, setArticles] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [recruitments, setRecruitments] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});
  const [savingSettings, setSavingSettings] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  // Hero video state
  const [heroVideoUrl, setHeroVideoUrl] = useState("");
  const [useVideoHero, setUseVideoHero] = useState(false);
  const [heroSaving, setHeroSaving] = useState(false);

  // Gallery state
  const [galleryPropertyId, setGalleryPropertyId] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryUploading, setGalleryUploading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      fetchData();
    };
    init();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [a, p, v, r, s] = await Promise.all([
      supabase.from("articles").select("*").order("created_at", { ascending: false }),
      supabase.from("properties").select("*").order("created_at", { ascending: false }),
      (supabase.from as any)("videos").select("*").order("created_at", { ascending: false }),
      (supabase.from as any)("recruitments").select("*").order("created_at", { ascending: false }),
      (supabase.from as any)("site_settings").select("*"),
    ]);
    setArticles(a.data || []);
    setProperties(p.data || []);
    setVideos(v.data || []);
    setRecruitments(r.data || []);
    const map: Record<string, string> = {};
    (s.data || []).forEach((item: any) => { map[item.key] = item.value || ""; });
    setSiteSettings(map);
    setHeroVideoUrl(map.hero_video_url || "");
    setUseVideoHero(map.use_video_hero === "true");
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from("uploads").upload(fileName, file);
    if (error) { alert("Lỗi upload: " + error.message); return null; }
    return supabase.storage.from("uploads").getPublicUrl(fileName).data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tab === "articles" && !formData.title?.trim()) { alert("Vui lòng nhập tiêu đề"); return; }
    if (tab === "properties" && !formData.name?.trim()) { alert("Vui lòng nhập tên tài sản"); return; }
    if (tab === "videos" && !formData.title?.trim()) { alert("Vui lòng nhập tiêu đề"); return; }
    if (tab === "recruitments" && !formData.title?.trim()) { alert("Vui lòng nhập tiêu đề"); return; }

    setUploading(true);

    let imageUrl = formData.image_url || null;
    if (formData.imageFile) {
      const url = await uploadFile(formData.imageFile);
      if (url) imageUrl = url;
    }

    let documentsUrl = formData.documents_url || null;
    if (formData.documentsFile) {
      const url = await uploadFile(formData.documentsFile);
      if (url) documentsUrl = url;
    }

    let videoUrl = formData.video_url || null;
    if (formData.videoFile) {
      if (!formData.videoFile.type.startsWith("video/")) { alert("Vui lòng chọn file video hợp lệ"); setUploading(false); return; }
      const url = await uploadFile(formData.videoFile);
      if (url) videoUrl = url;
    }

    let thumbnailUrl = formData.thumbnail_url || null;
    if (formData.thumbnailFile) {
      const url = await uploadFile(formData.thumbnailFile);
      if (url) thumbnailUrl = url;
    }

    if (tab === "articles") {
      const payload = { title: formData.title?.trim(), content: formData.content?.trim() || null, image_url: imageUrl, published: formData.published ?? true };
      if (editing) await supabase.from("articles").update(payload).eq("id", editing);
      else await supabase.from("articles").insert(payload);
    } else if (tab === "properties") {
      const payload = {
        name: formData.name?.trim(), description: formData.description?.trim() || null, location: formData.location?.trim() || null,
        property_type: formData.property_type || "Bất động sản", area: formData.area?.trim() || null, starting_price: formData.starting_price?.trim() || null,
        status: formData.status || "Đang nhận hồ sơ", image_url: imageUrl, documents_url: documentsUrl,
        published: formData.published ?? true, auction_date: formData.auction_date || null,
      };
      if (editing) await supabase.from("properties").update(payload).eq("id", editing);
      else await supabase.from("properties").insert(payload);
    } else if (tab === "videos") {
      const payload = { title: formData.title?.trim(), description: formData.description?.trim() || null, video_url: videoUrl, thumbnail_url: thumbnailUrl, published: formData.published ?? true };
      if (editing) await (supabase.from as any)("videos").update(payload).eq("id", editing);
      else await (supabase.from as any)("videos").insert(payload);
    } else if (tab === "recruitments") {
      const payload = { title: formData.title?.trim(), content: formData.content?.trim() || null, image_url: imageUrl, published: formData.published ?? true };
      if (editing) await (supabase.from as any)("recruitments").update(payload).eq("id", editing);
      else await (supabase.from as any)("recruitments").insert(payload);
    }

    resetForm();
    fetchData();
  };

  const resetForm = () => { setShowForm(false); setFormData({}); setEditing(null); setUploading(false); };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    await (supabase.from as any)(table).delete().eq("id", id);
    fetchData();
  };

  const editItem = (item: any) => { setFormData(item); setEditing(item.id); setShowForm(true); };

  const inputClass = "w-full px-3 py-2.5 bg-card border border-border rounded-md text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary";
  const labelClass = "block text-sm font-body font-medium text-foreground/70 mb-1";

  const saveSetting = async (key: string, value: string) => {
    const { data: existing } = await (supabase.from as any)("site_settings").select("id").eq("key", key).maybeSingle();
    if (existing) {
      await (supabase.from as any)("site_settings").update({ value }).eq("key", key);
    } else {
      await (supabase.from as any)("site_settings").insert({ key, value });
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    for (const [key, value] of Object.entries(siteSettings)) {
      await saveSetting(key, value);
    }
    setSavingSettings(false);
    alert("Đã lưu cài đặt!");
  };

  // Hero video handlers
  const handleSaveHeroUrl = async () => {
    setHeroSaving(true);
    await saveSetting("hero_video_url", heroVideoUrl);
    await saveSetting("use_video_hero", useVideoHero ? "true" : "false");
    setHeroSaving(false);
    alert("Đã lưu cấu hình Hero!");
  };

  const handleRemoveHeroVideo = async () => {
    if (!confirm("Xóa video hero hiện tại?")) return;
    setHeroVideoUrl("");
    setUseVideoHero(false);
    await saveSetting("hero_video_url", "");
    await saveSetting("use_video_hero", "false");
  };

  const handleToggleVideoHero = async (checked: boolean) => {
    setUseVideoHero(checked);
    await saveSetting("use_video_hero", checked ? "true" : "false");
  };

  // Gallery handlers
  const openGallery = async (propertyId: string) => {
    setGalleryPropertyId(propertyId);
    const { data } = await (supabase.from as any)("property_images")
      .select("*").eq("property_id", propertyId).order("display_order", { ascending: true });
    setGalleryImages(data || []);
  };

  const handleGalleryUpload = async (files: FileList) => {
    setGalleryUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) { alert(`${file.name} quá lớn (tối đa 5MB)`); continue; }
      const url = await uploadFile(file);
      if (url && galleryPropertyId) {
        await (supabase.from as any)("property_images").insert({
          property_id: galleryPropertyId,
          image_url: url,
          display_order: galleryImages.length + i,
        });
      }
    }
    if (galleryPropertyId) await openGallery(galleryPropertyId);
    setGalleryUploading(false);
  };

  const handleDeleteGalleryImage = async (imageId: string) => {
    if (!confirm("Xóa ảnh này?")) return;
    await (supabase.from as any)("property_images").delete().eq("id", imageId);
    if (galleryPropertyId) await openGallery(galleryPropertyId);
  };

  const tabLabels: { key: Tab; icon: any; label: string }[] = [
    { key: "articles", icon: FileText, label: "Bài viết" },
    { key: "properties", icon: Building2, label: "Tài sản" },
    { key: "videos", icon: Video, label: "Video" },
    { key: "recruitments", icon: Users, label: "Tuyển dụng" },
    { key: "hero", icon: Image, label: "Hero Banner" },
    { key: "settings", icon: Settings, label: "Cài đặt" },
  ];

  const getTabLabel = () => {
    if (tab === "articles") return "bài viết";
    if (tab === "properties") return "tài sản";
    if (tab === "videos") return "video";
    if (tab === "recruitments") return "tin tuyển dụng";
    return "";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-display font-700 text-lg">Quản trị nội dung</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 font-body transition-opacity">
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabLabels.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setShowForm(false); setGalleryPropertyId(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-body text-sm font-medium transition-colors ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-card text-foreground/70 hover:text-foreground border border-border"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab !== "settings" && tab !== "hero" && (
          <button onClick={() => { setShowForm(true); setEditing(null); setFormData({}); setGalleryPropertyId(null); }}
            className="flex items-center gap-2 px-5 py-2.5 mb-6 bg-accent text-accent-foreground rounded-md font-body text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Thêm {getTabLabel()}
          </button>
        )}

        {/* Gallery Modal */}
        {galleryPropertyId && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-600 text-lg">Quản lý ảnh Gallery</h2>
              <button onClick={() => setGalleryPropertyId(null)} className="p-2 hover:bg-secondary rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {galleryImages.map(img => (
                <div key={img.id} className="relative group">
                  <img src={img.image_url} alt="" className="w-full h-24 object-cover rounded-md" />
                  <button onClick={() => handleDeleteGalleryImage(img.id)}
                    className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-body text-sm font-semibold cursor-pointer hover:opacity-90">
              <Image className="w-4 h-4" /> Thêm ảnh
              <input type="file" accept="image/*" multiple className="hidden" onChange={e => { if (e.target.files) handleGalleryUpload(e.target.files); }} />
            </label>
            {galleryUploading && <p className="text-sm text-primary font-body mt-2">Đang upload...</p>}
          </div>
        )}

        {showForm && tab !== "hero" && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="font-display font-600 text-lg mb-5">
              {editing ? "Sửa" : "Thêm"} {getTabLabel()}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "articles" && (
                <>
                  <div><label className={labelClass}>Tiêu đề *</label><input value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} required maxLength={200} /></div>
                  <div><label className={labelClass}>Nội dung</label><textarea value={formData.content || ""} onChange={e => setFormData({ ...formData, content: e.target.value })} className={inputClass + " min-h-[120px]"} maxLength={10000} /></div>
                  <div><label className={labelClass}>Hình ảnh</label><input type="file" accept="image/*" onChange={e => setFormData({ ...formData, imageFile: e.target.files?.[0] })} className={inputClass} />
                    {formData.image_url && <img src={formData.image_url} alt="" className="mt-2 h-20 rounded object-cover" />}</div>
                </>
              )}

              {tab === "properties" && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Tên tài sản *</label><input value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} required maxLength={300} /></div>
                    <div><label className={labelClass}>Vị trí</label><input value={formData.location || ""} onChange={e => setFormData({ ...formData, location: e.target.value })} className={inputClass} maxLength={300} /></div>
                    <div><label className={labelClass}>Loại tài sản *</label>
                      <select value={formData.property_type || "Bất động sản"} onChange={e => setFormData({ ...formData, property_type: e.target.value })} className={inputClass}>
                        {PROPERTY_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div><label className={labelClass}>Diện tích</label><input value={formData.area || ""} onChange={e => setFormData({ ...formData, area: e.target.value })} className={inputClass} maxLength={100} /></div>
                    <div><label className={labelClass}>Giá khởi điểm</label><input value={formData.starting_price || ""} onChange={e => setFormData({ ...formData, starting_price: e.target.value })} className={inputClass} maxLength={100} /></div>
                    <div><label className={labelClass}>Trạng thái</label>
                      <select value={formData.status || "Đang nhận hồ sơ"} onChange={e => setFormData({ ...formData, status: e.target.value })} className={inputClass}>
                        <option>Đang nhận hồ sơ</option><option>Sắp diễn ra</option><option>Đã kết thúc</option>
                      </select></div>
                    <div><label className={labelClass}>Ngày đấu giá</label><input type="datetime-local" value={formData.auction_date ? formData.auction_date.slice(0, 16) : ""} onChange={e => setFormData({ ...formData, auction_date: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div><label className={labelClass}>Mô tả</label><textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} className={inputClass + " min-h-[100px]"} maxLength={5000} /></div>
                  <div><label className={labelClass}>Hình ảnh đại diện</label><input type="file" accept="image/*" onChange={e => setFormData({ ...formData, imageFile: e.target.files?.[0] })} className={inputClass} />
                    {formData.image_url && <img src={formData.image_url} alt="" className="mt-2 h-20 rounded object-cover" />}</div>
                  <div><label className={labelClass}>Hồ sơ tài sản (PDF, Word...)</label><input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={e => setFormData({ ...formData, documentsFile: e.target.files?.[0] })} className={inputClass} />
                    {formData.documents_url && <a href={formData.documents_url} target="_blank" rel="noreferrer" className="text-sm text-primary underline mt-1 inline-block">Xem hồ sơ hiện tại</a>}</div>
                </>
              )}

              {tab === "videos" && (
                <>
                  <div><label className={labelClass}>Tiêu đề *</label><input value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} required maxLength={200} /></div>
                  <div><label className={labelClass}>Mô tả</label><textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} className={inputClass + " min-h-[80px]"} maxLength={2000} /></div>
                  <div><label className={labelClass}>File video</label><input type="file" accept="video/*" onChange={e => setFormData({ ...formData, videoFile: e.target.files?.[0] })} className={inputClass} />
                    {formData.video_url && <a href={formData.video_url} target="_blank" rel="noreferrer" className="text-sm text-primary underline mt-1 inline-block">Xem video hiện tại</a>}</div>
                  <div><label className={labelClass}>Ảnh thumbnail</label><input type="file" accept="image/*" onChange={e => setFormData({ ...formData, thumbnailFile: e.target.files?.[0] })} className={inputClass} />
                    {formData.thumbnail_url && <img src={formData.thumbnail_url} alt="" className="mt-2 h-20 rounded object-cover" />}</div>
                </>
              )}

              {tab === "recruitments" && (
                <>
                  <div><label className={labelClass}>Tiêu đề *</label><input value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} required maxLength={200} /></div>
                  <div><label className={labelClass}>Nội dung</label><textarea value={formData.content || ""} onChange={e => setFormData({ ...formData, content: e.target.value })} className={inputClass + " min-h-[120px]"} maxLength={10000} /></div>
                  <div><label className={labelClass}>Hình ảnh</label><input type="file" accept="image/*" onChange={e => setFormData({ ...formData, imageFile: e.target.files?.[0] })} className={inputClass} />
                    {formData.image_url && <img src={formData.image_url} alt="" className="mt-2 h-20 rounded object-cover" />}</div>
                </>
              )}

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={formData.published ?? true} onChange={e => setFormData({ ...formData, published: e.target.checked })} id="pub-check" />
                <label htmlFor="pub-check" className="text-sm font-body text-foreground/70">Xuất bản</label>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-primary text-primary-foreground font-body font-semibold rounded-md text-sm hover:opacity-90 disabled:opacity-50">
                  {uploading ? "Đang lưu..." : "Lưu"}
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-secondary text-foreground/70 font-body rounded-md text-sm hover:text-foreground">Hủy</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-muted-foreground font-body">Đang tải...</p>
        ) : (
          <div className="space-y-3">
            {tab === "articles" && (
              articles.length === 0 ? <p className="text-muted-foreground font-body text-sm">Chưa có bài viết nào.</p> :
              articles.map(a => (
                <div key={a.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
                  {a.image_url && <img src={a.image_url} alt="" className="w-16 h-16 rounded object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-sm truncate">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString("vi-VN")} · {a.published ? "Đã xuất bản" : "Nháp"}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => editItem(a)} className="p-2 bg-secondary text-foreground/70 rounded hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete("articles", a.id)} className="p-2 bg-destructive/10 text-destructive rounded hover:bg-destructive/20"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))
            )}

            {tab === "properties" && (
              properties.length === 0 ? <p className="text-muted-foreground font-body text-sm">Chưa có tài sản nào.</p> :
              properties.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
                  {p.image_url && <img src={p.image_url} alt="" className="w-16 h-16 rounded object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-sm truncate">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.property_type} · {p.location} · {p.status}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openGallery(p.id)} className="p-2 bg-secondary text-foreground/70 rounded hover:text-foreground" title="Ảnh gallery"><Image className="w-4 h-4" /></button>
                    <button onClick={() => editItem(p)} className="p-2 bg-secondary text-foreground/70 rounded hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete("properties", p.id)} className="p-2 bg-destructive/10 text-destructive rounded hover:bg-destructive/20"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))
            )}

            {tab === "videos" && (
              videos.length === 0 ? <p className="text-muted-foreground font-body text-sm">Chưa có video nào.</p> :
              videos.map(v => (
                <div key={v.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
                  {v.thumbnail_url && <img src={v.thumbnail_url} alt="" className="w-16 h-16 rounded object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-sm truncate">{v.title}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleDateString("vi-VN")} · {v.published ? "Đã xuất bản" : "Nháp"}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => editItem(v)} className="p-2 bg-secondary text-foreground/70 rounded hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete("videos", v.id)} className="p-2 bg-destructive/10 text-destructive rounded hover:bg-destructive/20"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))
            )}

            {tab === "recruitments" && (
              recruitments.length === 0 ? <p className="text-muted-foreground font-body text-sm">Chưa có tin tuyển dụng nào.</p> :
              recruitments.map(r => (
                <div key={r.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
                  {r.image_url && <img src={r.image_url} alt="" className="w-16 h-16 rounded object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-sm truncate">{r.title}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("vi-VN")} · {r.published ? "Đã xuất bản" : "Nháp"}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => editItem(r)} className="p-2 bg-secondary text-foreground/70 rounded hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete("recruitments", r.id)} className="p-2 bg-destructive/10 text-destructive rounded hover:bg-destructive/20"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))
            )}

            {tab === "hero" && (
              <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                <h2 className="font-display font-600 text-lg">Quản lý Hero Banner</h2>

                {/* Toggle */}
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={useVideoHero} onChange={e => handleToggleVideoHero(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                  <span className="text-sm font-body text-foreground/70">
                    {useVideoHero ? "Đang hiển thị Video" : "Đang hiển thị Ảnh banner mặc định"}
                  </span>
                </div>

                {/* Video URL input */}
                <div>
                  <label className={labelClass}>URL Video (dán link video bên ngoài)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        value={heroVideoUrl}
                        onChange={e => setHeroVideoUrl(e.target.value)}
                        placeholder="https://example.com/video.mp4"
                        className={inputClass + " pl-10"}
                      />
                    </div>
                    <button onClick={handleSaveHeroUrl} disabled={heroSaving}
                      className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-body text-sm font-semibold hover:opacity-90 disabled:opacity-50 shrink-0">
                      <Save className="w-4 h-4 inline mr-1" /> {heroSaving ? "Đang lưu..." : "Lưu"}
                    </button>
                  </div>
                </div>

                {/* Preview */}
                {heroVideoUrl && (
                  <div className="space-y-3">
                    <p className={labelClass}>Xem trước:</p>
                    <video src={heroVideoUrl} controls className="w-full max-w-lg rounded-lg border border-border" />
                    <button onClick={handleRemoveHeroVideo} className="px-5 py-2.5 bg-destructive/10 text-destructive rounded-md font-body text-sm font-semibold hover:bg-destructive/20">
                      <Trash2 className="w-4 h-4 inline mr-1" /> Xóa video
                    </button>
                  </div>
                )}
              </div>
            )}

            {tab === "settings" && (
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h2 className="font-display font-600 text-lg mb-2">Cài đặt thông tin trang</h2>
                {[
                  { key: "company_name", label: "Tên công ty" },
                  { key: "company_description", label: "Mô tả công ty" },
                  { key: "phone", label: "Số điện thoại" },
                  { key: "email", label: "Email" },
                  { key: "website", label: "Website" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className={labelClass}>{label}</label>
                    {key === "company_description" ? (
                      <textarea
                        value={siteSettings[key] || ""}
                        onChange={e => setSiteSettings({ ...siteSettings, [key]: e.target.value })}
                        className={inputClass + " min-h-[80px]"}
                        maxLength={1000}
                      />
                    ) : (
                      <input
                        value={siteSettings[key] || ""}
                        onChange={e => setSiteSettings({ ...siteSettings, [key]: e.target.value })}
                        className={inputClass}
                        maxLength={200}
                      />
                    )}
                  </div>
                ))}
                <button
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-body font-semibold rounded-md text-sm hover:opacity-90 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> {savingSettings ? "Đang lưu..." : "Lưu cài đặt"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
