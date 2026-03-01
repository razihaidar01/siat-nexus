import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Building, FileText, Users, Shield, Landmark } from "lucide-react";

const projects = [
  { icon: Users, title: "Government Skill Training", desc: "Bihar sarkar ke saath skill development programs", href: "/government-projects/government-skill-training-bihar" },
  { icon: Award, title: "PMKVY Training Center", desc: "Pradhan Mantri Kaushal Vikas Yojana partner", href: "/government-projects/pmkvy-training-center-bihar" },
  { icon: Building, title: "MSME Education Tender", desc: "MSME education tender participation", href: "/government-projects/msme-education-tender" },
  { icon: Landmark, title: "Skill India Partner", desc: "Registered Skill India training partner", href: "/government-projects/skill-india-training-partner" },
  { icon: Shield, title: "CSR Education Projects", desc: "CSR partnership opportunities", href: "/government-projects/csr-education-projects" },
  { icon: FileText, title: "Capability Statement", desc: "Our capabilities, infrastructure & certifications", href: "/government-projects/capability-statement" },
];

const GovernmentHubPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Bihar Sarkar Ka <span className="gradient-text">Bharosemand Partner</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT — Government skill training, PMKVY, Skill India aur CSR projects ka experienced implementation partner.
        </p>
        <Link to="/contact-us" className="btn-primary-glow">Partner With Us</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
          Our <span className="gradient-text">Government Initiatives</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={p.href} className="glass-card-hover p-6 block h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Government Partnership Stats</h2>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {[
            { val: "50+", label: "Govt. Partnerships" },
            { val: "10K+", label: "Beneficiaries Trained" },
            { val: "ISO", label: "Certified Organization" },
          ].map(s => (
            <div key={s.label} className="glass-card p-6 text-center">
              <p className="text-3xl font-display font-black text-primary">{s.val}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default GovernmentHubPage;
