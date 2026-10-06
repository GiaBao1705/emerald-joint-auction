-- The connected Supabase project is missing acceptance_end_at. Add it and
-- preserve the legacy deadline, then normalize the one confirmed row whose
-- timestamps were saved as UTC wall-clock values instead of Vietnam time.
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS acceptance_end_at TIMESTAMP WITH TIME ZONE;

UPDATE public.properties
SET acceptance_end_at = acceptance_start_at
WHERE acceptance_end_at IS NULL
  AND acceptance_start_at IS NOT NULL;

-- Guard the correction with the exact values read from Supabase so it only
-- runs for this uncorrected row and remains safe to re-run.
UPDATE public.properties
SET
  sale_start_at = sale_start_at - INTERVAL '7 hours',
  acceptance_start_at = acceptance_start_at - INTERVAL '7 hours',
  acceptance_end_at = acceptance_end_at - INTERVAL '7 hours'
WHERE id = '80258edd-17e4-4e2c-ba3a-ab6f87d76e65'
  AND sale_start_at = TIMESTAMPTZ '2026-10-05 07:30:00+00'
  AND acceptance_start_at = TIMESTAMPTZ '2026-10-19 17:00:00+00'
  AND acceptance_end_at = TIMESTAMPTZ '2026-10-19 17:00:00+00';
