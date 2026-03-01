import { Link } from "react-router-dom";
import { CheckCircle, Code, Database, Cog, BarChart3 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  { q: "What types of software does RH Software develop?", a: "We develop custom ERP, CRM, inventory management, billing systems, school/hospital management software, and more." },
  { q: "How long does it take to develop custom software?", a: "Timeline depends on complexity — typically 2-6 months for most projects. We provide detailed timelines after requirement analysis." },
  { q: "Do you provide post-launch support?", a: "Yes, we offer 6-12 months of free support and maintenance after launch, with optional extended support plans." },
  { q: "Can you integrate with existing systems?", a: "Absolutely. We specialize in API integrations, database migrations, and connecting with existing business tools." },
];

const SoftwareDevelopmentPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">RH Software</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Software Development <span className="gradient-text">Company in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Custom software solutions — ERP, CRM, billing systems aur business automation. Bihar ki trusted software development company.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Get Free Quote</Link>
            <Link to="/rh-software" className="btn-outline-glow">All IT Services</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">What We <span className="gradient-text">Build</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Database, title: "ERP Systems", desc: "Complete enterprise resource planning solutions" },
              { icon: BarChart3, title: "CRM Software", desc: "Customer relationship management tools" },
              { icon: Cog, title: "Automation", desc: "Business process automation & workflow tools" },
              { icon: Code, title: "Custom Solutions", desc: "Tailor-made software for unique requirements" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><item.icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Our <span className="gradient-text">Process</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Requirement Analysis & Planning", "UI/UX Design & Prototyping", "Agile Development & Testing", "Deployment & Training", "Post-Launch Support", "Performance Optimization"].map(item => (
              <div key={item} className="flex items-center gap-3 glass-card p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <details key={faq.q} className="glass-card p-6 group cursor-pointer">
                <summary className="font-display font-bold text-foreground list-none flex items-center justify-between">{faq.q}<span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span></summary>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SoftwareDevelopmentPage;
