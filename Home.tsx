import { Hero } from "@/components/Hero";
import { StatsCards } from "@/components/StatsCards";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Testimonials } from "@/components/Testimonials";

export function Home() {
  return (
    <>
      <Hero />
      <StatsCards />
      <WhatWeOffer />
      <WhyChooseUs />
      <FeaturedProjects />
      <Testimonials />
    </>
  );
}
