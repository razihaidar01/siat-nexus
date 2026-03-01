import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Wind, Laptop, Camera, Clock, Briefcase, GraduationCap, Image } from "lucide-react";

const courses = [
  { icon: Smartphone, title: "Mobile Repairing", desc: "Chip-level smartphone repair training with hands-on practice", href: "/training-institute/mobile-repairing-course-bihar" },
  { icon: Wind, title: "AC Repairing", desc: "Split & window AC installation, servicing and gas charging", href: "/training-institute/ac-repairing-course-bihar" },
  { icon: Laptop, title: "Laptop Repairing", desc: "Hardware & software troubleshooting, motherboard repair", href: "/training-institute/laptop-repairing-course-bihar" },
  { icon: Camera, title: "CCTV Installation", desc: "IP & analog CCTV setup, networking and configuration", href: "/training-institute/cctv-installation-training-bihar" },
  { icon: Clock, title: "Short Term Courses", desc: "Job-ready skill courses — 1 to 3 months duration", href: "/training-institute/short-term-job-courses-bihar" },
  { icon: Briefcase, title: "Placement Support", desc: "Dedicated placement cell for job assistance after training", href: "/training-institute/placement-support" },
  { icon: GraduationCap, title: "Course Fees", desc: "Affordable fees with EMI options available", href: "/training-institute/course-fees" },
  { icon: Image, title: "Gallery", desc: "See our labs, classrooms and training sessions", href: "/training-institute/gallery" },
];

const TrainingHubPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">SIAT Training Institute</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Bihar Ka Sabse <span className="gradient-text">Bharosemand</span> Technical Training Institute
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Practical training, industry-certified courses, aur placement support — SIAT mein seekhein aur apna career banayein.
        </p>
        <Link to="/contact-us" className="btn-primary-glow">Admission Open — Apply Now</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
          Our <span className="gradient-text">Courses & Services</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={c.href} className="glass-card-hover p-6 block h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Why SIAT Training Institute?</h2>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {[
            { val: "10K+", label: "Students Trained" },
            { val: "95%", label: "Placement Rate" },
            { val: "ISO", label: "Certified Institute" },
          ].map(s => (
            <div key={s.label} className="glass-card p-6 text-center">
              <p className="text-3xl font-display font-black text-primary">{s.val}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default TrainingHubPage;
