import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Award, Trash2, Download, Plus, QrCode } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";

interface Certificate {
  id: string;
  certificate_number: string;
  student_name: string;
  course_name: string;
  issue_date: string;
  expiry_date: string | null;
  is_valid: boolean | null;
  qr_code_url: string | null;
  created_at: string;
  father_name: string | null;
  mother_name: string | null;
  training_from: string | null;
  training_to: string | null;
}

const SITE_URL = window.location.origin;

const generateCertNumber = () => {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SIAT-${year}-${rand}`;
};

const CertificateManager = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState("");
  const [trainingFrom, setTrainingFrom] = useState("");
  const [trainingTo, setTrainingTo] = useState("");
  const [certNumber, setCertNumber] = useState(generateCertNumber());

  const fetchCertificates = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });
    setCertificates(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificates();

    const channel = supabase
      .channel("admin-certificates-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "certificates" },
        () => fetchCertificates()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !courseName.trim()) {
      toast.error("Student name and course are required.");
      return;
    }

    setSaving(true);

    try {
      // Generate QR code as data URL
      const verifyUrl = `${SITE_URL}/verify-certificate?id=${encodeURIComponent(certNumber)}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 200,
        margin: 1,
        color: { dark: "#1a1a2e", light: "#ffffff" },
      });

      // Upload QR to storage
      const qrBlob = await (await fetch(qrDataUrl)).blob();
      const qrFileName = `qr-${certNumber}.png`;
      
      await supabase.storage.from("certificates").upload(qrFileName, qrBlob, {
        contentType: "image/png",
      });

      const { data: qrUrl } = supabase.storage.from("certificates").getPublicUrl(qrFileName);

      // Insert certificate
      const { error } = await supabase.from("certificates").insert({
        certificate_number: certNumber,
        student_name: studentName.trim(),
        course_name: courseName.trim(),
        issue_date: issueDate,
        expiry_date: expiryDate || null,
        qr_code_url: qrUrl.publicUrl,
        is_valid: true,
        father_name: fatherName.trim() || null,
        mother_name: motherName.trim() || null,
        training_from: trainingFrom || null,
        training_to: trainingTo || null,
      } as any);

      if (error) {
        if (error.code === "23505") {
          toast.error("Duplicate certificate number. Generating a new one.");
          setCertNumber(generateCertNumber());
        } else {
          toast.error("Failed: " + error.message);
        }
      } else {
        toast.success("Certificate created with QR code!");
        resetForm();
        fetchCertificates();
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    }

    setSaving(false);
  };

  const resetForm = () => {
    setStudentName("");
    setFatherName("");
    setMotherName("");
    setCourseName("");
    setIssueDate(new Date().toISOString().split("T")[0]);
    setExpiryDate("");
    setTrainingFrom("");
    setTrainingTo("");
    setCertNumber(generateCertNumber());
    setShowForm(false);
  };

  const handleDownloadPDF = async (cert: Certificate) => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    // Background
    doc.setFillColor(26, 26, 46);
    doc.rect(0, 0, 297, 210, "F");

    // Border
    doc.setDrawColor(0, 200, 150);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(0.5);
    doc.rect(14, 14, 269, 182);

    // Header
    doc.setTextColor(0, 200, 150);
    doc.setFontSize(14);
    doc.text("SIAT — Saharsa Institute of Advance Technology", 148.5, 35, { align: "center" });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("CERTIFICATE OF COMPLETION", 148.5, 55, { align: "center" });

    // Divider
    doc.setDrawColor(0, 200, 150);
    doc.setLineWidth(0.5);
    doc.line(80, 62, 217, 62);

    // Body
    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    doc.text("This is to certify that", 148.5, 75, { align: "center" });

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text(cert.student_name, 148.5, 88, { align: "center" });

    let yPos = 96;
    doc.setFontSize(10);
    doc.setTextColor(180, 180, 180);
    if (cert.father_name) {
      doc.text(`S/D of: ${cert.father_name}`, 148.5, yPos, { align: "center" });
      yPos += 7;
    }
    if (cert.mother_name) {
      doc.text(`Mother: ${cert.mother_name}`, 148.5, yPos, { align: "center" });
      yPos += 7;
    }

    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    doc.text("has successfully completed the course", 148.5, yPos + 4, { align: "center" });

    doc.setFontSize(18);
    doc.setTextColor(0, 200, 150);
    doc.text(cert.course_name, 148.5, yPos + 18, { align: "center" });

    // Details
    doc.setFontSize(10);
    doc.setTextColor(180, 180, 180);
    let detailY = 150;
    doc.text(`Certificate No: ${cert.certificate_number}`, 40, detailY);
    detailY += 7;
    doc.text(`Issue Date: ${cert.issue_date}`, 40, detailY);
    detailY += 7;
    if (cert.training_from && cert.training_to) {
      doc.text(`Training Period: ${cert.training_from} to ${cert.training_to}`, 40, detailY);
      detailY += 7;
    }
    if (cert.expiry_date) {
      doc.text(`Valid Until: ${cert.expiry_date}`, 40, detailY);
    }

    // Director signature
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text("Md Parwez Alam", 148.5, 175, { align: "center" });
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Director, SIAT", 148.5, 180, { align: "center" });

    // QR Code
    if (cert.qr_code_url) {
      try {
        const qrDataUrl = await QRCode.toDataURL(
          `${SITE_URL}/verify-certificate?id=${encodeURIComponent(cert.certificate_number)}`,
          { width: 200, margin: 1, color: { dark: "#1a1a2e", light: "#ffffff" } }
        );
        doc.addImage(qrDataUrl, "PNG", 230, 140, 30, 30);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text("Scan to verify", 245, 174, { align: "center" });
      } catch {
        // QR generation failed, skip
      }
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("Verify at: " + SITE_URL + "/verify-certificate", 148.5, 192, { align: "center" });

    doc.save(`Certificate-${cert.certificate_number}.pdf`);
    toast.success("PDF downloaded!");
  };

  const handleToggleValid = async (cert: Certificate) => {
    const { error } = await supabase
      .from("certificates")
      .update({ is_valid: !cert.is_valid })
      .eq("id", cert.id);

    if (error) {
      toast.error("Update failed: " + error.message);
    } else {
      toast.success(`Certificate ${!cert.is_valid ? "activated" : "revoked"}.`);
      fetchCertificates();
    }
  };

  const handleDelete = async (cert: Certificate) => {
    if (!confirm(`Delete certificate ${cert.certificate_number}?`)) return;

    // Delete QR from storage
    if (cert.qr_code_url) {
      const fileName = `qr-${cert.certificate_number}.png`;
      await supabase.storage.from("certificates").remove([fileName]);
    }

    const { error } = await supabase.from("certificates").delete().eq("id", cert.id);
    if (error) {
      toast.error("Delete failed: " + error.message);
    } else {
      toast.success("Certificate deleted.");
      fetchCertificates();
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Certificate */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Certificate Management
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary-glow !py-2 !px-4 text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> {showForm ? "Cancel" : "New Certificate"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="space-y-4 border-t border-border pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Certificate Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setCertNumber(generateCertNumber())}
                    className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Student Name *</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Full name"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Father's Name</label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Father's name"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Mother's Name</label>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Mother's name"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Course Name *</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="e.g. Mobile Repairing Course"
                  maxLength={150}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Training From</label>
                <input
                  type="date"
                  value={trainingFrom}
                  onChange={(e) => setTrainingFrom(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Training To</label>
                <input
                  type="date"
                  value={trainingTo}
                  onChange={(e) => setTrainingTo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Issue Date *</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Expiry Date (optional)</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                />
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary-glow !py-2.5 !px-6 flex items-center gap-2">
              <QrCode className="w-4 h-4" /> {saving ? "Generating..." : "Generate Certificate + QR"}
            </button>
          </form>
        )}
      </div>

      {/* Certificates List */}
      <div>
        <h3 className="text-lg font-display font-bold text-foreground mb-4">
          All Certificates ({certificates.length})
        </h3>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No certificates yet.</div>
        ) : (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div key={cert.id} className="glass-card p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4">
                {/* QR Preview */}
                {cert.qr_code_url && (
                  <img src={cert.qr_code_url} alt="QR" className="w-16 h-16 rounded-lg bg-white p-1 shrink-0" />
                )}
                
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm text-primary font-medium">{cert.certificate_number}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      cert.is_valid
                        ? "bg-green-500/10 text-green-600"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {cert.is_valid ? "Valid" : "Revoked"}
                    </span>
                  </div>
                  <p className="text-foreground font-medium">{cert.student_name}</p>
                  <p className="text-sm text-muted-foreground">{cert.course_name} • {cert.issue_date}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownloadPDF(cert)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleValid(cert)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      cert.is_valid
                        ? "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20"
                        : "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    }`}
                  >
                    {cert.is_valid ? "Revoke" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(cert)}
                    className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateManager;
