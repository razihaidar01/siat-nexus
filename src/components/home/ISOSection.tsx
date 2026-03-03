import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Shield, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const certifications = [
  { name: "ISO 9001:2015", desc: "Quality Management System", icon: Shield },
  { name: "ISO 14001:2015", desc: "Environmental Management", icon: Award },
  { name: "ISO 45001:2018", desc: "Occupational Health & Safety", icon: CheckCircle },
];

const ISOSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="section-padding overflow-hidden relative" style={{ background: "var(--gradient-section)" }}>
      {/* Sliding background text */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden">
        <motion.p style={{ x: x1 }} className="text-[8rem] md:text-[12rem] font-display font-black text-foreground/[0.03] whitespace-nowrap leading-none">
          ISO CERTIFIED · QUALITY · TRUST · EXCELLENCE ·
        </motion.p>
        <motion.p style={{ x: x2 }} className="text-[8rem] md:text-[12rem] font-display font-black text-foreground/[0.03] whitespace-nowrap leading-none">
          · STANDARDS · COMPLIANCE · ASSURANCE · RELIABILITY
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              Internationally Certified
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-6 leading-tight"
            >
              ISO Certified Organization — <span className="gradient-text">Quality You Can Trust</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-4 leading-relaxed"
            >
              SIAT ek ISO certified organization hai jo international quality standards follow karta hai. 
              Hamare training programs, software services aur consultancy — sab ISO guidelines ke anusaar hain.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              Apne business ya organization ke liye bhi ISO certification chahiye? SIAT ki consultancy team aapki madad karegi.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/consultancy-services/iso-certification-bihar"
                className="inline-flex items-center gap-2 btn-primary-glow !text-base"
              >
                ISO Certification Paayein <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right cards */}
          <div className="space-y-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 80 }}
                className="glass-card-hover p-6 flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient-blue)" }}>
                  <cert.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </div>
                <div className="ml-auto">
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">Certified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ISOSection;
