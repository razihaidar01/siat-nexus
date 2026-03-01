import { Link } from "react-router-dom";
import { CheckCircle, Briefcase, Users, Building, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PlacementSupportPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Placement <span className="gradient-text">Support</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Dedicated placement cell — course complete hone ke baad job dhundhne mein poori madad. 95% placement rate.
          </p>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">How We <span className="gradient-text">Help</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Briefcase, title: "Job Placement", desc: "Direct placement in service centers, companies & shops" },
              { icon: Users, title: "Interview Prep", desc: "Resume building & mock interview sessions" },
              { icon: Building, title: "Industry Connect", desc: "Partnerships with 100+ employers across India" },
              { icon: TrendingUp, title: "Business Support", desc: "Guidance to start your own repair shop or business" },
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
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Placement <span className="gradient-text">Process</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Complete your chosen course", "Resume & portfolio preparation", "Mock interviews & soft skills training", "Job matching with employer partners", "Interview scheduling & follow-up", "Post-placement support for 3 months"].map(item => (
              <div key={item} className="flex items-center gap-3 glass-card p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Placement Stats</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {[
              { val: "95%", label: "Placement Rate" },
              { val: "100+", label: "Employer Partners" },
              { val: "₹12K+", label: "Avg Starting Salary" },
            ].map(s => (
              <div key={s.label} className="glass-card p-6 text-center">
                <p className="text-3xl font-display font-black text-primary">{s.val}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <Link to="/contact-us" className="btn-primary-glow mt-8 inline-block">Apply for Placement</Link>
        </div>
      </section>
    </>
  );
};

export default PlacementSupportPage;
