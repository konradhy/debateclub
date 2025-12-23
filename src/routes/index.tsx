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

export const Route = createFileRoute("/")({
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
