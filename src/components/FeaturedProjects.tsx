import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { getFeaturedprojects } from "@/api/services/homeService";

interface FeaturedProject {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  category: { id: number; name: string; slug: string };
  city: { id: number; name: string; slug: string };
  locality: string;
  status: string;
  property_type: string;
  price_display: string;
  size_display: string;
  cover_image: string;
  cover_thumbnail: string;
  image_count: number;
  is_featured: boolean;
  published_at: string;
}

export function FeaturedProjects() {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedprojects()
      .then((data: FeaturedProject[]) => setProjects(data))
      .catch((err) => console.error("Failed to fetch featured projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-48 lg:py-120 bg-[#FDFAF6] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120">
        <div className="flex flex-col gap-48 items-center">

          {/* Header */}
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

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full rounded-2xl bg-white animate-pulse overflow-hidden"
                >
                  <div className="h-[240px] bg-primary/5" />
                  <div className="p-24 flex flex-col gap-12">
                    <div className="h-3 w-1/4 rounded bg-primary/10" />
                    <div className="h-4 w-3/4 rounded bg-primary/10" />
                    <div className="h-3 w-1/2 rounded bg-primary/10" />
                    <div className="h-3 w-full rounded bg-primary/5" />
                    <div className="h-3 w-5/6 rounded bg-primary/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          {!loading && projects.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full justify-items-center"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full flex justify-center"
                >
                  <ProjectCard
                    slug={project.slug}
                    category={project.category.name}
                    title={project.title}
                    location={project.locality}
                    tagline={project.tagline}
                    image={project.cover_thumbnail || project.cover_image}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTA */}
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