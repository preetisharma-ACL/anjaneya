import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, MapPin } from "lucide-react";
import { ConsultationForm } from "@/components/ConsultationForm";
import iconimage from "@/assets/tick-circle.svg";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectById, getProjects } from "@/api/services/projectService";

// ---- Types ----
interface Amenity {
  id: number;
  name: string;
  icon: string;
  display_order: number;
}

interface GalleryImage {
  id: number;
  image: string;
  thumbnail: string;
  medium: string;
  large: string;
  caption: string;
  alt_text: string;
  display_order: number;
  is_primary: boolean;
}

interface Highlight {
  id: number;
  text: string;
  display_order: number;
}

interface Developer {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website: string;
}

interface ProjectDetail {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: { id: number; name: string; slug: string };
  city: { id: number; name: string; slug: string };
  locality: string;
  developer: Developer | null;
  status: string;
  property_type: string;
  price_starting_lacs: string | null;
  price_display: string;
  size_display: string;
  rera_number: string;
  map_embed_url: string;
  cover_image: string;
  cover_thumbnail: string;
  cover_medium: string;
  cover_large: string;
  amenities: Amenity[];
  images: GalleryImage[];
  highlights: Highlight[];
  is_featured: boolean;
  published_at: string;
}

interface RelatedProject {
  id: number;
  slug: string;
  title: string;
  locality: string;
  tagline: string;
  category: { name: string };
  cover_thumbnail: string;
  cover_image: string;
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("overview");
  const heroRef = useRef<HTMLDivElement>(null);
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const carouselDragRef = useRef({
    isDragging: false,
    scrollLeft: 0,
    startX: 0,
  });
  const [isCarouselDragging, setIsCarouselDragging] = useState(false);

  // ── Single fetch effect — project + related combined ──
  useEffect(() => {
    if (!id) return;

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        // Run both requests in parallel
        const [projectData, allProjectsData] = await Promise.all([
          getProjectById(id),
          getProjects(),
        ]);

        setProject(projectData);

        const others = allProjectsData.results.filter(
          (p: { id: number }) => p.id !== projectData.id
        );
        setRelatedProjects(others);
      } catch (err) {
        console.error(err);
        setError("Failed to load project details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  // ── Scroll spy + navbar hide — runs after project renders sections into DOM ──
  useEffect(() => {
    if (!project) return;

    const handleScroll = () => {
      if (heroRef.current) {
        document.body.classList.toggle(
          "hide-navbar",
          window.scrollY >= heroRef.current.offsetHeight
        );
      }
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { root: null, rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    ["overview", "amenities", "highlights", "developers", "location"].forEach(
      (sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) observer.observe(el);
      }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("hide-navbar");
      observer.disconnect();
    };
  }, [project]);

  useEffect(() => {
    const viewport = carouselViewportRef.current;
    const galleryImageCount = project?.images.length || (project ? 1 : 0);

    if (!viewport || galleryImageCount <= 1 || isCarouselDragging) return;

    const intervalId = window.setInterval(() => {
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

      if (maxScrollLeft <= 0) return;

      if (viewport.scrollLeft >= maxScrollLeft - 8) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      viewport.scrollBy({
        left: Math.min(viewport.clientWidth * 0.8, 420),
        behavior: "smooth",
      });
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [project, isCarouselDragging]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      setActiveTab(sectionId);
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 120,
        behavior: "smooth",
      });
    }
  };

  const handleCarouselPointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (e.pointerType === "touch" || !carouselViewportRef.current) return;

    carouselDragRef.current = {
      isDragging: true,
      scrollLeft: carouselViewportRef.current.scrollLeft,
      startX: e.clientX,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsCarouselDragging(true);
  };

  const handleCarouselPointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!carouselDragRef.current.isDragging || !carouselViewportRef.current) {
      return;
    }

    e.preventDefault();
    carouselViewportRef.current.scrollLeft =
      carouselDragRef.current.scrollLeft -
      (e.clientX - carouselDragRef.current.startX);
  };

  const stopCarouselDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    carouselDragRef.current.isDragging = false;
    setIsCarouselDragging(false);
  };

  // ---- Loading ----
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="size-40 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  // ---- Error ----
  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-16">
        <p className="text-tertiary text-lg">{error ?? "Project not found."}</p>
        <button
          onClick={() => window.history.back()}
          className="text-surface-primary font-medium hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ---- Derived data ----
  const statsBar = [
    { label: "Property Status", value: formatStatus(project.status) },
    { label: "Property Type", value: project.property_type },
    project.price_starting_lacs
      ? { label: "Price Starts from", value: `${project.price_starting_lacs} Lacs*` }
      : project.price_display
        ? { label: "Price", value: project.price_display }
        : null,
    project.size_display ? { label: "Sizes", value: project.size_display } : null,
    project.developer ? { label: "Developer", value: project.developer.name } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const galleryImages =
    project.images.length > 0
      ? project.images.map((img) => ({
        src: img.medium || img.image,
        alt: img.alt_text || img.caption || project.title,
      }))
      : [{ src: project.cover_large || project.cover_image, alt: project.title }];

  const cleanMapUrl = project.map_embed_url
    ? project.map_embed_url.split('"')[0]
    : "";

  return (
    <main className="relative w-full min-h-screen bg-white">

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        className="relative w-full min-h-[600px] lg:h-[750px] bg-black"
      >
        <img
          src={project.cover_large || project.cover_image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="relative z-10 w-full h-full flex flex-col justify-center px-24 sm:px-48 lg:px-120 pt-120 pb-50 lg:pb-80">
          <div className="max-w-[700px] flex flex-col gap-24 lg:gap-32 mb-96">
            <div className="flex flex-col gap-12 lg:gap-16">
              <div className="flex items-center gap-12">
                <span className="text-white text-[10px] lg:text-xs font-medium uppercase tracking-[0.2em]">
                  {project.category.name}
                </span>
                <div className="h-px w-64 lg:w-100 bg-white" />
              </div>
              <h1 className="font-headline text-4xl sm:text-6xl lg:text-[64px] text-white font-normal leading-tight">
                {project.title}
              </h1>
            </div>

            <div className="flex items-center gap-8 text-white/90">
              <MapPin className="size-4 lg:size-5 text-white" />
              <span className="font-extralight">{project.locality}</span>
            </div>

            <p className="text-white font-instrument-sans font-extralight text-[16px] lg:text-lg leading-relaxed max-w-[600px]">
              {project.tagline}
            </p>
          </div>

          {project.rera_number && (
            <div className="flex justify-end">
              <div className="bg-[#00D100] px-12 py-8 rounded-full flex items-center gap-8 shadow-lg">
                <CheckCircle2 className="size-16 lg:size-5 text-white fill-white/20" />
                <span className="text-white text-[10px] lg:text-xs font-bold tracking-wider">
                  RERA APPROVED
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-primary/40 backdrop-blur-[10px] py-24 lg:py-0">
          <div className="max-w-[1200px] mx-auto lg:h-120 px-24 lg:px-40 grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-between items-center gap-24 lg:gap-0">
            {statsBar.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-white/60 text-[9px] lg:text-[10px] uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="text-white text-xs lg:text-sm font-normal">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="sticky top-0 w-full bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)] h-80 z-60">
        <div className="max-w-[1200px] mx-auto px-40 h-full flex items-center">
          <div className="flex items-center h-full overflow-x-auto no-scrollbar">
            {[
              { label: "OVERVIEW", id: "overview" },
              { label: "AMENITIES", id: "amenities" },
              { label: "KEY HIGHLIGHTS", id: "highlights" },
              { label: "ABOUT DEVELOPERS", id: "developers" },
              { label: "LOCATION", id: "location" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`h-full px-24 flex items-center shrink-0 justify-center cursor-pointer text-[14px] font-medium tracking-[0.15em] transition-all duration-300 border-b-2 ${activeTab === tab.id
                  ? "text-surface-primary border-surface-primary"
                  : "text-primary border-transparent hover:text-surface-primary"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-[1200px] mx-auto px-40 py-24 flex flex-col lg:flex-row gap-64">
        <div className="flex-1 flex flex-col gap-64">

          {/* Overview */}
          <div id="overview" className="flex flex-col gap-24 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Project Description
            </h4>
            {project.description ? (
              <div className="flex flex-col gap-16">
                {project.description
                  .split(/\r?\n/)
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i} className="text-secondary text-md font-extralight leading-relaxed">
                      {para}
                    </p>
                  ))}
              </div>
            ) : (
              <p className="text-secondary text-md font-extralight leading-relaxed">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Amenities */}
          <div id="amenities" className="flex flex-col gap-16 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Amenities
            </h4>
            {project.amenities.length > 0 ? (
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-16">
                {project.amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="flex flex-col items-center justify-center text-center p-16 bg-[#FDFAF6] rounded-xl-16 size-120 gap-12"
                  >
                    <img src={amenity.icon} alt={amenity.name} className="size-32" />
                    <span className="text-primary text-[10px] font-extralight leading-tight">
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary text-md font-extralight">
                No amenities listed for this project.
              </p>
            )}
          </div>

          {/* Key Highlights */}
          <div id="highlights" className="flex flex-col gap-24 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Key Highlights
            </h4>
            {project.highlights.length > 0 ? (
              <ul className="flex flex-col gap-16">
                {project.highlights.map((h) => (
                  <li key={h.id} className="flex items-center gap-12">
                    <img src={iconimage} alt="tick" className="size-5" />
                    <span className="text-secondary text-sm font-extralight leading-normal">
                      {h.text}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary text-md font-extralight">
                No highlights listed for this project.
              </p>
            )}
          </div>

          {/* About Developer */}
          <div id="developers" className="flex flex-col gap-24 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              About Developer
            </h4>
            {project.developer ? (
              <div className="flex flex-col gap-16">
                <div className="flex items-center gap-16">
                  {project.developer.logo && (
                    <img
                      src={project.developer.logo}
                      alt={project.developer.name}
                      className="h-48 object-contain"
                    />
                  )}
                  {project.developer.website && (
                    <a
                      href={project.developer.website as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-surface-primary text-sm hover:underline"
                    >
                      {project.developer.website}
                    </a>
                  )}
                </div>
                {project.developer.description ? (
                  <p className="text-secondary text-md font-extralight leading-relaxed">
                    {project.developer.description}
                  </p>
                ) : (
                  <p className="text-secondary text-md font-extralight leading-relaxed">
                    {project.developer.name} is the developer of this project.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-secondary text-md font-extralight">
                Developer information not available.
              </p>
            )}
          </div>

          {/* Location */}
          <div id="location" className="flex flex-col gap-24 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Location
            </h4>
            {cleanMapUrl ? (
              <iframe
                src={cleanMapUrl}
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "24px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              <p className="text-secondary text-md font-extralight">
                {project.locality}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-[400px]">
          <div className="sticky top-120">
            <ConsultationForm />
          </div>
        </div>
      </div>

      {/* ── Gallery ── */}
      <section className="pt-24 pb-80">
        <div className="flex flex-col gap-24">
          <div className="max-w-[1250px] mx-auto px-40 w-full text-left">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Project Gallery
            </h4>
          </div>

          <div
            ref={carouselViewportRef}
            onPointerDown={handleCarouselPointerDown}
            onPointerMove={handleCarouselPointerMove}
            onPointerUp={stopCarouselDrag}
            onPointerCancel={stopCarouselDrag}
            onPointerLeave={stopCarouselDrag}
            className={`max-w-[1250px] mx-auto w-full overflow-x-auto overflow-y-hidden no-scrollbar select-none ${
              isCarouselDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div className="flex w-max px-40 gap-16">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="shrink-0 w-[300px] md:w-[420px] h-[220px] md:h-[300px] select-none rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── You May Also Like ── */}
      {relatedProjects.length > 0 && (
        <section className="py-80 lg:py-[100px] px-40 bg-[#FDFAF6]">
          <div className="flex flex-col gap-24 max-w-[1200px] mx-auto">
            <h2 className="font-headline text-2xl lg:text-[32px] text-center text-primary font-medium">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
              {relatedProjects.slice(0, 3).map((related) => (
                <ProjectCard
                  key={related.id}
                  id={related.id}
                  category={related.category.name}
                  title={related.title}
                  location={related.locality}
                  tagline={related.tagline}
                  image={related.cover_thumbnail || related.cover_image}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
