import { Link } from "react-router-dom";
import { CheckCircle, GraduationCap, Award, Users, Building } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  { q: "Which B.Tech colleges does SIAT recommend in Bihar?", a: "We guide students to top NIT, government engineering colleges, and reputed private institutes based on their rank, budget, and preferences." },
  { q: "Do you help with JEE counseling?", a: "Yes, we provide complete JoSAA and state counseling support including choice filling, document verification, and seat allotment guidance." },
  { q: "Is there any fee for consultation?", a: "Initial consultation is free. For detailed admission support and counseling packages, please contact us for pricing." },
  { q: "Can you help with Bihar Student Credit Card?", a: "Yes, we assist students in applying for Bihar Student Credit Card for funding their B.Tech education." },
];

const BTechAdmissionPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">SIAT Consultancy</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            B.Tech Admission <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Engineering mein admission chahiye? SIAT se paayein best college guidance, counseling support aur Student Credit Card assistance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Free Counseling</Link>
            <Link to="/consultancy-services" className="btn-outline-glow">All Services</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Our <span className="gradient-text">B.Tech Services</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "College Selection", desc: "Best engineering colleges based on your rank & budget" },
              { icon: Award, title: "JEE Counseling", desc: "JoSAA & state counseling support" },
              { icon: Users, title: "Career Guidance", desc: "Branch selection & career path planning" },
              { icon: Building, title: "Credit Card Help", desc: "Bihar Student Credit Card application support" },
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
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Admission <span className="gradient-text">Process</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["JEE Main / State entrance exam guidance", "College shortlisting based on rank", "JoSAA / State counseling registration", "Choice filling & seat allotment", "Document verification support", "Bihar Student Credit Card assistance"].map(item => (
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

export default BTechAdmissionPage;
