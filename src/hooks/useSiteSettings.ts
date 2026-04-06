import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data } = await (supabase.from as any)("site_settings").select("*");
      const map: Record<string, string> = {};
      (data || []).forEach((item: any) => { map[item.key] = item.value; });
      return map;
    },
    staleTime: 5 * 60 * 1000,
  });
};
