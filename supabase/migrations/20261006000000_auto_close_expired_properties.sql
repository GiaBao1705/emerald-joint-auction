-- Automatically close property submissions when their acceptance deadline passes.
-- The deadline is represented by acceptance_end_at, which is the form field
-- "Thời gian kết thúc nhận hồ sơ".

CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION public.update_expired_property_status()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.properties AS p
  SET
    status = 'Đã kết thúc'
  WHERE
    p.status = 'Đang nhận hồ sơ'
    AND p.acceptance_end_at IS NOT NULL
    AND p.acceptance_end_at <= now();
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_cron.job
    WHERE jobname = 'auto_close_expired_properties'
  ) THEN
    PERFORM cron.schedule(
      'auto_close_expired_properties',
      '* * * * *',
      'SELECT public.update_expired_property_status();'
    );
  END IF;
END;
$$;

-- Apply the transition immediately after deployment so records that have
-- already exceeded the acceptance deadline are closed as well.
SELECT public.update_expired_property_status();
