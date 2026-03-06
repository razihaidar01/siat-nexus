import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from("contact_submissions").insert({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || null,
      interest: formData.get("interest") as string,
      message: (formData.get("message") as string) || null,
    });

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
      form.reset();
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-section)" }}>
      {/* Floating shapes */}
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--accent))", top: "10%", left: "-5%" }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-3">
            Contact <span className="gradient-text">SIAT</span>
          </h2>
          <p className="text-muted-foreground mt-4">Koi bhi sawaal ho — humse baat karein, hum madad ke liye taiyaar hain!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                <input name="name" type="text" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground" placeholder="Apna naam likhein" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                <input name="phone" type="tel" required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground" placeholder="+91" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input name="email" type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Interested In</label>
              <select name="interest" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground">
                <option>Training Courses</option>
                <option>Software Development</option>
                <option>Consultancy Services</option>
                <option>Government Projects</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
              <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground resize-none" placeholder="Apni zaroorat batayein..." />
            </div>
            <button type="submit" disabled={loading} className="btn-primary-glow w-full flex items-center justify-center gap-2 disabled:opacity-70">
              {submitted ? <><CheckCircle className="w-4 h-4" /> Bhej Diya! ✓</> : loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 space-y-6">
              {[
                { icon: MapPin, title: "Address", text: "SIAT, Main Road, Saharsa, Bihar – 852201" },
                { icon: Phone, title: "Phone", text: "+91 7004216219, +91 9342470019" },
                { icon: Mail, title: "Email", text: "siat.sws@gmail.com" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card overflow-hidden h-[280px] group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57364.45!2d86.56!3d25.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef7082fe!2sSaharsa!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full border-0 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                title="SIAT Group Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
