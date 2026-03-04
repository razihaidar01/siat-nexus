import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, FileText, X, Eye, EyeOff, Pencil } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  file_url: string;
  is_public: boolean | null;
  created_at: string;
}

const DocumentsManager = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [isPublic, setIsPublic] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchDocuments = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });
    setDocuments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
    const channel = supabase
      .channel("admin-documents-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "documents" }, () => fetchDocuments())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB.");
      return;
    }
    setFile(selected);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast.error("Title and file are required.");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("documents").upload(fileName, file);
    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("documents").getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("documents").insert({
      title: title.trim(),
      description: description.trim() || null,
      category,
      file_url: urlData.publicUrl,
      is_public: isPublic,
    });

    if (insertError) {
      toast.error("Failed to save: " + insertError.message);
    } else {
      toast.success("Document uploaded!");
      setTitle("");
      setDescription("");
      setCategory("general");
      setIsPublic(true);
      setFile(null);
      fetchDocuments();
    }
    setUploading(false);
  };

  const handleTogglePublic = async (doc: Document) => {
    const { error } = await supabase.from("documents").update({ is_public: !doc.is_public }).eq("id", doc.id);
    if (error) toast.error("Update failed: " + error.message);
    else {
      toast.success(`Document ${!doc.is_public ? "published" : "hidden"}.`);
      fetchDocuments();
    }
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm(`Delete "${doc.title}"?`)) return;
    const urlParts = doc.file_url.split("/documents/");
    const filePath = urlParts[urlParts.length - 1];
    await supabase.storage.from("documents").remove([filePath]);
    const { error } = await supabase.from("documents").delete().eq("id", doc.id);
    if (error) toast.error("Delete failed: " + error.message);
    else { toast.success("Document deleted."); fetchDocuments(); }
  };

  const handleEdit = async (doc: Document) => {
    if (editingId === doc.id) {
      const { error } = await supabase.from("documents").update({
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      }).eq("id", doc.id);
      if (error) toast.error("Update failed: " + error.message);
      else { toast.success("Document updated."); setEditingId(null); fetchDocuments(); }
    } else {
      setEditingId(doc.id);
      setEditTitle(doc.title);
      setEditDescription(doc.description || "");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleUpload} className="glass-card p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" /> Upload New Document
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
              placeholder="Document title" maxLength={150} required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground">
              <option value="general">General</option>
              <option value="brochure">Brochure</option>
              <option value="tender">Tender</option>
              <option value="certificate">Certificate</option>
              <option value="form">Form</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
            placeholder="Optional description" rows={2} maxLength={500} />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground block mb-1">File *</label>
            <input type="file" onChange={handleFileChange}
              className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer mt-5">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
            <span className="text-sm text-foreground">Public</span>
          </label>
        </div>
        <button type="submit" disabled={uploading} className="btn-primary-glow !py-2.5 !px-6">
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> All Documents ({documents.length})
        </h3>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No documents yet.</div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="glass-card p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  {editingId === doc.id ? (
                    <div className="space-y-2">
                      <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground text-sm" />
                      <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground text-sm"
                        placeholder="Description" />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">{doc.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${doc.is_public ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"}`}>
                          {doc.is_public ? "Public" : "Hidden"}
                        </span>
                      </div>
                      {doc.description && <p className="text-sm text-muted-foreground truncate">{doc.description}</p>}
                      <p className="text-xs text-muted-foreground">{doc.category} • {new Date(doc.created_at).toLocaleDateString()}</p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="View">
                    <Eye className="w-4 h-4" />
                  </a>
                  <button onClick={() => handleEdit(doc)}
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors" title={editingId === doc.id ? "Save" : "Edit"}>
                    {editingId === doc.id ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleTogglePublic(doc)}
                    className={`p-2 rounded-lg transition-colors ${doc.is_public ? "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20" : "bg-green-500/10 text-green-600 hover:bg-green-500/20"}`}
                    title={doc.is_public ? "Hide" : "Publish"}>
                    {doc.is_public ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(doc)}
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

export default DocumentsManager;
