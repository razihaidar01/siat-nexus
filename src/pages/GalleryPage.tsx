import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  category: string | null;
}

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });
      setImages(data || []);
      setLoading(false);
    };
    fetchImages();

    const channel = supabase
      .channel("public-images-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "images" }, () => fetchImages())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category || "general")))];
  const filtered = activeCategory === "All" ? images : images.filter((img) => (img.category || "general") === activeCategory);

  const selectedImage = selectedIndex !== null ? filtered[selectedIndex] : null;

  const navigate = useCallback((dir: number) => {
    if (selectedIndex === null) return;
    const next = selectedIndex + dir;
    if (next >= 0 && next < filtered.length) setSelectedIndex(next);
  }, [selectedIndex, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, navigate]);

  return (
    <>
      {/* Hero with parallax */}
      <motion.section ref={heroRef} style={{ y: heroY, scale: heroScale }} className="section-padding bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <motion.p
            animate={{ x: [0, -500] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 text-[10rem] font-display font-black text-foreground/[0.02] whitespace-nowrap"
          >
            GALLERY · CAMPUS · EVENTS · LIFE AT SIAT · GALLERY · CAMPUS · EVENTS · LIFE AT SIAT ·
          </motion.p>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Gallery
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6">
            SIAT — <span className="gradient-text">Campus & Events</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse SIAT labs, classrooms, events, and student activities.
          </motion.p>
        </div>
      </motion.section>

      {/* Category filters */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
              }`}
              style={activeCategory === cat ? { boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)" } : {}}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Gallery Grid with stagger + slide animations */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No images available yet.</div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((img, i) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 120, damping: 20 }}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                    style={{ perspective: "1000px" }}
                    onClick={() => setSelectedIndex(i)}
                    whileHover={{ scale: 1.03, zIndex: 10 }}
                  >
                    <img
                      src={img.file_url}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                      <ZoomIn className="w-8 h-8 text-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                      <p className="text-background text-sm font-semibold truncate">{img.title}</p>
                      {img.description && <p className="text-background/70 text-xs truncate">{img.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox with slide navigation */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button onClick={() => setSelectedIndex(null)} className="absolute top-6 right-6 text-background hover:text-primary transition-colors z-10">
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Arrows */}
            {selectedIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center text-background transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {selectedIndex < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center text-background transition-all z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.85, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.85, opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="max-w-4xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.file_url}
                alt={selectedImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-display font-bold text-background">{selectedImage.title}</h3>
                {selectedImage.description && <p className="text-background/70 text-sm mt-1">{selectedImage.description}</p>}
                <p className="text-background/40 text-xs mt-2">{selectedIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
