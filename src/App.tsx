import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MobileRepairingPage from "./pages/MobileRepairingPage";
import GenericPage from "./pages/GenericPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            
            {/* Training Institute */}
            <Route path="/training-institute" element={<GenericPage title="Training Institute" description="Bihar ka sabse bharosemand technical training institute — practical learning aur placement support ke saath." />} />
            <Route path="/training-institute/mobile-repairing-course-bihar" element={<MobileRepairingPage />} />
            <Route path="/training-institute/ac-repairing-course-bihar" element={<GenericPage title="AC Repairing Course in Bihar" description="Split & Window AC installation, servicing aur gas charging seekhein — hands-on training ke saath." />} />
            <Route path="/training-institute/laptop-repairing-course-bihar" element={<GenericPage title="Laptop Repairing Course in Bihar" description="Hardware se software tak — laptop repair ka complete course SIAT se seekhein." />} />
            <Route path="/training-institute/cctv-installation-training-bihar" element={<GenericPage title="CCTV Installation Training in Bihar" description="CCTV setup, DVR/NVR configuration aur networking — professional training SIAT mein." />} />
            <Route path="/training-institute/short-term-job-courses-bihar" element={<GenericPage title="Short Term Job Courses in Bihar" description="Kam samay mein job-ready banein — SIAT ke short-term skill courses se." />} />
            <Route path="/training-institute/technical-training-institute-saharsa" element={<GenericPage title="Technical Training Institute in Saharsa" description="Saharsa ka sabse achha technical training institute — SIAT mein seekhein, aage badhein." />} />
            <Route path="/training-institute/course-fees" element={<GenericPage title="Course Fees" description="SIAT ke sabhi courses ki fees jaanein — affordable aur value-for-money training." />} />
            <Route path="/training-institute/placement-support" element={<GenericPage title="Placement Support" description="Dedicated placement cell — course ke baad job dhundhne mein poori madad." />} />
            <Route path="/training-institute/student-testimonials" element={<GenericPage title="Student Testimonials" description="Hamare students kya kehte hain — unke success stories padhein." />} />
            <Route path="/training-institute/gallery" element={<GenericPage title="Gallery" description="SIAT ki labs, classrooms aur events ki photos dekhein." />} />
            
            {/* RH Software */}
            <Route path="/rh-software" element={<GenericPage title="RH Software – IT Solutions" description="Bihar ki leading IT company — website, app, software aur AI development services." />} />
            <Route path="/rh-software/website-development-company-bihar" element={<GenericPage title="Website Development Company in Bihar" description="Professional website banwayein Bihar ki top web development company se — responsive, fast aur SEO-friendly." />} />
            <Route path="/rh-software/app-development-company-bihar" element={<GenericPage title="App Development Company in Bihar" description="Android & iOS apps banwayein — startup se enterprise tak, RH Software ke saath." />} />
            <Route path="/rh-software/software-development-company-bihar" element={<GenericPage title="Software Development Company in Bihar" description="Custom software solutions — ERP, CRM aur business automation Bihar mein." />} />
            <Route path="/rh-software/ai-development-company-bihar" element={<GenericPage title="AI Development Company in Bihar" description="AI-powered solutions — chatbots, automation aur intelligent tools banwayein." />} />
            <Route path="/rh-software/erp-crm-development" element={<GenericPage title="ERP & CRM Development" description="Business ko smart banayein — custom ERP aur CRM solutions." />} />
            <Route path="/rh-software/portfolio" element={<GenericPage title="Our Portfolio" description="Hamare successful projects dekhein — websites, apps aur software solutions." />} />
            <Route path="/rh-software/case-studies" element={<GenericPage title="Case Studies" description="Real projects, real results — jaanein kaise humne businesses ko transform kiya." />} />
            <Route path="/rh-software/pricing" element={<GenericPage title="Pricing" description="Transparent pricing — apne budget mein best IT solutions paayein." />} />
            
            {/* Consultancy */}
            <Route path="/consultancy-services" element={<GenericPage title="Consultancy Services" description="Education, ISO certification aur career guidance — SIAT Consultancy ke saath." />} />
            <Route path="/consultancy-services/best-college-in-bihar" element={<GenericPage title="Best College in Bihar" description="Bihar ke top colleges ki jaankari — admission guidance SIAT se paayein." />} />
            <Route path="/consultancy-services/mbbs-admission-bihar" element={<GenericPage title="MBBS Admission in Bihar" description="NEET ke baad MBBS admission — complete counseling aur documentation support." />} />
            <Route path="/consultancy-services/btech-admission-bihar" element={<GenericPage title="B.Tech Admission in Bihar" description="Engineering mein admission chahiye? SIAT se paayein best college guidance." />} />
            <Route path="/consultancy-services/bca-college-bihar" element={<GenericPage title="BCA College in Bihar" description="Best BCA colleges ki jaankari aur admission support." />} />
            <Route path="/consultancy-services/nursing-college-bihar" element={<GenericPage title="Nursing College in Bihar" description="Bihar ke top nursing colleges mein admission guidance." />} />
            <Route path="/consultancy-services/admission-after-12th-bihar" element={<GenericPage title="Admission After 12th in Bihar" description="12th ke baad kya karein? Best career options aur admission guidance." />} />
            <Route path="/consultancy-services/bihar-student-credit-card-admission" element={<GenericPage title="Bihar Student Credit Card Admission" description="Student Credit Card scheme se padhai karein — poori process jaanein." />} />
            <Route path="/consultancy-services/iso-certification-bihar" element={<GenericPage title="ISO Certification in Bihar" description="ISO 9001:2015 certification paayein — process, documents aur benefits jaanein." />} />
            <Route path="/consultancy-services/msme-registration" element={<GenericPage title="MSME Registration" description="MSME registration karwayein — benefits aur process ki poori jaankari." />} />
            
            {/* Government Projects */}
            <Route path="/government-projects" element={<GenericPage title="Government Projects" description="SIAT Group — Bihar sarkar ka bharosemand skill training aur project implementation partner." />} />
            <Route path="/government-projects/government-skill-training-bihar" element={<GenericPage title="Government Skill Training in Bihar" description="Sarkari skill training programs — PMKVY, Skill India aur MSME projects." />} />
            <Route path="/government-projects/pmkvy-training-center-bihar" element={<GenericPage title="PMKVY Training Center in Bihar" description="Pradhan Mantri Kaushal Vikas Yojana training center — SIAT mein seekhein." />} />
            <Route path="/government-projects/msme-education-tender" element={<GenericPage title="MSME Education Tender" description="MSME education tender participation — capability, compliance aur documentation." />} />
            <Route path="/government-projects/skill-india-training-partner" element={<GenericPage title="Skill India Training Partner" description="SIAT — Skill India mission ka registered training partner." />} />
            <Route path="/government-projects/csr-education-projects" element={<GenericPage title="CSR Education Projects" description="CSR ke through education projects — partnership opportunities." />} />
            <Route path="/government-projects/capability-statement" element={<GenericPage title="Capability Statement" description="SIAT Group ki capabilities — infrastructure, experience aur certifications." />} />
            <Route path="/government-projects/empanelment" element={<GenericPage title="Empanelment" description="Government empanelment details aur process." />} />
            
            {/* Other pages */}
            <Route path="/verify-certificate" element={<GenericPage title="Verify Certificate" description="Apna certificate verify karein — QR code scan karein ya certificate number enter karein." />} />
            <Route path="/blog" element={<GenericPage title="Blog" description="Career guidance, skill development, technology updates aur government schemes ki latest jaankari." />} />
            <Route path="/gallery" element={<GenericPage title="Gallery" description="SIAT ki photos — labs, events, training sessions aur infrastructure." />} />
            <Route path="/chairman-message" element={<GenericPage title="Chairman's Message" description="SIAT Group ke Chairman ka sandesh — vision aur mission." />} />
            <Route path="/our-team" element={<GenericPage title="Our Team" description="SIAT Group ki experienced team se milein." />} />
            <Route path="/infrastructure" element={<GenericPage title="Infrastructure" description="SIAT ki modern infrastructure dekhein — labs, classrooms aur facilities." />} />
            <Route path="/certifications" element={<GenericPage title="Certifications" description="SIAT Group ke certifications aur accreditations." />} />
            <Route path="/downloads/brochure" element={<GenericPage title="Download Brochure" description="SIAT Group ka brochure download karein." />} />
            <Route path="/downloads/admission-form" element={<GenericPage title="Admission Form" description="Admission form download karein aur apply karein." />} />
            <Route path="/faqs" element={<GenericPage title="FAQs" description="Aksar poochhe jaane wale sawaal — sabhi jawab yahan milenge." />} />
            <Route path="/privacy-policy" element={<GenericPage title="Privacy Policy" description="SIAT Group ki privacy policy padhein." />} />
            <Route path="/terms-conditions" element={<GenericPage title="Terms & Conditions" description="SIAT Group ki terms aur conditions." />} />
            <Route path="/disclaimer" element={<GenericPage title="Disclaimer" description="SIAT Group ka disclaimer." />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
