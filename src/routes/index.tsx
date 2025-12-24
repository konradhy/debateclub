import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TechniquesShowcase,
  TestimonialsCarousel,
  PricingSection,
  CTABanner,
  Footer,
} from "@/components/marketing/landing-page";

/**
 * JSON-LD structured data for SEO.
 * Describes the organization, website, and software application.
 * Update URLs when production domain is available.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "#organization",
      name: "DebateClub",
      description:
        "AI-powered debate practice platform based on Mehdi Hasan's Win Every Argument",
      logo: {
        "@type": "ImageObject",
        url: "/images/logo.png",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "#website",
      name: "DebateClub",
      description:
        "Practice debate with AI opponents. Master 12 proven techniques from Mehdi Hasan's bestseller.",
      publisher: { "@id": "#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "#app",
      name: "DebateClub",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description:
        "Practice debate with AI opponents that push back. Master 12 proven techniques from Mehdi Hasan's bestseller. Get real-time feedback.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free to start",
      },
      featureList: [
        "AI debate opponents with configurable personalities",
        "Real-time technique detection and feedback",
        "12 debate techniques from Win Every Argument",
        "Voice-based practice sessions",
        "Post-debate analysis with Hasan Scores",
        "Personalized improvement recommendations",
      ],
      author: { "@id": "#organization" },
    },
    {
      "@type": "Book",
      "@id": "#book",
      name: "Win Every Argument",
      author: {
        "@type": "Person",
        name: "Mehdi Hasan",
      },
      description:
        "The Art of Debating, Persuading, and Public Speaking by Mehdi Hasan",
    },
    {
      "@type": "Course",
      "@id": "#course",
      name: "Win Every Argument Techniques",
      description:
        "Master the 12 debate techniques from Mehdi Hasan's bestselling book through AI-powered practice",
      provider: { "@id": "#organization" },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "Self-paced",
      },
      about: { "@id": "#book" },
      numberOfCredits: 12,
      educationalLevel: "Beginner to Advanced",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Practice Debate with AI That Fights Back | DebateClub" },
      {
        name: "description",
        content:
          "Spar with AI opponents. Get graded on 12 techniques from Mehdi Hasan's Win Every Argument. Real-time feedback, voice-based practice, free to start.",
      },
      {
        property: "og:title",
        content: "Practice Debate with AI That Fights Back | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Spar with AI opponents. Get graded on 12 techniques from Mehdi Hasan's Win Every Argument. Real-time feedback, voice-based practice, free to start.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: LandingPage,
});

/**
 * Main landing page component.
 * Composes all marketing sections into a cohesive page.
 */
function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TechniquesShowcase />
      <TestimonialsCarousel />
      <PricingSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
