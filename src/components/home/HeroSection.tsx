import { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import siatLogo from "@/assets/siat-logo.png";

const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));

const counterVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.6 + i * 0.1, type: "spring", stiffness: 100 },
  }),
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const textX = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--primary))", top: "10%", left: "-10%" }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--accent))", bottom: "10%", right: "-5%" }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div style={{ x: textX }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.img
              src={siatLogo}
              alt="SIAT Logo"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            />
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Bihar's Most Trusted Organization
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-[1.1] text-foreground mb-6"
          >
            SIAT –{" "}
            <span className="gradient-text">Bihar's Leading</span>{" "}
            Training, IT & Consultancy Organization
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4 leading-relaxed"
          >
            Empowering students, businesses, and government initiatives through skill development, technology, and consultancy.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base text-muted-foreground/80 max-w-2xl mb-10 leading-relaxed italic"
          >
            "Apna future banayein SIAT ke saath — skill seekhein, technology apnaayein, aur Bihar ko aage le jaayein!"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/contact-us" className="btn-primary-glow">
              Apply Now
            </Link>
            <Link to="/contact-us" className="btn-outline-glow">
              Contact Us
            </Link>
          </motion.div>

          {/* Stats with spring animation */}
          <div className="flex flex-wrap gap-8 md:gap-14 mt-16">
            {[
              { value: "10K+", label: "Students Trained" },
              { value: "500+", label: "Projects Delivered" },
              { value: "50+", label: "Gov. Partnerships" },
              { value: "ISO", label: "Certified" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={counterVariants}
              >
                <p className="text-3xl md:text-4xl font-display font-black text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-3 rounded-full bg-primary/50"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
