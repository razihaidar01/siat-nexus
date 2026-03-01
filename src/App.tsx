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
import ACRepairingPage from "./pages/ACRepairingPage";
import LaptopRepairingPage from "./pages/LaptopRepairingPage";
import CCTVInstallationPage from "./pages/CCTVInstallationPage";
import WebDevelopmentPage from "./pages/WebDevelopmentPage";
import AppDevelopmentPage from "./pages/AppDevelopmentPage";
import AIDevelopmentPage from "./pages/AIDevelopmentPage";
import MBBSAdmissionPage from "./pages/MBBSAdmissionPage";
import ISOCertificationPage from "./pages/ISOCertificationPage";
import GovSkillTrainingPage from "./pages/GovSkillTrainingPage";
import VerifyCertificatePage from "./pages/VerifyCertificatePage";
import TrainingHubPage from "./pages/TrainingHubPage";
import RHSoftwareHubPage from "./pages/RHSoftwareHubPage";
import ConsultancyHubPage from "./pages/ConsultancyHubPage";
import GovernmentHubPage from "./pages/GovernmentHubPage";
import SoftwareDevelopmentPage from "./pages/SoftwareDevelopmentPage";
import BTechAdmissionPage from "./pages/BTechAdmissionPage";
import PMKVYPage from "./pages/PMKVYPage";
import CourseFeesPage from "./pages/CourseFeesPage";
import PlacementSupportPage from "./pages/PlacementSupportPage";
import BestCollegePage from "./pages/BestCollegePage";
import MSMERegistrationPage from "./pages/MSMERegistrationPage";
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
            <Route path="/training-institute" element={<TrainingHubPage />} />
            <Route path="/training-institute/mobile-repairing-course-bihar" element={<MobileRepairingPage />} />
            <Route path="/training-institute/ac-repairing-course-bihar" element={<ACRepairingPage />} />
            <Route path="/training-institute/laptop-repairing-course-bihar" element={<LaptopRepairingPage />} />
            <Route path="/training-institute/cctv-installation-training-bihar" element={<CCTVInstallationPage />} />
            <Route path="/training-institute/short-term-job-courses-bihar" element={<GenericPage title="Short Term Job Courses in Bihar" description="Kam samay mein job-ready banein — SIAT ke short-term skill courses se." />} />
            <Route path="/training-institute/technical-training-institute-saharsa" element={<GenericPage title="Technical Training Institute in Saharsa" description="Saharsa ka sabse achha technical training institute — SIAT mein seekhein, aage badhein." />} />
            <Route path="/training-institute/course-fees" element={<CourseFeesPage />} />
            <Route path="/training-institute/placement-support" element={<PlacementSupportPage />} />
            <Route path="/training-institute/student-testimonials" element={<GenericPage title="Student Testimonials" description="Hamare students kya kehte hain — unke success stories padhein." />} />
            <Route path="/training-institute/gallery" element={<GenericPage title="Gallery" description="SIAT ki labs, classrooms aur events ki photos dekhein." />} />
            
            {/* RH Software */}
            <Route path="/rh-software" element={<RHSoftwareHubPage />} />
            <Route path="/rh-software/website-development-company-bihar" element={<WebDevelopmentPage />} />
            <Route path="/rh-software/app-development-company-bihar" element={<AppDevelopmentPage />} />
            <Route path="/rh-software/software-development-company-bihar" element={<SoftwareDevelopmentPage />} />
            <Route path="/rh-software/ai-development-company-bihar" element={<AIDevelopmentPage />} />
            <Route path="/rh-software/erp-crm-development" element={<GenericPage title="ERP & CRM Development" description="Business ko smart banayein — custom ERP aur CRM solutions." />} />
            <Route path="/rh-software/portfolio" element={<GenericPage title="Our Portfolio" description="Hamare successful projects dekhein — websites, apps aur software solutions." />} />
            <Route path="/rh-software/case-studies" element={<GenericPage title="Case Studies" description="Real projects, real results — jaanein kaise humne businesses ko transform kiya." />} />
            <Route path="/rh-software/pricing" element={<GenericPage title="Pricing" description="Transparent pricing — apne budget mein best IT solutions paayein." />} />
            
            {/* Consultancy */}
            <Route path="/consultancy-services" element={<ConsultancyHubPage />} />
            <Route path="/consultancy-services/best-college-in-bihar" element={<BestCollegePage />} />
            <Route path="/consultancy-services/mbbs-admission-bihar" element={<MBBSAdmissionPage />} />
            <Route path="/consultancy-services/btech-admission-bihar" element={<BTechAdmissionPage />} />
            <Route path="/consultancy-services/bca-college-bihar" element={<GenericPage title="BCA College in Bihar" description="Best BCA colleges ki jaankari aur admission support." />} />
            <Route path="/consultancy-services/nursing-college-bihar" element={<GenericPage title="Nursing College in Bihar" description="Bihar ke top nursing colleges mein admission guidance." />} />
            <Route path="/consultancy-services/admission-after-12th-bihar" element={<GenericPage title="Admission After 12th in Bihar" description="12th ke baad kya karein? Best career options aur admission guidance." />} />
            <Route path="/consultancy-services/bihar-student-credit-card-admission" element={<GenericPage title="Bihar Student Credit Card Admission" description="Student Credit Card scheme se padhai karein — poori process jaanein." />} />
            <Route path="/consultancy-services/iso-certification-bihar" element={<ISOCertificationPage />} />
            <Route path="/consultancy-services/msme-registration" element={<MSMERegistrationPage />} />
            
            {/* Government Projects */}
            <Route path="/government-projects" element={<GovernmentHubPage />} />
            <Route path="/government-projects/government-skill-training-bihar" element={<GovSkillTrainingPage />} />
            <Route path="/government-projects/pmkvy-training-center-bihar" element={<PMKVYPage />} />
            <Route path="/government-projects/msme-education-tender" element={<GenericPage title="MSME Education Tender" description="MSME education tender participation — capability, compliance aur documentation." />} />
            <Route path="/government-projects/skill-india-training-partner" element={<GenericPage title="Skill India Training Partner" description="SIAT — Skill India mission ka registered training partner." />} />
            <Route path="/government-projects/csr-education-projects" element={<GenericPage title="CSR Education Projects" description="CSR ke through education projects — partnership opportunities." />} />
            <Route path="/government-projects/capability-statement" element={<GenericPage title="Capability Statement" description="SIAT ki capabilities — infrastructure, experience aur certifications." />} />
            <Route path="/government-projects/empanelment" element={<GenericPage title="Empanelment" description="Government empanelment details aur process." />} />
            
            {/* Other pages */}
            <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
            <Route path="/gallery" element={<GenericPage title="Gallery" description="SIAT ki photos — labs, events, training sessions aur infrastructure." />} />
            <Route path="/chairman-message" element={<GenericPage title="Chairman's Message" description="SIAT ke Chairman ka sandesh — vision aur mission." />} />
            <Route path="/our-team" element={<GenericPage title="Our Team" description="SIAT ki experienced team se milein." />} />
            <Route path="/infrastructure" element={<GenericPage title="Infrastructure" description="SIAT ki modern infrastructure dekhein — labs, classrooms aur facilities." />} />
            <Route path="/certifications" element={<GenericPage title="Certifications" description="SIAT ke certifications aur accreditations." />} />
            <Route path="/downloads/brochure" element={<GenericPage title="Download Brochure" description="SIAT ka brochure download karein." />} />
            <Route path="/downloads/admission-form" element={<GenericPage title="Admission Form" description="Admission form download karein aur apply karein." />} />
            <Route path="/faqs" element={<GenericPage title="FAQs" description="Aksar poochhe jaane wale sawaal — sabhi jawab yahan milenge." />} />
            <Route path="/privacy-policy" element={<GenericPage title="Privacy Policy" description="SIAT ki privacy policy padhein." />} />
            <Route path="/terms-conditions" element={<GenericPage title="Terms & Conditions" description="SIAT ki terms aur conditions." />} />
            <Route path="/disclaimer" element={<GenericPage title="Disclaimer" description="SIAT ka disclaimer." />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
