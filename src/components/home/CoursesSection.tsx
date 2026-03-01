import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Wind, Laptop, Camera } from "lucide-react";

const courses = [
  {
    icon: Smartphone,
    title: "Mobile Repairing Course",
    duration: "3–6 Months",
    href: "/training-institute/mobile-repairing-course-bihar",
    description: "Chip-level mobile repair seekhein — latest smartphones par hands-on training.",
    hinglish: "Mobile repair ka complete course — apna shop kholein!",
  },
  {
    icon: Wind,
    title: "AC Repairing Course",
    duration: "3–6 Months",
    href: "/training-institute/ac-repairing-course-bihar",
    description: "Split & Window AC installation, servicing, aur gas charging master karein.",
    hinglish: "AC technician banein — demand bahut hai!",
  },
  {
    icon: Laptop,
    title: "Laptop Repairing Course",
    duration: "4–6 Months",
    href: "/training-institute/laptop-repairing-course-bihar",
    description: "Hardware & software repair — motherboard, BGA rework, OS troubleshooting.",
    hinglish: "Laptop repair seekhein — high-demand skill!",
  },
  {
    icon: Camera,
    title: "CCTV Installation Training",
    duration: "2–3 Months",
    href: "/training-institute/cctv-installation-training-bihar",
    description: "Complete CCTV setup, networking, DVR/NVR configuration aur maintenance.",
    hinglish: "CCTV expert banein — har jagah demand hai!",
  },
];

const CoursesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Popular Programs</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-3">
            Skill Development <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Industry-focused training with placement support aur QR-verified certificates.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={course.href} className="block glass-card-hover p-6 h-full group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <course.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <span className="text-xs font-medium text-accent">{course.duration}</span>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{course.description}</p>
                <p className="text-xs text-primary/70 italic mt-2">{course.hinglish}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/training-institute" className="btn-outline-glow !py-3 !px-6 !text-sm">
            View All Courses →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
