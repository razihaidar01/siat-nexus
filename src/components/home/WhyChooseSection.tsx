import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 0.5], [-30, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [30, 0]);

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-section)" }}>
      {/* Floating accent shapes */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-[0.04] blur-2xl pointer-events-none"
        style={{ background: "hsl(var(--primary))", top: "20%", right: "10%" }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            style={{ x: leftX }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why SIAT</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-3 mb-6">
              SIAT Ko <span className="gradient-text">Kyun Chunein?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Ek decade se zyada ka experience — skill development, technology, aur institutional consulting mein.
              SIAT Bihar ka sabse bharosemand naam hai career transformation aur business growth ke liye.
            </p>
            <p className="text-muted-foreground/80 italic mb-8">
              "Humne hazaron students ki zindagi badli hai — ab aapki baari hai!"
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["10,000+ Alumni", "50+ Govt. Partners", "ISO 9001:2015", "4 Divisions"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ x: rightX }} className="grid sm:grid-cols-2 gap-5">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, type: "spring", stiffness: 80 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card-hover p-6 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <reason.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
