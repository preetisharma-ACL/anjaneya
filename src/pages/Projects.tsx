import { useState, useMemo, useEffect } from "react";
import { SubPageHero } from "@/components/SubPageHero";
import projectsHero from "@/assets/featured-hero.png";
import { ProjectCard } from "@/components/ProjectCard";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { getProjects } from "@/api/services/projectService";
// Shape of each project returned by the API
interface ApiProject {
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

interface ApiResponse {
  count: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: ApiProject[];
}

const ALL_PROJECTS_TAB = "All Projects";

export function Projects() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(ALL_PROJECTS_TAB);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch projects from API on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data: ApiResponse = await getProjects();
        setProjects(data.results);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Derive unique city names from API data for tab bar
  const cities = useMemo(() => {
    const uniqueCities = Array.from(
      new Set(projects.map((p) => p.city.name))
    );
    return [ALL_PROJECTS_TAB, ...uniqueCities];
  }, [projects]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.locality.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab =
        activeTab === ALL_PROJECTS_TAB || project.city.name === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [projects, searchQuery, activeTab]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage]);

  return (
    <main className="bg-surface-white min-h-screen">
      <SubPageHero
        subtitle="PREMIUM PORTFOLIO"
        title="Our Featured Projects"
        className="lg:min-h-[600px]!"
        description="From premium commercial spaces to luxury residences – explore our handpicked portfolio of high-potential properties across Noida, Greater Noida, and Gurugram."
        bgImage={projectsHero}
        webpImage={projectsHero}
      />

      <section className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120 py-64 sm:py-80">

        {/* Controls: Tabs & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-32 mb-64">

          {/* Tab Bar — populated from API city data */}
          <div className="flex items-center gap-12 sm:gap-16 overflow-x-auto pb-8 lg:pb-0 w-full lg:w-auto no-scrollbar">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveTab(city)}
                className={`
                  whitespace-nowrap px-24 py-12 rounded-full-999 text-sm font-medium transition-all duration-300 border
                  ${activeTab === city
                    ? "bg-primary text-negative border-primary"
                    : "bg-surface-white text-primary border-default hover:border-primary/40"
                  }
                `}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-[400px]">
            <Search className="absolute left-16 top-1/2 -translate-y-1/2 size-5 text-primary/40" />
            <input
              type="text"
              placeholder="Search by name, location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-48 pr-24 py-16 bg-surface-white border border-default rounded-full-999
                text-sm text-primary placeholder:text-primary/30
                focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary
                shadow-sm transition-all
              "
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-80">
            <div className="size-40 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-80">
            <p className="text-tertiary text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-16 text-surface-primary font-medium hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Project Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32">
            {paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                slug={project.slug}
                category={project.category.name}
                title={project.title}
                location={project.locality}
                tagline={project.tagline}
                image={project.cover_thumbnail || project.cover_image}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-80">
            <p className="text-tertiary text-lg">No projects found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveTab(ALL_PROJECTS_TAB); }}
              className="mt-16 text-surface-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-12 sm:gap-16 mt-80">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`
                size-40 sm:size-56 rounded-full-999 border flex items-center justify-center transition-all duration-300
                ${currentPage === 1
                  ? "border-default opacity-30 cursor-not-allowed"
                  : "border-default hover:border-primary/40 bg-surface-white cursor-pointer"
                }
              `}
            >
              <ArrowLeft className="size-16 sm:size-24 text-surface-primary" />
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`
                    size-40 sm:size-56 rounded-full-999 text-md font-medium transition-all duration-300 flex items-center justify-center
                    ${currentPage === pageNum
                      ? "bg-surface-primary text-negative"
                      : "bg-surface-white text-surface-primary border border-default hover:border-primary/40"
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`
                size-40 sm:size-56 rounded-full-999 border flex items-center justify-center transition-all duration-300
                ${currentPage === totalPages
                  ? "border-default opacity-30 cursor-not-allowed"
                  : "border-default hover:border-primary/40 bg-surface-white cursor-pointer"
                }
              `}
            >
              <ArrowRight className="size-16 sm:size-24 text-surface-primary" />
            </button>
          </div>
        )}

      </section>
    </main>
  );
}