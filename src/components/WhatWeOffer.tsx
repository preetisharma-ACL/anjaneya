import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import villaBg from "@/assets/villa.png";
import tickCircle from "@/assets/tick-circle.svg";
import residentialIcon from "@/assets/residential.svg";
import commercialIcon from "@/assets/commerical.svg";
import luxuryIcon from "@/assets/luxury.svg";
import commercialBg from "@/assets/commerical-bg.jpg";
import resBg from "@/assets/res.jpg"; // Using fallback if not available
import luxuryBg from "@/assets/bungalow.png"; // Using fallback
import { Button } from "./ui/button";

interface OfferCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

function OfferCard({ icon, title, description, features, image }: OfferCardProps) {
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
          className="text-[30px] font-sans font-normal leading-40"
        >
          {title}
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
              <img
                src={tickCircle}
                alt="check"
                className="w-16 h-16 shrink-0"
              />
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
            alt=""
            className="w-full h-full object-cover object-center"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.1 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Floating Button */}
        <div className="group absolute bottom-5 right-5">
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
  const cards = [
    {
      icon: residentialIcon,
      title: "Residential\nProperties",
      description:
        "From affordable homes to ultra-luxury apartments, discover residences that reflect your lifestyle and aspirations across Noida, Greater Noida & Gurgaon.",
      features: [
        "3 & 4 BHK Apartments",
        "Villas & Penthouses",
        "Gated Communities",
      ],
      image: resBg || commercialBg, // fallback logic inside component isn't perfect this way, but vite handles missing imports if resolved or we can just use commercialBg
    },
    {
      icon: commercialIcon,
      title: "Commercial\nProperties",
      description:
        "Premium office spaces, retail hubs, and business parks in the most sought-after commercial corridors of Delhi NCR.",
      features: ["Grade A Offices", "Retail Spaces", "IT Parks & SEZs"],
      image: commercialBg,
    },
    {
      icon: luxuryIcon,
      title: "Luxury &\nUltra Premium",
      description:
        "Exclusive properties for discerning buyers who demand the finest curated luxury real estate with unmatched amenities.",
      features: [
        "Sky Villas & Penthouses",
        "Farmhouses & Estates",
        "Branded Residences",
      ],
      image: luxuryBg || commercialBg,
    },
  ];

  return (
    <section className="relative w-full py-48 lg:py-120 bg-surface-light overflow-hidden">
      {/* Left Side Background Image */}
      <div
        className="absolute top-0 left-0 w-full lg:w-[50%] h-[200px] lg:h-[400px] pointer-events-none object-cover"
      >
        <img
          src={villaBg}
          alt=""
          className="w-full h-full object-cover object-left"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-24 sm:px-48 md:px-[153px]">
        <div className="flex flex-col items-end">
          {/* Right side content wrapper */}
          <div className="w-full xl:w-[95%] flex flex-col gap-80">
            {/* Header Section */}
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
                    From residential havens to commercial powerhouses, we guide
                    you through every aspect of Delhi NCR's dynamic property
                    market.
                  </p>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-24 xl:gap-24 w-full justify-center lg:justify-end xl:pl-80">
              {cards.map((card, i) => (
                <OfferCard key={i} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
