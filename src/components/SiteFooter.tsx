import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import siatLogo from "@/assets/siat-logo.png";

const footerLinks = [
  {
    title: "Training",
    links: [
      { label: "Mobile Repairing", href: "/training-institute/mobile-repairing-course-bihar" },
      { label: "AC Repairing", href: "/training-institute/ac-repairing-course-bihar" },
      { label: "Laptop Repairing", href: "/training-institute/laptop-repairing-course-bihar" },
      { label: "CCTV Installation", href: "/training-institute/cctv-installation-training-bihar" },
      { label: "Placement Support", href: "/training-institute/placement-support" },
    ],
  },
  {
    title: "RH Software",
    links: [
      { label: "Website Development", href: "/rh-software/website-development-company-bihar" },
      { label: "App Development", href: "/rh-software/app-development-company-bihar" },
      { label: "AI Development", href: "/rh-software/ai-development-company-bihar" },
      { label: "Portfolio", href: "/rh-software/portfolio" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Consultancy", href: "/consultancy-services" },
      { label: "Government Projects", href: "/government-projects" },
      { label: "ISO Certification", href: "/consultancy-services/iso-certification-bihar" },
      { label: "MSME Registration", href: "/consultancy-services/msme-registration" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Verify Certificate", href: "/verify-certificate" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
];

const SiteFooter = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Large brand text */}
      <div className="overflow-hidden py-12 border-b border-background/10">
        <p className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-display font-black tracking-tighter text-background/[0.04] leading-none text-center select-none">
          SIAT GROUP
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Logo + tagline */}
        <div className="flex items-center gap-3 mb-12">
          <img src={siatLogo} alt="SIAT Group Logo" className="w-14 h-14 rounded-full" />
          <div>
            <span className="font-display font-bold text-2xl text-background">SIAT Group</span>
            <p className="text-sm text-background/50">Bihar's Leading Training, IT & Consultancy Organization</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-bold text-lg mb-4 text-background">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-t border-background/10">
          <a href="mailto:info@siat.in" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
            <Mail className="w-4 h-4" /> info@siat.in
          </a>
          <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
            <Phone className="w-4 h-4" /> +91 98765 43210
          </a>
          <span className="flex items-center gap-2 text-sm text-background/60">
            <MapPin className="w-4 h-4" /> Saharsa, Bihar, India
          </span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-background/10 text-xs text-background/40">
          <p>© {new Date().getFullYear()} SIAT Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-background transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-background transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
