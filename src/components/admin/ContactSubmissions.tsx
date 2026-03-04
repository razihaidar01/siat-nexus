import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Mail, Phone, Calendar } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  interest: string | null;
  message: string | null;
  created_at: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setSubmissions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
    const channel = supabase
      .channel("admin-contacts-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "contact_submissions" }, () => fetchSubmissions())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" /> Contact Submissions ({submissions.length})
      </h3>
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No contact submissions yet.</div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div key={sub.id} className="glass-card p-4 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-base">{sub.name}</p>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{sub.phone}</span>
                    {sub.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{sub.email}</span>}
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(sub.created_at).toLocaleString()}</span>
                  </div>
                  {sub.interest && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{sub.interest}</span>
                  )}
                  {sub.message && <p className="mt-2 text-sm text-muted-foreground">{sub.message}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactSubmissions;
