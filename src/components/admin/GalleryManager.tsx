import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  file_url: string;
  created_at: string;
}

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false });
    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();

    const channel = supabase
      .channel("admin-images-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "images" },
        () => fetchImages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(selected.type)) {
      toast.error("Only JPG, PNG, WebP, and GIF files are allowed.");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast.error("Title and image are required.");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("images").insert({
      title: title.trim(),
      description: description.trim() || null,
      category,
      file_url: urlData.publicUrl,
    });

    if (insertError) {
      toast.error("Failed to save: " + insertError.message);
    } else {
      toast.success("Image uploaded successfully!");
      setTitle("");
      setDescription("");
      setCategory("general");
      setFile(null);
      setPreview(null);
      fetchImages();
    }
    setUploading(false);
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm(`Delete "${image.title}"?`)) return;

    // Extract file path from URL
    const urlParts = image.file_url.split("/images/");
    const filePath = urlParts[urlParts.length - 1];

    await supabase.storage.from("images").remove([filePath]);
    const { error } = await supabase.from("images").delete().eq("id", image.id);

    if (error) {
      toast.error("Delete failed: " + error.message);
    } else {
      toast.success("Image deleted.");
      fetchImages();
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <form onSubmit={handleUpload} className="glass-card p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" /> Upload New Image
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
              placeholder="Image title"
              maxLength={100}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
            >
              <option value="general">General</option>
              <option value="lab">Lab</option>
              <option value="event">Event</option>
              <option value="training">Training</option>
              <option value="infrastructure">Infrastructure</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground"
            placeholder="Optional description"
            rows={2}
            maxLength={500}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Image File *</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
          />
        </div>
        {preview && (
          <div className="relative w-40 h-40">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <button
          type="submit"
          disabled={uploading}
          className="btn-primary-glow !py-2.5 !px-6"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* Gallery Grid */}
      <div>
        <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" /> Gallery ({images.length})
        </h3>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No images yet. Upload your first image above.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className="glass-card rounded-xl overflow-hidden group relative">
                <img
                  src={img.file_url}
                  alt={img.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">{img.title}</p>
                  <p className="text-xs text-muted-foreground">{img.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(img)}
                  className="absolute top-2 right-2 w-8 h-8 bg-destructive/90 text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
