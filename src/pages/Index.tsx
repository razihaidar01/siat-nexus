import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import MarqueeSection from "@/components/home/MarqueeSection";
import DivisionsSection from "@/components/home/DivisionsSection";
import CoursesSection from "@/components/home/CoursesSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ISOSection from "@/components/home/ISOSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <>
      <SEOHead
        title="SIAT – Bihar's Leading Training, IT & Consultancy Organization | Saharsa"
        description="SIAT is Bihar's top training institute, IT company & consultancy. Mobile repairing, AC repair courses, website development, MBBS admission, ISO certification in Saharsa, Bihar."
        canonical="https://www.siat.in"
      />
      <HeroSection />
      <MarqueeSection />
      <DivisionsSection />
      <CoursesSection />
      <WhyChooseSection />
      <ISOSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};

export default Index;
