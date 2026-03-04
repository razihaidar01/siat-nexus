import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { LogOut, Image, Award, LayoutDashboard, FileText, MessageSquare } from "lucide-react";
import { useState } from "react";
import GalleryManager from "@/components/admin/GalleryManager";
import CertificateManager from "@/components/admin/CertificateManager";
import DocumentsManager from "@/components/admin/DocumentsManager";
import ContactSubmissions from "@/components/admin/ContactSubmissions";

type Tab = "gallery" | "certificates" | "documents" | "contacts";

const AdminAreaPage = () => {
  const { user, isAdmin, loading, signOut } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("certificates");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin-login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleLogout = async () => {
    await signOut();
    navigate("/admin-login");
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "certificates", label: "Certificates", icon: <Award className="w-4 h-4" /> },
    { id: "gallery", label: "Gallery", icon: <Image className="w-4 h-4" /> },
    { id: "documents", label: "Documents", icon: <FileText className="w-4 h-4" /> },
    { id: "contacts", label: "Contact Leads", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <section className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <h1 className="font-display font-bold text-foreground text-lg">SIAT Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 mb-6 border-b border-border pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "gallery" && <GalleryManager />}
        {activeTab === "certificates" && <CertificateManager />}
        {activeTab === "documents" && <DocumentsManager />}
        {activeTab === "contacts" && <ContactSubmissions />}
      </div>
    </section>
  );
};

export default AdminAreaPage;
