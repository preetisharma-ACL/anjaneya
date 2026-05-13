import { useState, useMemo, useEffect } from "react";
import { SubPageHero } from "@/components/SubPageHero";
import projectsHero from "@/assets/featured-hero.png";
import { ProjectCard } from "@/components/ProjectCard";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";

const PROJECTS_DATA = [
  {
    id: 1,
    title: "CRC The Flagship",
    location: "Sector-140A, Noida",
    category: "Commercial",
    tagline:
      "Premium Retail Shops & Commercial Spaces",
    city: "Noida",
  },
  {
    id: 2,
    title: "Sunrise Residency",
    location: "Sector-45, Gurgaon",
    category: "Residential",
    tagline: "Modern Apartments with Green Spaces",
    city: "Gurugram",
  },
  {
    id: 3,
    title: "Group 108",
    location: "Sector-62, Noida",
    category: "Commercial",
    tagline: "Warehouse and Distribution Centers",
    city: "Noida",
  },
  {
    id: 4,
    title: "Harmony Heights",
    location: "Sector-21, Faridabad",
    category: "Residential",
    tagline: "Integrated Living, Shopping, and Office Spaces",
    city: "Faridabad",
  },
  {
    id: 5,
    title: "Eldeco Echo of Eden",
    location: "Sector-17, Ghaziabad",
    category: "Residential",
    tagline: "State-of-the-Art School Campus",
    city: "Ghaziabad",
  },
  {
    id: 6,
    title: "Ace Divino",
    location: "Sector-1, Noida",
    category: "Residential",
    tagline: "Advanced Medical Facilities and Clinics",
    city: "Noida",
  },
  {
    id: 7,
    title: "Godrej South Estate",
    location: "Okhla, New Delhi",
    category: "Luxury",
    tagline: "Pinnacle of Luxury Living in the Heart of South Delhi",
    city: "New Delhi",
  },
  {
    id: 8,
    title: "M3M Capital",
    location: "Sector-113, Gurgaon",
    category: "Residential",
    tagline: "Golf Style Living on Dwarka Expressway",
    city: "Gurugram",
  }
];

const CITIES = ["All Projects", "Noida", "Greater Noida", "Gurugram"];

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Projects");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to first page when filtering changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab = 
        activeTab === "All Projects" || project.city === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

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
          
          {/* Tab Bar */}
          <div className="flex items-center gap-12 sm:gap-16 overflow-x-auto pb-8 lg:pb-0 w-full lg:w-auto no-scrollbar">
            {CITIES.map((city) => (
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

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32">
          {paginatedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              category={project.category}
              title={project.title}
              location={project.location}
              tagline={project.tagline}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-80">
            <p className="text-tertiary text-lg">No projects found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveTab("All Projects"); }}
              className="mt-16 text-surface-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-12 sm:gap-16 mt-80">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
