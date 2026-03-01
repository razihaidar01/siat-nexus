import { Link } from "react-router-dom";
import { CheckCircle, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  { name: "Mobile Repairing (Basic)", duration: "3 Months", fee: "₹8,000", highlights: ["Hardware basics", "Software flashing", "Certificate"] },
  { name: "Mobile Repairing (Advanced)", duration: "6 Months", fee: "₹15,000", highlights: ["Chip-level repair", "Micro-soldering", "Placement support"] },
  { name: "AC Repairing", duration: "3 Months", fee: "₹10,000", highlights: ["Split & window AC", "Gas charging", "Installation"] },
  { name: "Laptop Repairing", duration: "6 Months", fee: "₹18,000", highlights: ["Motherboard repair", "BGA rework", "Placement support"] },
  { name: "CCTV Installation", duration: "2 Months", fee: "₹7,000", highlights: ["IP & analog CCTV", "Networking basics", "Certificate"] },
  { name: "Short Term Courses", duration: "1-3 Months", fee: "₹5,000+", highlights: ["Multiple trades", "Flexible schedule", "Job-ready skills"] },
];

const CourseFeesPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Course <span className="gradient-text">Fees Structure</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Affordable training fees with EMI options available. Invest in your skills today for a better tomorrow.
        </p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card-hover p-6">
              <h3 className="font-display font-bold text-foreground text-lg mb-1">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Duration: {c.duration}</p>
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="w-5 h-5 text-primary" />
                <span className="text-2xl font-display font-black text-primary">{c.fee}</span>
              </div>
              <ul className="space-y-2">
                {c.highlights.map(h => (
                  <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {h}
                  </li>
                ))}
              </ul>
              <Link to="/contact-us" className="block mt-4 btn-primary-glow text-center !py-2.5 !text-sm">Enroll Now</Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">* Fees may vary. Contact us for exact pricing and EMI options.</p>
      </div>
    </section>
  </>
);

export default CourseFeesPage;
