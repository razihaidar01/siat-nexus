import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Smartphone, Code, Brain, BarChart3, Briefcase, FileText, IndianRupee } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Development", desc: "Custom websites, e-commerce & CMS solutions", href: "/rh-software/website-development-company-bihar" },
  { icon: Smartphone, title: "App Development", desc: "Android & iOS mobile applications", href: "/rh-software/app-development-company-bihar" },
  { icon: Code, title: "Software Development", desc: "Custom ERP, CRM & business automation", href: "/rh-software/software-development-company-bihar" },
  { icon: Brain, title: "AI Development", desc: "Machine learning, chatbots & AI integration", href: "/rh-software/ai-development-company-bihar" },
  { icon: BarChart3, title: "ERP & CRM", desc: "Enterprise resource planning & customer management", href: "/rh-software/erp-crm-development" },
  { icon: Briefcase, title: "Portfolio", desc: "View our successful projects & client work", href: "/rh-software/portfolio" },
  { icon: FileText, title: "Case Studies", desc: "Real results from real businesses", href: "/rh-software/case-studies" },
  { icon: IndianRupee, title: "Pricing", desc: "Transparent pricing for all services", href: "/rh-software/pricing" },
];

const RHSoftwareHubPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">RH Software — IT Division</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Bihar Ki Leading <span className="gradient-text">IT Company</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Website, app, software aur AI development — RH Software ke saath apne business ko digital banayein.
        </p>
        <Link to="/contact-us" className="btn-primary-glow">Get a Free Quote</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
          Our <span className="gradient-text">IT Services</span>
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

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">RH Software by the Numbers</h2>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {[
            { val: "500+", label: "Projects Delivered" },
            { val: "200+", label: "Happy Clients" },
            { val: "5+", label: "Years Experience" },
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

export default RHSoftwareHubPage;
