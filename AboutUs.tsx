import { SubPageHero } from "@/components/SubPageHero";
import aboutHero from "@/assets/about-us-hero.png";
import WhoWeAre from "@/components/WhoWeAre";
import { StatsGrid } from "@/components/StatsGrid";
import { MissionVision } from "@/components/MissionVision";

export function AboutUs() {
  return (
    <main>
      <SubPageHero
        subtitle="OUR STORY"
        title="About Anjaneya Global Realty"
        description="Born in the heart of Delhi NCR, built on trust. We're a team of passionate real estate advisors who believe every property decision deserves expert guidance, honest counsel, and a partner who's with you for the long run."
        bgImage={aboutHero}
        webpImage={aboutHero}
        className="pt-48"
        ctaText="Meet the Team"
        ctaHref="/team"
      />
      {/* Additional sections for About Us can be added here */}
      <WhoWeAre />
      <StatsGrid />
      <MissionVision />
    </main>
  );
}
