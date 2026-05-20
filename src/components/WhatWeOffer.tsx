import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import villaBg from "@/assets/villa.png";
import tickCircle from "@/assets/tick-circle.svg";
import residentialIcon from "@/assets/residential.svg";
import commercialIcon from "@/assets/commerical.svg";
import luxuryIcon from "@/assets/luxury.svg";
import commercialBg from "@/assets/commerical-bg.jpg";
import resBg from "@/assets/res.jpg";
import luxuryBg from "@/assets/bungalow.png";
import { Button } from "./ui/button";
import { getCategories } from "@/api/services/homeService";
// Static fallback config keyed by slug
const STATIC_CARD_CONFIG: Record<string, {
  icon: string;
  image: string;
  description: string;
  features: string[];
}> = {
  residential: {
    icon: residentialIcon,
    image: resBg,
    description:
      "From affordable homes to ultra-luxury apartments, discover residences that reflect your lifestyle and aspirations across Noida, Greater Noida & Gurgaon.",
    features: ["3 & 4 BHK Apartments", "Villas & Penthouses", "Gated Communities"],
  },
  commercial: {
    icon: commercialIcon,
    image: commercialBg,
    description:
      "Premium office spaces, retail hubs, and business parks in the most sought-after commercial corridors of Delhi NCR.",
    features: ["Grade A Offices", "Retail Spaces", "IT Parks & SEZs"],
  },
  "luxury-apartments": {
    icon: luxuryIcon,
    image: luxuryBg,
    description:
      "Exclusive properties for discerning buyers who demand the finest curated luxury real estate with unmatched amenities.",
    features: ["Sky Villas & Penthouses", "Farmhouses & Estates", "Branded Residences"],
  },
};

interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  features?: string[];
  display_order: number;
}

interface MergedCard {
  slug: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  features: string[];
}

interface OfferCardProps extends MergedCard {
  onArrowClick: (slug: string) => void;
}

function OfferCard({ slug, name, icon, image, description, features, onArrowClick }: OfferCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="w-full max-w-[352px] xl:w-[352px] shrink-0 bg-surface-white rounded-xl-24 p-24 flex flex-col gap-24 relative"
      style={{
        boxShadow:
          "0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 64.81px 46.85px 0px rgba(0, 0, 0, 0.02), 0px 38.52px 25.48px 0px rgba(0, 0, 0, 0.01), 0px 20px 13px 0px rgba(0, 0, 0, 0.01), 0px 8.15px 6.52px 0px rgba(0, 0, 0, 0.01)",
      }}
    >
      {/* Top: Icon + Title */}
      <div className="flex items-center gap-[30px] px-8 pt-8">
        <img src={icon} alt="" className="w-[53px] h-64 object-contain" />
        <motion.h3
          variants={{ rest: { color: "#111111" }, hover: { color: "#F04923" } }}
          transition={{ duration: 0.3 }}
          className="text-[30px] font-sans font-normal leading-40 whitespace-pre-line"
        >
          {name}
        </motion.h3>
      </div>

      <div className="w-full h-px bg-border-default" />

      {/* Middle: Text + Features */}
      <div className="flex flex-col gap-16 px-8">
        <p className="text-md text-secondary font-sans font-light leading-24 min-h-72">
          {description}
        </p>

        <div className="flex flex-col gap-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-8">
              <img src={tickCircle} alt="check" className="w-16 h-16 shrink-0" />
              <span className="text-sm font-sans font-light leading-[21px] text-tertiary">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Image + Button */}
      <div className="relative mt-auto pt-8">
        <div className="w-full h-[176px] rounded-l-16 overflow-hidden relative bg-surface-disabled">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.1 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Floating Arrow Button */}
        <div
          className="group absolute bottom-5 right-5 cursor-pointer"
          onClick={() => onArrowClick(slug)}
        >
          <Button
            variant="primary"
            size="icon-lg"
            className="rounded-full bg-surface-primary text-white size-48 flex items-center justify-center"
          >
            <ArrowUpRight className="w-16 h-16 group-hover:rotate-45 transition-all duration-300" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function WhatWeOffer() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<MergedCard[]>([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        const sorted: ApiCategory[] = [...data.results].sort(
          (a, b) => a.display_order - b.display_order
        );

        const merged: MergedCard[] = sorted.map((cat) => {
          const fallback = STATIC_CARD_CONFIG[cat.slug] ?? {
            icon: residentialIcon,
            image: commercialBg,
            description: "",
            features: [],
          };

          return {
            slug: cat.slug,
            name: cat.name,
            icon: fallback.icon,
            image: fallback.image,
            // Use API description if non-empty, else fallback
            description: cat.description?.trim() ? cat.description : fallback.description,
            // Use API features if non-empty array, else fallback
            features:
              cat.features && cat.features.length > 0
                ? cat.features
                : fallback.features,
          };
        });

        setCards(merged);
      })
      .catch(console.error);
  }, []);

  const handleArrowClick = (slug: string) => {
    navigate(`/projects?category=${slug}`);
  };

  return (
    <section className="relative w-full py-48 lg:py-120 bg-surface-light overflow-hidden">
      <div className="absolute top-0 left-0 w-full lg:w-[50%] h-[200px] lg:h-[400px] pointer-events-none">
        <img src={villaBg} alt="" className="w-full h-full object-cover object-left" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-24 sm:px-48 md:px-[153px]">
        <div className="flex flex-col items-end">
          <div className="w-full xl:w-[95%] flex flex-col gap-80">
            {/* Header */}
            <div className="flex flex-col gap-12 xl:pl-80 lg:ml-auto">
              <div className="flex flex-col gap-16 max-w-[560px]">
                <span className="text-surface-primary text-sm font-sans font-medium uppercase tracking-[0.2em]">
                  What We Offer
                </span>
                <div className="flex flex-col gap-16">
                  <h2 className="text-primary text-4xl lg:text-[40px] font-sans font-bold leading-tight lg:leading-56 max-w-[532px]">
                    Comprehensive Real Estate Solutions
                  </h2>
                  <p className="text-tertiary text-sm lg:text-md font-sans font-light leading-24">
                    From residential havens to commercial powerhouses, we guide you through every
                    aspect of Delhi NCR's dynamic property market.
                  </p>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-24 w-full justify-center lg:justify-end xl:pl-80">
              {cards.map((card) => (
                <OfferCard
                  key={card.slug}
                  {...card}
                  onArrowClick={handleArrowClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}