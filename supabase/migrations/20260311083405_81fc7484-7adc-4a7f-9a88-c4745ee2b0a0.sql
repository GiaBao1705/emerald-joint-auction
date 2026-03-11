
-- Function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles are viewable by everyone" ON public.articles
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can insert articles" ON public.articles
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles" ON public.articles
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete articles" ON public.articles
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view all articles" ON public.articles
  FOR SELECT TO authenticated USING (true);

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Properties table (tài sản đấu giá)
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  property_type TEXT,
  area TEXT,
  starting_price TEXT,
  status TEXT NOT NULL DEFAULT 'Đang nhận hồ sơ',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  auction_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are viewable by everyone" ON public.properties
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can insert properties" ON public.properties
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties" ON public.properties
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete properties" ON public.properties
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view all properties" ON public.properties
  FOR SELECT TO authenticated USING (true);

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

CREATE POLICY "Public can view uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Authenticated users can update uploads" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'uploads');

CREATE POLICY "Authenticated users can delete uploads" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'uploads');
