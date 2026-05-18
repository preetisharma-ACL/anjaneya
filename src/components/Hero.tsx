import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/Anjaneya-video-hero.mp4";

export function Hero() {
  return (
    <section className="relative w-full flex items-center overflow-hidden bg-black min-h-[600px] lg:h-[800px]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay (50% opacity black) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Bottom Gradient Overlay (Height: 458px) */}
      <div className="absolute bottom-0 left-0 w-full h-[458px] bg-linear-to-b from-transparent to-primary" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-24 sm:px-48 md:px-[153px] pt-32 pb-80">
        <div className="flex flex-col gap-32 max-w-[577px]">
          
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-16">
              
              {/* Pre-header */}
              <div className="flex items-center gap-8">
                <span className="text-negative text-xs font-medium leading-16 tracking-[0.13em] uppercase">
                  Delhi NCR's Premier Real Estate Consultancy
                </span>
                <div className="w-[101px] h-px bg-surface-white hidden sm:block" />
              </div>

              {/* Main Title */}
              <h1 className="font-headline text-negative text-4xl md:text-[64px] font-normal leading-[1.1] md:leading-72 tracking-tight">
                Where Ambition <br /> Meets Opportunity
              </h1>
            </div>

            {/* Subtitle */}
            <p className="font-instrument-sans text-negative md:text-[18px] font-medium leading-normal md:leading-[28px]">
              Empowering investors and homebuyers to make confident, strategic
              property decisions across the Delhi NCR region.
            </p>
          </div>

          {/* Call to Action */}
          <div className="group">
            <a href="/projects" className="inline-block">
            <Button
              variant="primary"
              size="xl"
              className="rounded-full text-md font-medium"
            >
              Explore Properties
              <ArrowUpRight className="w-16 h-16 ml-8 group-hover:rotate-45 transition-all duration-300" />
            </Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
