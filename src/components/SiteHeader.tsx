import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import siatLogo from "@/assets/siat-logo.png";

const navItems = [
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  {
    label: "Training",
    href: "/training-institute",
    children: [
      { label: "Mobile Repairing", href: "/training-institute/mobile-repairing-course-bihar" },
      { label: "AC Repairing", href: "/training-institute/ac-repairing-course-bihar" },
      { label: "Laptop Repairing", href: "/training-institute/laptop-repairing-course-bihar" },
      { label: "CCTV Installation", href: "/training-institute/cctv-installation-training-bihar" },
      { label: "Course Fees", href: "/training-institute/course-fees" },
      { label: "Placement Support", href: "/training-institute/placement-support" },
    ],
  },
  {
    label: "RH Software",
    href: "/rh-software",
    children: [
      { label: "Website Development", href: "/rh-software/website-development-company-bihar" },
      { label: "App Development", href: "/rh-software/app-development-company-bihar" },
      { label: "Software Development", href: "/rh-software/software-development-company-bihar" },
      { label: "AI Development", href: "/rh-software/ai-development-company-bihar" },
      { label: "Portfolio", href: "/rh-software/portfolio" },
    ],
  },
  {
    label: "Consultancy",
    href: "/consultancy-services",
    children: [
      { label: "Best Colleges", href: "/consultancy-services/best-college-in-bihar" },
      { label: "MBBS Admission", href: "/consultancy-services/mbbs-admission-bihar" },
      { label: "B.Tech Admission", href: "/consultancy-services/btech-admission-bihar" },
      { label: "ISO Certification", href: "/consultancy-services/iso-certification-bihar" },
      { label: "MSME Registration", href: "/consultancy-services/msme-registration" },
    ],
  },
  {
    label: "Government",
    href: "/government-projects",
    children: [
      { label: "Skill Training", href: "/government-projects/government-skill-training-bihar" },
      { label: "PMKVY Center", href: "/government-projects/pmkvy-training-center-bihar" },
      { label: "MSME Tender", href: "/government-projects/msme-education-tender" },
      { label: "Capability Statement", href: "/government-projects/capability-statement" },
    ],
  },
  { label: "Verify Certificate", href: "/verify-certificate" },
];

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileDropdown(null);
  }, [location]);

  return (
    <header className={`sticky-header ${isScrolled ? "sticky-header-scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={siatLogo} alt="SIAT Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
          <div>
            <span className="font-display font-bold text-xl text-foreground">SIAT</span>
            <span className="hidden md:block text-[10px] text-muted-foreground leading-none -mt-0.5">Training · IT · Consultancy</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 rounded-lg hover:bg-secondary"
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </Link>
              {item.children && openDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 pt-2 z-50"
                >
                  <div className="glass-card p-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link to="/contact-us" className="hidden md:block btn-primary-glow !py-2.5 !px-5 !text-sm">
            Apply Now
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-foreground font-medium rounded-lg hover:bg-secondary"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === item.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-3 text-foreground font-medium rounded-lg hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children && mobileDropdown === item.label && (
                    <div className="pl-6 space-y-1 pb-2">
                      <Link
                        to={item.href}
                        className="block px-4 py-2 text-sm text-primary font-medium hover:text-primary"
                      >
                        View All →
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact-us" className="block btn-primary-glow text-center mt-4 !py-3">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
