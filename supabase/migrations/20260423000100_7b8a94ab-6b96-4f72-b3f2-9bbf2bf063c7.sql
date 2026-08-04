CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone"
  ON public.posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert posts"
  ON public.posts FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON public.posts FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete posts"
  ON public.posts FOR DELETE TO authenticated USING (true);
