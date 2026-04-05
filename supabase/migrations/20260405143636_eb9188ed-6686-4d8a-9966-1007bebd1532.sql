
-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videos are viewable by everyone" ON public.videos FOR SELECT USING (published = true);
CREATE POLICY "Authenticated users can view all videos" ON public.videos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert videos" ON public.videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update videos" ON public.videos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete videos" ON public.videos FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add documents_url column to properties
ALTER TABLE public.properties ADD COLUMN documents_url TEXT;
