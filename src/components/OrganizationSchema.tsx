const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SIAT",
  alternateName: "SIAT Group",
  url: "https://www.siat.in",
  logo: "https://www.siat.in/siat-logo.png",
  description: "Bihar's Leading Training Institute, IT Company & Consultancy Organization. Mobile repairing, AC repair courses, website development, MBBS admission, ISO certification in Saharsa, Bihar.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road",
    addressLocality: "Saharsa",
    addressRegion: "Bihar",
    postalCode: "852201",
    addressCountry: "IN",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-7004216219", contactType: "customer service", areaServed: "IN", availableLanguage: ["Hindi", "English"] },
    { "@type": "ContactPoint", telephone: "+91-9342470019", contactType: "customer service", areaServed: "IN", availableLanguage: ["Hindi", "English"] },
  ],
  sameAs: [],
  founder: { "@type": "Person", name: "Md Parwez Alam" },
  areaServed: { "@type": "State", name: "Bihar" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "SIAT Training Institute",
  url: "https://www.siat.in",
  telephone: "+91-7004216219",
  email: "siat.sws@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road",
    addressLocality: "Saharsa",
    addressRegion: "Bihar",
    postalCode: "852201",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: "25.88", longitude: "86.56" },
  priceRange: "₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
};

const OrganizationSchema = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
  </>
);

export default OrganizationSchema;
