import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Recruitment = () => {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["recruitments-public"],
    queryFn: async () => {
      const { data } = await (supabase.from as any)("recruitments").select("*").eq("published", true).order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-accent font-body text-sm tracking-widest uppercase font-semibold">Cơ hội nghề nghiệp</span>
            <h1 className="text-3xl md:text-5xl font-display font-700 mt-3 mb-4 text-foreground">Tuyển Dụng</h1>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              Gia nhập đội ngũ chuyên nghiệp tại Công ty Đấu giá Hợp danh Miền Tây.
            </p>
          </motion.div>

          {isLoading ? (
            <p className="text-center text-muted-foreground font-body">Đang tải...</p>
          ) : !jobs?.length ? (
            <p className="text-center text-muted-foreground font-body">Hiện chưa có tin tuyển dụng nào.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {jobs.map((job: any, i: number) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg overflow-hidden">
                  {job.image_url && <img src={job.image_url} alt={job.title} className="w-full h-48 object-cover" />}
                  <div className="p-6">
                    <h3 className="text-lg font-display font-600 mb-3">{job.title}</h3>
                    {job.content && <p className="text-sm text-muted-foreground font-body whitespace-pre-line">{job.content}</p>}
                    <p className="text-xs text-muted-foreground font-body mt-4">
                      {new Date(job.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Recruitment;
