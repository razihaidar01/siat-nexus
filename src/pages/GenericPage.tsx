import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GenericPage = ({ title, description }: { title: string; description: string }) => {
  const location = useLocation();

  return (
    <>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <Link to="/contact-us" className="btn-primary-glow">
              Humse Sampark Karein
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-10">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Yeh Page Jaldi Aa Raha Hai! 🚀
            </h2>
            <p className="text-muted-foreground mb-6">
              Hum is page par kaam kar rahe hain. Jaldi hi yahan par poori jaankari mil jayegi. Abhi ke liye humse contact karein.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
              <Link to="/" className="btn-outline-glow !py-3 !px-5 !text-sm">Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GenericPage;
