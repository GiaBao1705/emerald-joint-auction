
CREATE TABLE public.recruitments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruitments are viewable by everyone" ON public.recruitments FOR SELECT USING (published = true);
CREATE POLICY "Authenticated users can view all recruitments" ON public.recruitments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert recruitments" ON public.recruitments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update recruitments" ON public.recruitments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete recruitments" ON public.recruitments FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_recruitments_updated_at
BEFORE UPDATE ON public.recruitments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
