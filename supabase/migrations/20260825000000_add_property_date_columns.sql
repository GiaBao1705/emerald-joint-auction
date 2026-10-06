ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS sale_start_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS acceptance_start_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS acceptance_end_at TIMESTAMP WITH TIME ZONE;

-- Preserve existing values while the new field is adopted. The legacy column
-- is used only as a migration fallback; new writes always use acceptance_end_at.
UPDATE public.properties
SET acceptance_end_at = acceptance_start_at
WHERE acceptance_end_at IS NULL
  AND acceptance_start_at IS NOT NULL;
