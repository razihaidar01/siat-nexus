import { Link } from "react-router-dom";
import { CheckCircle, FileCheck, Shield, TrendingUp, Building } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  { q: "What is MSME/Udyam Registration?", a: "MSME registration (now called Udyam Registration) is a government certification for micro, small, and medium enterprises that provides various benefits and subsidies." },
  { q: "What are the benefits of MSME registration?", a: "Benefits include priority sector lending, lower interest rates, tax benefits, government tender preference, and subsidies on patent/trademark registration." },
  { q: "How long does MSME registration take?", a: "With SIAT's assistance, MSME registration can be completed within 2-3 working days." },
  { q: "What documents are required?", a: "Aadhaar card, PAN card, business address proof, bank account details, and business activity details." },
];

const MSMERegistrationPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">SIAT Consultancy</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            MSME / Udyam <span className="gradient-text">Registration</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            MSME registration karwayein aur government benefits paayein — loans, subsidies, tender preference aur tax benefits.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Register Now</Link>
            <Link to="/consultancy-services" className="btn-outline-glow">All Services</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">MSME <span className="gradient-text">Benefits</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Lower Interest Rates", desc: "Priority lending at reduced interest rates" },
              { icon: Shield, title: "Tax Benefits", desc: "Income tax & GST exemptions" },
              { icon: Building, title: "Tender Preference", desc: "Priority in government tenders" },
              { icon: FileCheck, title: "Subsidies", desc: "Patent, trademark & barcode subsidies" },
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
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Registration <span className="gradient-text">Process</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Aadhaar & PAN verification", "Business details submission", "Udyam portal registration", "MSME certificate generation", "Bank account linking", "Benefits activation support"].map(item => (
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

export default MSMERegistrationPage;
