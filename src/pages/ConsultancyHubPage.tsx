import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Stethoscope, Cog, BookOpen, School, Award, FileCheck, Building } from "lucide-react";

const services = [
  { icon: School, title: "Best Colleges in Bihar", desc: "Top college guidance for all streams", href: "/consultancy-services/best-college-in-bihar" },
  { icon: Stethoscope, title: "MBBS Admission", desc: "Medical college admission guidance & counseling", href: "/consultancy-services/mbbs-admission-bihar" },
  { icon: Cog, title: "B.Tech Admission", desc: "Engineering college admission support", href: "/consultancy-services/btech-admission-bihar" },
  { icon: BookOpen, title: "BCA College", desc: "Best BCA colleges in Bihar", href: "/consultancy-services/bca-college-bihar" },
  { icon: GraduationCap, title: "Nursing College", desc: "Top nursing college admission guidance", href: "/consultancy-services/nursing-college-bihar" },
  { icon: Award, title: "ISO Certification", desc: "ISO 9001, 14001, 45001 certification assistance", href: "/consultancy-services/iso-certification-bihar" },
  { icon: FileCheck, title: "MSME Registration", desc: "Udyam registration & MSME benefits", href: "/consultancy-services/msme-registration" },
  { icon: Building, title: "Admission After 12th", desc: "Career guidance after 12th class", href: "/consultancy-services/admission-after-12th-bihar" },
];

const ConsultancyHubPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">SIAT Consultancy</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Education & Business <span className="gradient-text">Consultancy Services</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          College admission guidance, ISO certification, MSME registration — SIAT Consultancy ke saath apna future secure karein.
        </p>
        <Link to="/contact-us" className="btn-primary-glow">Free Consultation</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
          Our <span className="gradient-text">Consultancy Services</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={s.href} className="glass-card-hover p-6 block h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default ConsultancyHubPage;
