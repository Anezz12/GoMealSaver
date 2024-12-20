import Asked from '@/components/about/Asked';
import Features from '@/components/about/Features';
import HeroSection from '@/components/about/HeroSection';
import Logowa from '@/components/about/LogoWa';
import OurTeam from '@/components/about/Team';
export default function AboutPage() {
  return (
    <>
      <div className="bg-gray-50">
        {/* Top padding for navbar clearance */}
        <div className="pt-20">
          {/* Hero section without bottom margin since it likely has its own */}
          <HeroSection />
        </div>

        {/* Container for consistent section spacing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Features section with vertical padding */}
          <div className="py-24">
            <Features />
          </div>

          {/* FAQ section with vertical padding */}
          <div className="py-2">
            <Asked />
          </div>

          {/* Team section with top padding and extra bottom padding */}
          <div className="py-24 pb-32">
            <OurTeam />
          </div>
        </div>
        <Logowa />
      </div>
    </>
  );
}
