import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Code2, Briefcase, Landmark } from "lucide-react";

const divisions = [
  {
    icon: GraduationCap,
    title: "Training Institute",
    description: "Industry-ready skill development programs — mobile, laptop & AC repairing, CCTV installation with placement support aur QR-verified certificates.",
    hinglish: "Practical training se career banayein — job-ready skills seekhein!",
    color: "from-primary to-accent",
    href: "/training-institute",
    features: ["Practical Labs", "Certified Instructors", "Job Placement"],
  },
  {
    icon: Code2,
    title: "RH Software",
    description: "Full-stack IT solutions — website, app, software, aur AI development. Bihar ke businesses ko digital banayein.",
    hinglish: "Apna business online le jaayein — website se app tak sab banwayein!",
    color: "from-accent to-sky",
    href: "/rh-software",
    features: ["Web & Mobile Apps", "AI Solutions", "Enterprise Software"],
  },
  {
    icon: Briefcase,
    title: "Consultancy Services",
    description: "College admissions (MBBS, B.Tech, BCA, Nursing), ISO certification, MSME registration, aur career counseling mein expert guidance.",
    hinglish: "Admission se certification tak — sab kuch ek jagah!",
    color: "from-gold to-primary",
    href: "/consultancy-services",
    features: ["MBBS Admission", "ISO Certification", "Career Counseling"],
  },
  {
    icon: Landmark,
    title: "Government Projects",
    description: "PMKVY, Skill India, MSME tenders, aur CSR education projects ke liye trusted partner — proven infrastructure aur compliance.",
    hinglish: "Sarkar ka bharosemand partner — skill training aur project delivery mein!",
    color: "from-primary to-navy",
    href: "/government-projects",
    features: ["PMKVY Center", "Skill India Partner", "Tender Compliance"],
  },
];

const DivisionsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-3">
            Our Four <span className="gradient-text">Divisions</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Ek complete ecosystem — Bihar ko education, technology, aur institutional growth se empower karna.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {divisions.map((div, i) => (
            <motion.div
              key={div.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <Link to={div.href} className="block glass-card-hover p-8 md:p-10 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${div.color} flex items-center justify-center mb-6`}>
                  <div.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {div.title}
                </h3>
                <p className="text-sm text-primary/80 italic mb-3">{div.hinglish}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{div.description}</p>
                <div className="flex flex-wrap gap-2">
                  {div.features.map((f) => (
                    <span key={f} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
