import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import buildingBg from "@/assets/building-bg.png";

interface StatCardProps {
  title: string;
  subtitle: string;
}

function AnimatedStatCard({ title, subtitle }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-[352px] xl:w-[352px] shrink-0 h-[220px] rounded-xl-24 overflow-hidden cursor-pointer bg-surface-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow:
          "0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 64.81px 46.85px 0px rgba(0, 0, 0, 0.02), 0px 38.52px 25.48px 0px rgba(0, 0, 0, 0.01), 0px 20px 13px 0px rgba(0, 0, 0, 0.01), 0px 8.15px 6.52px 0px rgba(0, 0, 0, 0.01)",
      }}
    >
      {/* Expanding Circle Background */}
      <motion.div
        className="absolute bg-surface-primary rounded-full origin-center pointer-events-none"
        initial={{
          width: 16,
          height: 16,
          top: 16,
          right: 16,
        }}
        animate={{
          width: isHovered ? 800 : 16,
          height: isHovered ? 800 : 16,
          top: isHovered ? -390 : 16,
          right: isHovered ? -390 : 16,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 px-48 flex flex-col gap-8 h-full justify-center">
        <motion.h2
          className="text-4xl font-medium leading-56 font-sans"
          animate={{ color: isHovered ? "var(--color-negative)" : "var(--color-primary)" }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xl font-normal leading-32 font-sans max-w-[254px]"
          animate={{ color: isHovered ? "var(--color-negative)" : "var(--color-secondary)" }}
          transition={{ duration: 0.3 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
}

function FindPropertyCard() {
  return (
    <div
      className="relative w-full max-w-[352px] xl:w-[352px] shrink-0 h-[220px] rounded-xl-24 overflow-hidden flex"
      style={{
        background:
          "linear-gradient(144deg, rgba(240, 73, 35, 1) 23%, rgba(138, 42, 20, 1) 100%)",
        boxShadow:
          "0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 64.81px 46.85px 0px rgba(0, 0, 0, 0.02), 0px 38.52px 25.48px 0px rgba(0, 0, 0, 0.01), 0px 20px 13px 0px rgba(0, 0, 0, 0.01), 0px 8.15px 6.52px 0px rgba(0, 0, 0, 0.01)",
      }}
    >
      {/* Background Image */}
      <img
        src={buildingBg}
        alt=""
        className="absolute right-0 bottom-0 w-auto h-[177px] object-cover opacity-80 mix-blend-overlay pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 p-40 flex flex-col justify-center gap-24">
        <h3 className="text-white text-2xl font-medium leading-32 font-sans">
          Find Property in
        </h3>

        <div className="flex flex-col gap-12">
          {["Noida", "Greater Noida", "Gurugram"].map((location) => (
            <a
              key={location}
              href={`#${location.toLowerCase().replace(" ", "-")}`}
              className="group flex items-center gap-8 text-white text-md font-medium hover:opacity-80 transition-opacity w-fit hover:underline "
            >
              {location}
              <ArrowRight className="w-16 h-16 group-hover:translate-x-1 transition-transform " />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatsCards() {
  return (
    <section className="w-full relative z-20 mt-[-110px] pb-80">
      <div className="max-w-[1440px] mx-auto px-24 sm:px-48 md:px-[153px]">
        <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-24 xl:gap-16">
          <AnimatedStatCard
            title="98+"
            subtitle="Happy clients, countless smiles delivered"
          />
          <AnimatedStatCard
            title="100Cr+"
            subtitle="Property value managed with excellence"
          />
          <FindPropertyCard />
        </div>
      </div>
    </section>
  );
}
