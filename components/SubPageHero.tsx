import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SubPageHeroProps {
  subtitle: string;
  title: string;
  description: string;
  bgImage: string;
  webpImage?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function SubPageHero({
  subtitle,
  title,
  description,
  bgImage,
  webpImage,
  ctaText,
  ctaHref,
  className = "",
}: SubPageHeroProps) {
  return (
    <section
      className={`relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden ${className}`}
    >
      {/* Background Image Optimization */}
      <div className="absolute inset-0 z-0">
        <picture>
          {webpImage && <source srcSet={webpImage} type="image/webp" />}
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-[#1A2231]/40" />
      </div>

      <div className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120 relative z-10 w-full pt-80 pb-64 lg:py-0">
        <div className="max-w-[600px] flex flex-col">
          {/* Subtitle with line */}
          <div className="flex items-center gap-12 sm:gap-16 mb-16">
            <span className="text-negative text-xs font-medium uppercase tracking-[0.2em]">
              {subtitle}
            </span>
            <div className="h-px w-32 sm:w-48 bg-negative/40" />
          </div>

          {/* Title */}
          <h1 className="font-headline text-negative text-3xl sm:text-5xl lg:text-[64px] font-normal leading-[1.1] tracking-tight mb-24">
            {title}
          </h1>

          {/* Description */}
          <p className="text-negative text-sm sm:text-md lg:text-lg font-extralight leading-[28px] max-w-[540px] mb-32">
            {description}
          </p>

          {/* CTA Button */}
          {ctaText && ctaHref && (
            <div className="group">
              <Button
                asChild
                variant="primary"
                size="xl"
                className="rounded-full gap-16 group w-fit"
              >
                <Link to={ctaHref}>
                  <span className="text-sm sm:text-md font-medium">
                    {ctaText}
                  </span>
                  <ArrowUpRight className="w-16 h-16 group-hover:rotate-45 transition-all duration-300" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
