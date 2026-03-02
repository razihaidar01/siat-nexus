import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const VerifyCertificatePage = () => {
  const [searchParams] = useSearchParams();
  const [certNumber, setCertNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  // Auto-verify if QR code provides ?id= parameter
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setCertNumber(id);
      verifyNumber(id);
    }
  }, [searchParams]);

  const verifyNumber = async (number: string) => {
    if (!number.trim()) return;
    setLoading(true);
    setSearched(true);
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_number", number.trim())
      .maybeSingle();
    setResult(data);
    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    verifyNumber(certNumber);
  };

  return (
    <>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6">
              Verify <span className="gradient-text">Certificate</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Apna SIAT certificate verify karein — certificate number enter karein aur authenticity check karein.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleVerify} className="glass-card p-8 space-y-4">
            <label className="text-sm font-medium text-foreground block">Certificate Number</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                placeholder="e.g. SIAT-2026-001"
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                required
              />
              <button type="submit" disabled={loading} className="btn-primary-glow !py-3 !px-5 flex items-center gap-2">
                <Search className="w-4 h-4" />
                {loading ? "Checking..." : "Verify"}
              </button>
            </div>
          </form>

          {searched && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              {result ? (
                <div className="glass-card p-8 border-2 border-green-500/30">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <h3 className="text-xl font-display font-bold text-green-700">Certificate Verified ✓</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Certificate No.</span>
                      <span className="font-medium text-foreground">{result.certificate_number}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Student Name</span>
                      <span className="font-medium text-foreground">{result.student_name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Course</span>
                      <span className="font-medium text-foreground">{result.course_name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Issue Date</span>
                      <span className="font-medium text-foreground">{result.issue_date}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`font-bold ${result.is_valid ? "text-green-600" : "text-red-600"}`}>
                        {result.is_valid ? "Valid ✓" : "Expired ✗"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-8 border-2 border-red-500/30 text-center">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold text-red-700 mb-2">Certificate Not Found</h3>
                  <p className="text-sm text-muted-foreground">Yeh certificate number hamare records mein nahi mila. Kripya sahi number enter karein ya humse contact karein.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default VerifyCertificatePage;
