import { Link } from "react-router-dom";
import { CheckCircle, GraduationCap, Stethoscope, Cog, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const streams = [
  { icon: Stethoscope, title: "Medical (MBBS/BDS)", desc: "Top medical colleges with NEET counseling support", href: "/consultancy-services/mbbs-admission-bihar" },
  { icon: Cog, title: "Engineering (B.Tech)", desc: "Best engineering colleges with JEE guidance", href: "/consultancy-services/btech-admission-bihar" },
  { icon: BookOpen, title: "BCA / IT", desc: "Top computer application colleges", href: "/consultancy-services/bca-college-bihar" },
  { icon: GraduationCap, title: "Nursing", desc: "Reputed nursing colleges in Bihar", href: "/consultancy-services/nursing-college-bihar" },
];

const BestCollegePage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">SIAT Consultancy</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Best Colleges <span className="gradient-text">in Bihar</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Bihar ke top colleges ki complete jaankari — MBBS, B.Tech, BCA, Nursing aur more. Expert counseling se sahi college chunein.
        </p>
        <Link to="/contact-us" className="btn-primary-glow">Free College Counseling</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Browse by <span className="gradient-text">Stream</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {streams.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={s.href} className="glass-card-hover p-6 block h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><s.icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-display font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Our <span className="gradient-text">Services</span></h2>
        <div className="grid md:grid-cols-2 gap-4">
          {["College shortlisting based on rank & budget", "Entrance exam preparation guidance", "Counseling & choice filling support", "Document verification assistance", "Bihar Student Credit Card help", "Hostel & accommodation guidance"].map(item => (
            <div key={item} className="flex items-center gap-3 glass-card p-4">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default BestCollegePage;
