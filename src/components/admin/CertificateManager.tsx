import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Award, Trash2, Download, Plus, QrCode } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
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
  grade: string | null;
}

const SITE_URL = window.location.origin;

const generateCertNumber = () => {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SIAT-${year}-${rand}`;
};

const generateSerialNumber = () => {
  const year = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 9999)).padStart(4, "0");
  return `SIAT-${year}-${rand}`;
};

const generateBarcodeDataUrl = (text: string): string => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {
    format: "CODE128",
    width: 2,
    height: 50,
    displayValue: true,
    fontSize: 12,
    margin: 5,
    background: "transparent",
    lineColor: "#1a1a1a",
  });
  return canvas.toDataURL("image/png");
};

const formatDateDDMMYYYY = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
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
  const [grade, setGrade] = useState("A++");
  const [certNumber, setCertNumber] = useState(generateCertNumber());

  const fetchCertificates = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });
    setCertificates((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificates();
    const channel = supabase
      .channel("admin-certificates-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "certificates" }, () => fetchCertificates())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !courseName.trim()) {
      toast.error("Student name and course are required.");
      return;
    }
    setSaving(true);
    try {
      const verifyUrl = `${SITE_URL}/verify-certificate?id=${encodeURIComponent(certNumber)}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 200, margin: 1, color: { dark: "#1a1a2e", light: "#ffffff" },
      });

      const qrBlob = await (await fetch(qrDataUrl)).blob();
      const qrFileName = `qr-${certNumber}.png`;
      await supabase.storage.from("certificates").upload(qrFileName, qrBlob, { contentType: "image/png" });
      const { data: qrUrl } = supabase.storage.from("certificates").getPublicUrl(qrFileName);

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
        toast.success("Certificate created!");
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
    setGrade("A++");
    setCertNumber(generateCertNumber());
    setShowForm(false);
  };

  const handleDownloadPDF = async (cert: Certificate) => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = 210;
    const H = 297;
    const serialNo = generateSerialNumber();
    const certGrade = cert.grade || "A++";

    // ─── Background: warm cream ───
    doc.setFillColor(252, 248, 235);
    doc.rect(0, 0, W, H, "F");

    // ─── Decorative border (golden) ───
    // Outer border
    doc.setDrawColor(184, 148, 72);
    doc.setLineWidth(3);
    doc.rect(6, 6, W - 12, H - 12);
    // Inner border
    doc.setLineWidth(1.5);
    doc.rect(10, 10, W - 20, H - 20);
    // Inner decorative line
    doc.setLineWidth(0.3);
    doc.rect(13, 13, W - 26, H - 26);

    // ─── "SIAT SIAT SIAT" watermark pattern ───
    doc.setFontSize(6);
    doc.setTextColor(230, 220, 190);
    for (let y = 20; y < H - 20; y += 8) {
      for (let x = 18; x < W - 18; x += 22) {
        doc.text("SIAT", x, y);
      }
    }

    // ─── Serial Number Badge (top right) ───
    doc.setFillColor(184, 148, 72);
    doc.roundedRect(W - 60, 18, 46, 14, 3, 3, "F");
    doc.setFontSize(6);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Serial No:", W - 57, 24);
    doc.setFontSize(7);
    doc.text(serialNo, W - 57, 29);

    // ─── SIAT Header ───
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.text("SIAT", W / 2, 48, { align: "center" });

    // ─── Institute Name ───
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SAHARSA INSTITUTE OF ADVANCE TECHNOLOGY", W / 2, 58, { align: "center" });

    // ─── Institute Details ───
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const details = [
      "Baijnathpur, Saharsa",
      "An ISO 9001:2015 Certified Institute",
      "Reg. No.: SH-6061 (Saharsa)",
      "UDYAM Registration No.: UDYAM-BR-29-0035052",
      "+91 7004216219 | siat.sws@gmail.com | www.siat.in",
    ];
    let dy = 64;
    details.forEach((line, i) => {
      if (i === 1) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(184, 148, 72);
      } else {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
      }
      doc.text(line, W / 2, dy, { align: "center" });
      dy += 5;
    });

    // ─── Divider ───
    doc.setDrawColor(184, 148, 72);
    doc.setLineWidth(0.5);
    doc.line(30, dy + 2, W - 30, dy + 2);

    // ─── "CERTIFICATE OF TRAINING" ───
    dy += 14;
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICATE OF TRAINING", W / 2, dy, { align: "center" });

    // ─── "This is to proudly certify that" ───
    dy += 12;
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(80, 80, 80);
    doc.text("This is to proudly certify that", W / 2, dy, { align: "center" });

    // ─── Student Name ───
    dy += 14;
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 20, 20);
    doc.text(cert.student_name.toUpperCase(), W / 2, dy, { align: "center" });

    // ─── Underline ───
    const nameWidth = doc.getTextWidth(cert.student_name.toUpperCase());
    doc.setDrawColor(184, 148, 72);
    doc.setLineWidth(0.5);
    doc.line((W - nameWidth) / 2, dy + 2, (W + nameWidth) / 2, dy + 2);

    // ─── Course description ───
    dy += 14;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    const courseText = `has successfully completed the`;
    doc.text(courseText, W / 2, dy, { align: "center" });
    dy += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`${cert.course_name}`, W / 2, dy, { align: "center" });
    dy += 6;
    doc.setFont("helvetica", "normal");
    doc.text("training program conducted at", W / 2, dy, { align: "center" });
    dy += 6;
    doc.text("Saharsa Institute of Advance Technology (SIAT).", W / 2, dy, { align: "center" });

    // ─── Training Duration ───
    if (cert.training_from && cert.training_to) {
      dy += 12;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Training Duration: From: ", W / 2 - 30, dy);
      doc.setFont("helvetica", "bold");
      doc.text(formatDateDDMMYYYY(cert.training_from), W / 2 + 5, dy);
      doc.setFont("helvetica", "normal");
      doc.text(" To: ", W / 2 + 28, dy);
      doc.setFont("helvetica", "bold");
      doc.text(formatDateDDMMYYYY(cert.training_to), W / 2 + 35, dy);
    }

    // ─── Performance paragraph ───
    dy += 12;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(
      "Throughout the program, the candidate demonstrated technical",
      W / 2, dy, { align: "center" }
    );
    dy += 5;
    doc.text(
      "competence, discipline, and commitment to excellence.",
      W / 2, dy, { align: "center" }
    );

    // ─── Grade ───
    dy += 12;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Overall Performance: Grade (", W / 2 - 15, dy);
    doc.setFont("helvetica", "bold");
    const gradeX = W / 2 + 22;
    doc.text(`${certGrade})`, gradeX, dy);

    // ─── Date of Issue ───
    dy += 12;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Date of Issue: ", W / 2 - 12, dy);
    doc.setFont("helvetica", "bold");
    doc.text(formatDateDDMMYYYY(cert.issue_date), W / 2 + 8, dy);

    // ─── Bottom section divider ───
    dy += 8;
    doc.setDrawColor(184, 148, 72);
    doc.setLineWidth(0.3);
    doc.line(30, dy, W - 30, dy);

    // ─── Barcode (center bottom) ───
    const barcodeY = dy + 6;
    try {
      const barcodeDataUrl = generateBarcodeDataUrl(cert.certificate_number);
      doc.addImage(barcodeDataUrl, "PNG", 65, barcodeY, 80, 20);
    } catch { /* barcode failed */ }

    // ─── QR Code (bottom left) ───
    const qrY = barcodeY + 26;
    try {
      const qrDataUrl = await QRCode.toDataURL(
        `${SITE_URL}/verify-certificate?id=${encodeURIComponent(cert.certificate_number)}`,
        { width: 200, margin: 1, color: { dark: "#1a1a2e", light: "#ffffff" } }
      );
      doc.addImage(qrDataUrl, "PNG", 22, qrY, 24, 24);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.text("Scan to Verify", 34, qrY + 27, { align: "center" });
    } catch { /* qr failed */ }

    // ─── SIAT Seal / Logo (bottom center) ───
    // Draw a circular seal
    const sealX = W / 2;
    const sealY2 = qrY + 12;
    doc.setDrawColor(184, 148, 72);
    doc.setLineWidth(1.5);
    doc.circle(sealX, sealY2, 13);
    doc.setLineWidth(0.5);
    doc.circle(sealX, sealY2, 11);
    doc.setFontSize(6);
    doc.setTextColor(184, 148, 72);
    doc.setFont("helvetica", "bold");
    doc.text("Original Certified", sealX, sealY2 - 4, { align: "center" });
    doc.setFontSize(14);
    doc.text("SIAT", sealX, sealY2 + 3, { align: "center" });
    doc.setFontSize(5);
    doc.setFont("helvetica", "normal");
    doc.text("Reg. No: SH 6061", sealX, sealY2 + 7, { align: "center" });
    doc.text("SAHARSA - BIHAR", sealX, sealY2 + 10, { align: "center" });

    // ─── Director Signature (bottom right) ───
    const sigX = W - 45;
    const sigY = qrY + 6;
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 80);
    doc.setFont("helvetica", "italic");
    doc.text("P. Alam", sigX, sigY);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text("Md Parwez Alam", sigX - 2, sigY + 7);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Director", sigX + 5, sigY + 12);

    doc.save(`Certificate-${cert.certificate_number}.pdf`);
    toast.success("Certificate PDF downloaded!");
  };

  const handleToggleValid = async (cert: Certificate) => {
    const { error } = await supabase
      .from("certificates")
      .update({ is_valid: !cert.is_valid })
      .eq("id", cert.id);
    if (error) toast.error("Update failed: " + error.message);
    else { toast.success(`Certificate ${!cert.is_valid ? "activated" : "revoked"}.`); fetchCertificates(); }
  };

  const handleDelete = async (cert: Certificate) => {
    if (!confirm(`Delete certificate ${cert.certificate_number}?`)) return;
    if (cert.qr_code_url) {
      const fileName = `qr-${cert.certificate_number}.png`;
      await supabase.storage.from("certificates").remove([fileName]);
    }
    const { error } = await supabase.from("certificates").delete().eq("id", cert.id);
    if (error) toast.error("Delete failed: " + error.message);
    else { toast.success("Certificate deleted."); fetchCertificates(); }
  };

  return (
    <div className="space-y-8">
      {/* Create Certificate */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Certificate Management
          </h3>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary-glow !py-2 !px-4 text-sm flex items-center gap-1">
            <Plus className="w-4 h-4" /> {showForm ? "Cancel" : "New Certificate"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="space-y-4 border-t border-border pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Certificate Number</label>
                <div className="flex gap-2">
                  <input type="text" value={certNumber} onChange={(e) => setCertNumber(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground font-mono" required />
                  <button type="button" onClick={() => setCertNumber(generateCertNumber())}
                    className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80">Generate</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Student Name *</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Full name" maxLength={100} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Father's Name</label>
                <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Father's name" maxLength={100} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Mother's Name</label>
                <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="Mother's name" maxLength={100} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Course Name *</label>
                <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
                  placeholder="e.g. Python" maxLength={150} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Grade</label>
                <select value={grade} onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground">
                  <option value="A++">A++</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Training From</label>
                <input type="date" value={trainingFrom} onChange={(e) => setTrainingFrom(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Training To</label>
                <input type="date" value={trainingTo} onChange={(e) => setTrainingTo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Issue Date *</label>
                <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground" required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Expiry Date (optional)</label>
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground" />
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary-glow !py-2.5 !px-6 flex items-center gap-2">
              <QrCode className="w-4 h-4" /> {saving ? "Generating..." : "Generate Certificate + QR + Barcode"}
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
                {cert.qr_code_url && (
                  <img src={cert.qr_code_url} alt="QR" className="w-16 h-16 rounded-lg bg-white p-1 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm text-primary font-medium">{cert.certificate_number}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      cert.is_valid ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"
                    }`}>
                      {cert.is_valid ? "Valid" : "Revoked"}
                    </span>
                  </div>
                  <p className="text-foreground font-medium">{cert.student_name}</p>
                  <p className="text-sm text-muted-foreground">{cert.course_name} • {cert.issue_date}</p>
                  {(cert.father_name || cert.mother_name) && (
                    <p className="text-xs text-muted-foreground">
                      {cert.father_name && `Father: ${cert.father_name}`}
                      {cert.father_name && cert.mother_name && " • "}
                      {cert.mother_name && `Mother: ${cert.mother_name}`}
                    </p>
                  )}
                  {cert.training_from && cert.training_to && (
                    <p className="text-xs text-muted-foreground">Training: {formatDateDDMMYYYY(cert.training_from)} to {formatDateDDMMYYYY(cert.training_to)}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleDownloadPDF(cert)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleToggleValid(cert)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      cert.is_valid ? "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20" : "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    }`}>
                    {cert.is_valid ? "Revoke" : "Activate"}
                  </button>
                  <button onClick={() => handleDelete(cert)}
                    className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors" title="Delete">
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
