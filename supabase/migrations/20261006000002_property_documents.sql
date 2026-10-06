CREATE TABLE IF NOT EXISTS public.property_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_property_documents_property_order
  ON public.property_documents(property_id, display_order, created_at);

ALTER TABLE public.property_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published property documents are viewable by everyone" ON public.property_documents;
CREATE POLICY "Published property documents are viewable by everyone"
  ON public.property_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.properties p
      WHERE p.id = property_documents.property_id
        AND p.published = true
    )
  );

DROP POLICY IF EXISTS "Authenticated users can view all property documents" ON public.property_documents;
CREATE POLICY "Authenticated users can view all property documents"
  ON public.property_documents FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert property documents" ON public.property_documents;
CREATE POLICY "Authenticated users can insert property documents"
  ON public.property_documents FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update property documents" ON public.property_documents;
CREATE POLICY "Authenticated users can update property documents"
  ON public.property_documents FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete property documents" ON public.property_documents;
CREATE POLICY "Authenticated users can delete property documents"
  ON public.property_documents FOR DELETE TO authenticated
  USING (true);

-- Preserve the old single-file field as one entry in the new document list.
INSERT INTO public.property_documents (property_id, name, file_url, display_order)
SELECT p.id, 'Hồ sơ tài sản hiện có', p.documents_url, 0
FROM public.properties p
WHERE p.documents_url IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM public.property_documents d
    WHERE d.property_id = p.id
      AND d.file_url = p.documents_url
  );
