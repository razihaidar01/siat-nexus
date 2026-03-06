import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Rahul Kumar", course: "Mobile Repairing", text: "SIAT ki practical training ne mujhe 2 mahine mein apni mobile repair shop kholne mein madad ki. Placement team bahut supportive thi.", rating: 5 },
  { name: "Priya Singh", course: "Website Development", text: "RH Software ki mentorship se maine real projects banaye. Patna ki ek IT company mein turant placement mil gayi.", rating: 5 },
  { name: "Amit Jha", course: "AC Repairing", text: "Bihar ka best AC repairing institute. Real units par hands-on training. Ab main ₹25,000+ monthly kamata hoon as certified technician.", rating: 5 },
  { name: "Sneha Kumari", course: "MBBS Admission", text: "SIAT ki consultancy team ne NEET counseling aur admission process mein poori guidance di. Bahut professional aur trustworthy.", rating: 5 },
  { name: "Vikash Yadav", course: "CCTV Installation", text: "3 mahine mein CCTV training complete ki. Ab independently installation projects handle karta hoon. Great course aur great team!", rating: 5 },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="section-padding bg-background overflow-hidden relative">
      {/* Background quote marks */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <Quote className="absolute top-20 left-10 w-32 h-32 text-primary/[0.04] rotate-12" />
        <Quote className="absolute bottom-20 right-10 w-48 h-48 text-primary/[0.03] -rotate-6" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-3">
            Hamare <span className="gradient-text">Students Kya Kehte Hain</span>
          </h2>
          <p className="text-muted-foreground mt-4">Real students, real results — unki kahaani unki zubaani!</p>
        </motion.div>

        <motion.div
          style={{ x: marqueeX }}
          ref={scrollRef}
          className="flex gap-6 pb-4 -mx-6 px-6"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (i % testimonials.length) * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-8 min-w-[320px] md:min-w-[380px] flex-shrink-0 group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                <Quote className="w-16 h-16 text-primary" />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6 text-sm relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-primary-foreground text-sm" style={{ background: "var(--gradient-blue)" }}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.course}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
