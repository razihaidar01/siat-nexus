import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, ShieldCheck, Building2 } from "lucide-react";

const reasons = [
  { icon: Award, title: "Practical Training", description: "Real-world projects aur live equipment par hands-on learning — fully equipped labs mein." },
  { icon: Users, title: "Placement Support", description: "Dedicated placement cell — graduates ko Bihar aur poore India mein employers se connect karta hai." },
  { icon: ShieldCheck, title: "ISO Certified", description: "Internationally recognized certification — highest quality standards ka guarantee." },
  { icon: Building2, title: "Government Experience", description: "PMKVY, Skill India, aur MSME government projects mein proven track record." },
];

const WhyChooseSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why SIAT Group</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-3 mb-6">
              SIAT Ko <span className="gradient-text">Kyun Chunein?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Ek decade se zyada ka experience — skill development, technology, aur institutional consulting mein.
              SIAT Group Bihar ka sabse bharosemand naam hai career transformation aur business growth ke liye.
            </p>
            <p className="text-muted-foreground/80 italic mb-8">
              "Humne hazaron students ki zindagi badli hai — ab aapki baari hai!"
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["10,000+ Alumni", "50+ Govt. Partners", "ISO 9001:2015", "4 Divisions"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass-card-hover p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <reason.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
