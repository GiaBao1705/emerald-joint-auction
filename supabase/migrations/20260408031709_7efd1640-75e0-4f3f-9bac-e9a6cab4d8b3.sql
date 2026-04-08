
CREATE TABLE public.property_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Property images are viewable by everyone"
ON public.property_images FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert property images"
ON public.property_images FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update property images"
ON public.property_images FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete property images"
ON public.property_images FOR DELETE TO authenticated USING (true);

CREATE INDEX idx_property_images_property_id ON public.property_images(property_id);
