import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import bungalowImg from "@/assets/bungalow.png";
import { Button } from "./ui/button";

interface ProjectCardProps {
  id: number | string;
  category: string;
  title: string;
  location: string;
  tagline: string;
  image?: string;
}

export function ProjectCard({ id, category, title, location, tagline, image }: ProjectCardProps) {
  return (
    <Link to={`/projects/${id}`} className="block h-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative w-full min-h-[410px] bg-surface-white rounded-xl-24 overflow-hidden transition-shadow duration-300 flex flex-col"
        style={{
          boxShadow:
            "0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 64.81px 46.85px 0px rgba(0, 0, 0, 0.02), 0px 38.52px 25.48px 0px rgba(0, 0, 0, 0.01), 0px 20px 13px 0px rgba(0, 0, 0, 0.01), 0px 8.15px 6.52px 0px rgba(0, 0, 0, 0.01)",
        }}
      >
        {/* Image Section */}
        <div className="relative w-full h-[220px] rounded-l-16 overflow-hidden bg-surface-light m-16 box-content max-w-[calc(100%-32px)]">
          <motion.img
            src={image || bungalowImg}
            alt={title}
            className="w-full h-full object-cover"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.1 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Figma Overlay (30% Black) */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-16 left-16 bg-surface-primary px-16 py-8 rounded-full-999">
            <span className="text-negative text-xs font-medium uppercase tracking-[0.2em]">
              {category}
            </span>
          </div>
        </div>

        {/* Content Section - Figma Positioning: y: 248 */}
        {/* Content Section */}
        <div className="px-24 pt-16 pb-26 flex flex-col gap-12 flex-1">
          <div className="flex flex-col gap-12">
            <h3 className="text-primary text-xl font-medium leading-tight break-words">
              {title}
            </h3>

            <div className="flex flex-col gap-[6px]">
              <p className="text-secondary text-md font-normal leading-normal break-words">
                {location}
              </p>

              <p className="text-tertiary text-sm font-normal leading-snug break-words">
                {tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Arrow Button - Bottom Right Position */}
        <div
          className="group absolute bottom-24 right-24 z-10 rounded-full flex items-center justify-center cursor-pointer"
        >
          <Button
            variant="primary"
            size="icon-lg"
            className="rounded-full bg-surface-primary text-white size-48 flex items-center justify-center"
          >
            <ArrowUpRight className="w-16 h-16 group-hover:rotate-45 transition-all duration-300" />
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
