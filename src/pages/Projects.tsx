import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SubPageHero } from "@/components/SubPageHero";
import projectsHero from "@/assets/featured-hero.png";
import { ProjectCard } from "@/components/ProjectCard";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { getProjects } from "@/api/services/projectService";

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

/**
 * Derive a human-readable page heading from the active filters.
 * Priority: city param > category param > default
 */
function getPageHeading(
  cityParam: string | null,
  categoryParam: string | null,
  projects: ApiProject[]
): string {
  if (cityParam) {
    const match = projects.find((p) => p.city.slug === cityParam);
    const cityName = match?.city.name ?? cityParam;
    return `Projects in ${cityName}`;
  }
  if (categoryParam) {
    const match = projects.find((p) => p.category.slug === categoryParam);
    const name = match?.category.name ?? categoryParam;
    return `${name} Projects`;
  }
  return "Our Featured Projects";
}

export function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Query params ──────────────────────────────────────────────────────────
  // `category` – slug of the selected category (e.g. "residential")
  // `city`     – slug of the selected city     (e.g. "noida")
  // Both can co-exist but city takes visual priority for the heading.
  const categoryParam = searchParams.get("category");
  const cityParam = searchParams.get("city");

  // ── Local state ───────────────────────────────────────────────────────────
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Active category tab: slug or ALL_PROJECTS_TAB sentinel
  const activeTab = categoryParam ?? ALL_PROJECTS_TAB;

  // ── Helpers ───────────────────────────────────────────────────────────────

  /**
   * Set the active category tab.
   * - Preserves the current `city` param (city filter is orthogonal).
   * - Resets pagination.
   */
  const setActiveTab = (tab: string) => {
    setCurrentPage(1);
    const next: Record<string, string> = {};
    // Carry city param through if present
    if (cityParam) next.city = cityParam;
    if (tab !== ALL_PROJECTS_TAB) next.category = tab;
    setSearchParams(next);
  };

  // ── Data fetching ─────────────────────────────────────────────────────────
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

  // Reset pagination whenever filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryParam, cityParam, searchQuery]);

  // ── Derived data ──────────────────────────────────────────────────────────

  // Build the category tab list from loaded projects
  const categoryTabs = useMemo(() => {
    const seen = new Map<string, string>(); // slug → display name
    projects.forEach((p) => seen.set(p.category.slug, p.category.name));
    return [ALL_PROJECTS_TAB, ...Array.from(seen.values())];
  }, [projects]);

  /**
   * Apply all three filters:
   *   1. city (if ?city= is present, show ONLY that city regardless of category)
   *   2. category tab (when no city param, or city+category together)
   *   3. search query
   */
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search: matches title or locality
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.locality.toLowerCase().includes(searchQuery.toLowerCase());

      // City filter: when city param is set, only show projects from that city
      const matchesCity = !cityParam || project.city.slug === cityParam;

      // Category filter: only applied when category param is set
      const matchesCategory =
        activeTab === ALL_PROJECTS_TAB || project.category.slug === activeTab;

      return matchesSearch && matchesCity && matchesCategory;
    });
  }, [projects, searchQuery, cityParam, activeTab]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const pageHeading = getPageHeading(cityParam, categoryParam, projects);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="bg-surface-white min-h-screen">
      <SubPageHero
        subtitle="PREMIUM PORTFOLIO"
        title={pageHeading}
        className="lg:min-h-[600px]!"
        description="From premium commercial spaces to luxury residences – explore our handpicked portfolio of high-potential properties across Noida, Greater Noida, and Gurugram."
        bgImage={projectsHero}
        webpImage={projectsHero}
      />

      <section className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120 py-64 sm:py-80">

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-32 mb-64">

          {/* Category Tab Bar */}
          <div className="flex items-center gap-12 sm:gap-16 overflow-x-auto pb-8 lg:pb-0 w-full lg:w-auto no-scrollbar">
            {categoryTabs.map((tab) => {
              // Resolve display name → slug for comparison
              const tabSlug =
                tab === ALL_PROJECTS_TAB
                  ? ALL_PROJECTS_TAB
                  : (projects.find((p) => p.category.name === tab)?.category.slug ?? tab);

              const isActive = activeTab === tabSlug;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabSlug)}
                  className={`
                    whitespace-nowrap px-24 py-12 rounded-full-999 text-sm font-medium transition-all duration-300 border
                    ${isActive
                      ? "bg-primary text-negative border-primary"
                      : "bg-surface-white text-primary border-default hover:border-primary/40"
                    }
                  `}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-[400px]">
            <Search className="absolute left-16 top-1/2 -translate-y-1/2 size-5 text-primary/40" />
            <input
              type="text"
              placeholder="Search by name, location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-48 pr-24 py-16 bg-surface-white border border-default rounded-full-999 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Active city filter badge */}
        {cityParam && !loading && (
          <div className="flex items-center gap-12 mb-32">
            <span className="text-sm text-secondary">
              Showing projects in{" "}
              <span className="font-medium text-primary">
                {projects.find((p) => p.city.slug === cityParam)?.city.name ?? cityParam}
              </span>
            </span>
            <button
              onClick={() => {
                // Remove city param; keep category param if present
                const next: Record<string, string> = {};
                if (categoryParam) next.category = categoryParam;
                setSearchParams(next);
              }}
              className="text-xs text-surface-primary underline hover:opacity-70 transition-opacity"
            >
              Clear city filter
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-80">
            <div className="size-40 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        )}

        {/* Error */}
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

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32">
            {paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                // When arriving via city URL, use city slug in the card link;
                // otherwise use the project slug as before.
                slug={cityParam ? `${cityParam}/${project.slug}` : project.slug}
                category={project.category.name}
                title={project.title}
                location={project.locality}
                tagline={project.tagline}
                image={project.cover_thumbnail || project.cover_image}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-80">
            <p className="text-tertiary text-lg">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchParams({});
              }}
              className="mt-16 text-surface-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-12 sm:gap-16 mt-80">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`size-40 sm:size-56 rounded-full-999 border flex items-center justify-center transition-all duration-300 ${
                currentPage === 1
                  ? "border-default opacity-30 cursor-not-allowed"
                  : "border-default hover:border-primary/40 bg-surface-white cursor-pointer"
              }`}
            >
              <ArrowLeft className="size-16 sm:size-24 text-surface-primary" />
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`size-40 sm:size-56 rounded-full-999 text-md font-medium transition-all duration-300 flex items-center justify-center ${
                    currentPage === pageNum
                      ? "bg-surface-primary text-negative"
                      : "bg-surface-white text-surface-primary border border-default hover:border-primary/40"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`size-40 sm:size-56 rounded-full-999 border flex items-center justify-center transition-all duration-300 ${
                currentPage === totalPages
                  ? "border-default opacity-30 cursor-not-allowed"
                  : "border-default hover:border-primary/40 bg-surface-white cursor-pointer"
              }`}
            >
              <ArrowRight className="size-16 sm:size-24 text-surface-primary" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}