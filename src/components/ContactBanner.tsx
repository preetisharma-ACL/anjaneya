import { ArrowUpRight } from "lucide-react";
import featuredHero from "@/assets/featured-hero.png";
import { Button } from "@/components/ui/button";

export function ContactBanner() {
  return (
    <section className="max-w-[1184px] mx-auto px-24 pb-80 lg:pb-120">
      <div className="relative overflow-hidden bg-[#16243E] rounded-2xl-32 min-h-[336px] flex items-center justify-center text-center p-24 sm:p-48">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={featuredHero}
            alt="City Skyline"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-[600px]">
          <div className="flex flex-col gap-8 mb-16">
            <span className="text-surface-primary text-sm tracking-[0.3em] uppercase leading-normal">
              Work With Us
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-[40px] font-normal text-negative leading-normal lg:leading-56">
              Ready to Meet Your Advisor?
            </h2>
          </div>

          <p className="text-negative/70 font-extralight max-w-[500px] mb-24">
            Book a free consultation and get matched with the right expert for
            your property goals.
          </p>
          <a href="/contact" className="inline-block">
          <Button
            variant="primary"
            size="xl"
            className="rounded-full flex items-center gap-12 group transition-all duration-300"
          >
            <span className="font-medium">Book a Free Consultation</span>
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
          </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
