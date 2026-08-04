import express from "express";
import { supabase } from "../db.js";

const router = express.Router();
const CATEGORIES = ["news", "activity", "video", "legal"] as const;

type Category = (typeof CATEGORIES)[number];

type PostPayload = {
  title: string;
  content: string;
  image_url?: string | null;
  category: string;
};

const isCategory = (value: unknown): value is Category =>
  typeof value === "string" && (CATEGORIES as readonly string[]).includes(value);

router.get("/", async (req, res) => {
  const category = req.query.category?.toString();

  let query = supabase.from("posts").select("*").order("created_at", { ascending: false });

  if (category) {
    if (!isCategory(category)) {
      return res.status(400).json({ error: "Category must be one of news, activity, video, legal." });
    }
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});

router.post("/", async (req, res) => {
  const payload = req.body as PostPayload;

  if (!payload.title?.trim() || !payload.content?.trim() || !payload.category) {
    return res.status(400).json({ error: "Title, content and category are required." });
  }

  if (!isCategory(payload.category)) {
    return res.status(400).json({ error: "Category must be one of news, activity, video, legal." });
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title: payload.title.trim(),
        content: payload.content.trim(),
        image_url: payload.image_url?.trim() || null,
        category: payload.category,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body as PostPayload;

  if (!payload.title?.trim() || !payload.content?.trim() || !payload.category) {
    return res.status(400).json({ error: "Title, content and category are required." });
  }

  if (!isCategory(payload.category)) {
    return res.status(400).json({ error: "Category must be one of news, activity, video, legal." });
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      title: payload.title.trim(),
      content: payload.content.trim(),
      image_url: payload.image_url?.trim() || null,
      category: payload.category,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ message: "Deleted successfully." });
});

export default router;
