import { Link } from "react-router-dom";
import { CheckCircle, Award, Users, Building, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  { q: "What is PMKVY?", a: "Pradhan Mantri Kaushal Vikas Yojana is a government scheme to provide free skill training to Indian youth for better employment opportunities." },
  { q: "Is PMKVY training free?", a: "Yes, PMKVY training is completely free for eligible candidates. The government bears all training costs." },
  { q: "What courses are available under PMKVY at SIAT?", a: "We offer courses in electronics, IT, retail, healthcare, and more under PMKVY. Contact us for the current list of available courses." },
  { q: "Do I get a certificate after PMKVY training?", a: "Yes, you receive a government-recognized certificate from the National Skill Development Corporation (NSDC) upon successful completion." },
];

const PMKVYPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            PMKVY Training Center <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            SIAT — Pradhan Mantri Kaushal Vikas Yojana ka registered training center. Free government-certified skill training Bihar mein.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Enroll Free</Link>
            <Link to="/government-projects" className="btn-outline-glow">All Govt. Projects</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">PMKVY <span className="gradient-text">Benefits</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Free Training", desc: "100% government-funded skill training" },
              { icon: Shield, title: "NSDC Certificate", desc: "Nationally recognized certification" },
              { icon: Users, title: "Placement Support", desc: "Job placement assistance after training" },
              { icon: Building, title: "Modern Labs", desc: "Fully equipped training infrastructure" },
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
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Available <span className="gradient-text">Courses</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Electronics & Hardware", "IT & ITES", "Retail Management", "Healthcare Support", "Beauty & Wellness", "Telecom & Networking", "Automotive Repair", "Construction & Plumbing"].map(item => (
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

export default PMKVYPage;
