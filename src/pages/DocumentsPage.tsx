import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DocumentItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  file_url: string;
  is_public: boolean | null;
}

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });
      setDocuments(data || []);
      setLoading(false);
    };

    fetchDocuments();

    const channel = supabase
      .channel("public-documents-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "documents" },
        () => fetchDocuments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Downloads</span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-foreground mt-4 mb-4">
            Public <span className="gradient-text">Documents</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Access SIAT brochures, forms, and public files. New uploads appear automatically.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading documents...</div>
          ) : documents.length === 0 ? (
            <div className="glass-card p-8 text-center text-muted-foreground">No public documents available right now.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {documents.map((doc, index) => (
                <motion.a
                  key={doc.id}
                  href={doc.file_url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-5 rounded-xl border border-border/70 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{doc.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                          {doc.category || "general"}
                        </p>
                        {doc.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{doc.description}</p>
                        )}
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-primary shrink-0" />
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DocumentsPage;
