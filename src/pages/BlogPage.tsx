import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "MBBS Admission Bihar 2026 — Complete Guide",
    excerpt: "Bihar mein MBBS admission kaise le? NEET score, top colleges, fees structure aur complete process yahan jaanein.",
    category: "Career Guidance",
    date: "Feb 28, 2026",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    link: "/consultancy-services/mbbs-admission-bihar",
  },
  {
    id: 2,
    title: "Mobile Repairing Course — Scope & Future in 2026",
    excerpt: "Mobile repairing ka scope kitna hai? Job opportunities, salary aur SIAT se training kaise karein — poori jaankari.",
    category: "Skill Development",
    date: "Feb 20, 2026",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
    link: "/training-institute/mobile-repairing-course-bihar",
  },
  {
    id: 3,
    title: "PMKVY 4.0 Registration — Kaise Karein Apply?",
    excerpt: "Pradhan Mantri Kaushal Vikas Yojana ke through free skill training paayein. Registration process step-by-step.",
    category: "Government Schemes",
    date: "Feb 15, 2026",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    link: "/government-projects/pmkvy-training-center-bihar",
  },
  {
    id: 4,
    title: "AI & Machine Learning — India mein Career Opportunities",
    excerpt: "Artificial Intelligence ka future kya hai? India mein AI jobs, salary aur kaise seekhein — expert guide.",
    category: "Technology",
    date: "Feb 10, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    link: "/rh-software/ai-development-company-bihar",
  },
  {
    id: 5,
    title: "ISO Certification Kaise Le? — Complete Process Bihar",
    excerpt: "ISO 9001, ISO 14001, ISO 45001 — apne business ke liye ISO certification kaise paayein. Step-by-step guide.",
    category: "Business",
    date: "Feb 5, 2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    link: "/consultancy-services/iso-certification-bihar",
  },
  {
    id: 6,
    title: "B.Tech Admission 2026 — Top Engineering Colleges Bihar",
    excerpt: "Bihar ke best engineering colleges, admission process, fees aur placement — sabkuch ek jagah.",
    category: "Career Guidance",
    date: "Jan 28, 2026",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop",
    link: "/consultancy-services/btech-admission-bihar",
  },
];

const categories = ["All", "Career Guidance", "Skill Development", "Government Schemes", "Technology", "Business"];

const BlogPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            SIAT Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6"
          >
            Knowledge Hub — <span className="gradient-text">Learn, Grow, Succeed</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Career guidance, skill development tips, government schemes aur technology updates — sab kuch ek jagah.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                cat === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover overflow-hidden group"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-xs text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-full">
                      <Tag className="w-3 h-3" /> {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    to={post.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Apna Career Build Karein SIAT ke Saath
          </h2>
          <p className="text-muted-foreground mb-8">
            Skill training se lekar job placement tak — hum har step pe aapke saath hain.
          </p>
          <Link to="/contact-us" className="btn-primary-glow">
            Enquiry Karein
          </Link>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
