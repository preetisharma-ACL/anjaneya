import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

export function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      category: "Commercial",
      title: "CRC The Flagship",
      location: "Sector-140A, Noida",
      tagline: "Premium Retail Shops & Commercial Spaces",
    },
    {
      id: 2,
      category: "Residential",
      title: "Godrej Tropical Isle",
      location: "Sector-146, Noida",
      tagline: "Ultra-Luxury Apartments with Private Decks",
    },
    {
      id: 3,
      category: "Residential",
      title: "Ace Terra",
      location: "Yamuna Expressway, Noida",
      tagline: "Modern Lifestyle Apartments in Gated Community",
    },
  ];

  return (
    <section className="w-full py-48 lg:py-120 bg-[#FDFAF6] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120">
        <div className="flex flex-col gap-48 items-center">
          {/* Header Section */}
          <div className="flex flex-col gap-16 text-center max-w-[560px]">
            <span className="text-surface-primary text-sm font-medium uppercase tracking-[0.2em]">
              Featured Properties
            </span>
            <div className="flex flex-col gap-16">
              <h2 className="text-primary text-4xl font-light leading-56">
                Handpicked Opportunities
              </h2>
              <p className="text-tertiary text-md font-light leading-24">
                Carefully curated properties representing the pinnacle of value
                and lifestyle in Delhi NCR.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full justify-items-center"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex justify-center"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Call to Action */}
          {/* <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-12 px-32 py-16 bg-surface-white border border-border-default rounded-full-999 text-primary font-medium hover:bg-surface-primary hover:text-negative hover:border-surface-primary transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View All Properties
            <ArrowRight className="w-24 h-24 transition-transform group-hover:translate-x-1" />
          </motion.button> */}
          <a href="/projects">
          <Button
            variant="primary"
            size="xl"
            className="group rounded-full bg-surface-primary text-white flex items-center justify-center gap-16"
          >
            View All Properties
            <ArrowUpRight className="w-16 h-16 group-hover:rotate-45 transition-all duration-300" />
          </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
