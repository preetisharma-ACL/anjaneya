import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import projectVideo from "@/assets/project-details-video.mp4";
import {
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { ConsultationForm } from "@/components/ConsultationForm";
import { ProjectCard } from "@/components/ProjectCard";
import layerIcon from "@/assets/icons/layer.svg";
import building2Icon from "@/assets/icons/building-2.svg";
import rupeeIcon from "@/assets/icons/₹.svg";
import formatSquareIcon from "@/assets/icons/format-square.svg";
import bulidingIcon from "@/assets/icons/buliding.svg";

export function ProjectDetails() {
  const [activeTab, setActiveTab] = useState("overview");
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }

    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        if (window.scrollY >= heroHeight) {
          document.body.classList.add("hide-navbar");
        } else {
          document.body.classList.remove("hide-navbar");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for active tab tracking
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -60% 0px", // Match scroll-mt and only trigger at top
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["overview", "amenities", "highlights", "developers", "location"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("hide-navbar");
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveTab(id);
      const offset = 120; // height of the sticky tab bar + extra padding
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Mock data based on Figma screenshot
  const project = {
    title: "CRC The Flagship",
    location: "Plot No. 1B, Sector 140A, Noida, Uttar Pradesh 201304",
    category: "COMMERCIAL",
    description:
      "The Flagship is envisioned to be a vibrant, mixed-use, town centre; with over 1.1 million sq.ft of iconic, state of the art IT/ ITES office towers with a campus feel, a bustling retail center, and 5 star level serviced suites.",
    stats: [
      {
        label: "Property status",
        value: "Under Construction",
        icon: layerIcon,
      },
      {
        label: "Property Type",
        value: "Retail/Office Space",
        icon: building2Icon,
      },
      {
        label: "Price Starts from",
        value: "80 Lacs*",
        icon: rupeeIcon,
      },
      {
        label: "Sizes",
        value: "360 Sq.Ft. onwards",
        icon: formatSquareIcon,
      },
      {
        label: "Developer",
        value: "CRC GROUP",
        icon: bulidingIcon,
      },
    ],
  };

  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-white">
      {/* Background Video */}
      <div
        ref={heroRef}
        className="relative w-full min-h-[600px] lg:h-[750px] bg-black"
      >
        <video
          ref={videoRef}
          src={projectVideo}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          muted
          loop
          playsInline
          autoPlay
        />

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-24 sm:px-48 lg:px-120 pt-120 pb-50 lg:pb-80">
          <div className="max-w-[700px] flex flex-col gap-24 lg:gap-32 mb-96">
            {/* Category & Title */}
            <div className="flex flex-col gap-12 lg:gap-16">
              <div className="flex items-center gap-12">
                <span className="text-white text-[10px] lg:text-xs font-medium uppercase tracking-[0.2em]">
                  {project.category}
                </span>
                <div className="h-px w-64 lg:w-100 bg-white" />
              </div>

              <h1 className="font-headline text-4xl sm:text-6xl lg:text-[64px] text-white font-normal leading-tight">
                {project.title}
              </h1>
            </div>

            {/* Location */}
            <div className="flex items-center gap-8 text-white/90">
              <MapPin className="size-4 lg:size-5 text-white" />
              <span className="font-extralight">{project.location}</span>
            </div>

            {/* Description */}
            <p className="text-white font-instrument-sans font-extralight text-[16px] lg:text-lg leading-relaxed max-w-[600px]">
              {project.description}
            </p>

            {/* RERA Badge */}
          </div>
          <div className="flex justify-end">
            <div className="bg-[#00D100] px-12 py-8 rounded-full flex items-center gap-8 shadow-lg">
              <CheckCircle2 className="size-16 lg:size-5 text-white fill-white/20" />
              <span className="text-white text-[10px] lg:text-xs font-bold tracking-wider">
                RERA APPROVED
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Information Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-primary/40 backdrop-blur-[10px] py-24 lg:py-0">
          <div className="max-w-[1200px] mx-auto lg:h-120 px-24 lg:px-40 grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-between items-center gap-24 lg:gap-0">
            {project.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-12 lg:gap-16">
                <div className="size-32 lg:size-10 bg-white rounded-full flex items-center justify-center shrink-0">
                  <img
                    src={stat.icon}
                    alt={stat.label}
                    className="size-16 lg:size-5"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white/60 text-[9px] lg:text-[10px] uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="text-white text-xs lg:text-sm font-normal truncate">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Bar */}
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
                key={tab.label}
                onClick={() => scrollToSection(tab.id)}
                className={`
                  h-full px-24 flex items-center shrink-0 justify-center cursor-pointer text-[14px] font-medium tracking-[0.15em] transition-all duration-300 border-b-2
                  ${
                    activeTab === tab.id
                      ? "text-surface-primary border-surface-primary"
                      : "text-primary border-transparent hover:text-surface-primary"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Content section */}
      <div className="max-w-[1200px] mx-auto px-40 py-24 flex flex-col lg:flex-row gap-64">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-64">
          {/* Project Description */}
          <div id="overview" className="flex flex-col gap-24 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Project Description
            </h4>
            <div className="flex flex-col gap-16">
              <p className="text-secondary text-md font-extralight leading-relaxed">
                CRC The Flagship is an upcoming commercial development located
                in Sector-140A, Noida, one of the fastest-growing business hubs
                along the Noida Expressway. Developed by CRC Group, the project
                is strategically positioned on a prime corner plot, offering
                excellent visibility and seamless accessibility. Designed to
                cater to modern business needs, it features premium retail
                shops, serviced suites, office spaces, and a vibrant food court,
                creating a dynamic commercial ecosystem.
              </p>
              <p className="text-secondary text-md font-extralight leading-relaxed">
                The development focuses on high footfall and strong investment
                potential, making it ideal for investors and business owners.
                With modern infrastructure, multiple entry and exit points, and
                a thoughtfully planned layout, it ensures convenience for both
                visitors and occupants. CRC The Flagship integrates lifestyle
                and business with amenities such as a sky lounge, retail
                entertainment zones, and advanced building management systems.
              </p>
              <p className="text-secondary text-md font-extralight leading-relaxed">
                Its proximity to major landmarks like DND Flyway, Sector 18, and
                upcoming infrastructure developments further enhances its value,
                making it a promising commercial destination in Noida.
              </p>
            </div>
          </div>

          {/* Amenities Grid */}
          <div
            id="amenities"
            className="flex flex-col gap-16 max-w-[600px] lg:max-w-full scroll-mt-120"
          >
            <h4 className="font-headline text-2xl font-normal text-primary">
              Amenities
            </h4>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-16">
              {[
                { name: "Hi-Tech Security", icon: "cctv-camera 1.svg" },
                { name: "Ample Parking", icon: "parking 1.svg" },
                { name: "24/7 Power Backup", icon: "flash.svg" },
                { name: "High-speed Internet", icon: "wifi.svg" },
                { name: "Hi-speed Elevators", icon: "row-horizontal.svg" },
                { name: "Business lounges", icon: "chairs 1.svg" },
                { name: "Biometric Entry", icon: "finger-cricle.svg" },
                { name: "ATMs & Bank Facilities", icon: "card-pos.svg" },
                { name: "EV Charging Stations", icon: "gas-station.svg" },
                { name: "Pharmacy & Health Care", icon: "first-aid-kit 1.svg" },
              ].map((amenity, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center p-16 bg-[#FDFAF6] rounded-xl-16 size-120 gap-12"
                >
                  <img
                    src={`/src/assets/icons/${amenity.icon}`}
                    alt={amenity.name}
                    className="size-32"
                  />
                  <span className="text-primary text-[10px] font-extralight leading-tight">
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div id="highlights" className="flex flex-col gap-24 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Key Highlights
            </h4>
            <ul className="flex flex-col gap-16">
              {[
                "Prime Corner Plot in Sec 140A, Noida",
                "Team of Experts like BENOY LONDON/RSP SINGAPORE",
                "Payment Plan 33.3X3",
                "IGBC- Platinum Certified Building",
                "Superior Infrastructure coupled with urban planning",
                "Best of Green Area with 20% of the land boasting greenery",
                "Privatized power distribution resulting to better power supply",
                "80K monthly rental",
              ].map((highlight, index) => (
                <li key={index} className="flex items-center gap-12">
                  <img
                    src="/src/assets/tick-circle.svg"
                    alt="tick"
                    className="size-5"
                  />
                  <span className="text-secondary text-sm font-extralight leading-normal">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* About Developer */}
          <div id="developers" className="flex flex-col gap-24 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              About Developer
            </h4>
            <div className="flex flex-col gap-16">
              <p className="text-secondary text-md font-extralight leading-relaxed">
                CRC Group is one of India's well-recognized real estate
                developers, known for its strong commitment to quality, trust,
                and innovation. Over the years, the company has built a solid
                reputation by delivering projects that reflect high construction
                standards and modern design principles.
              </p>
              <p className="text-secondary text-md font-extralight leading-relaxed">
                CRC Group focuses on creating developments that meet evolving
                customer expectations, whether in residential or commercial
                segments. Their approach emphasizes meticulous planning,
                attention to detail, and adherence to strict quality norms,
                ensuring long-term value for investors and end users.
              </p>
            </div>
          </div>

          {/* Location */}
          <div id="location" className="flex flex-col gap-24 scroll-mt-120">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Location
            </h4>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.172119384174!2d77.41433504305158!3d28.51035744101576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9739c3d44c7%3A0x691598ec71fe120c!2sCRC%20The%20Flagship!5e0!3m2!1sen!2sin!4v1778477311845!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "24px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Consultation Form */}
        <div className="lg:w-[400px]">
          <div className="sticky top-120">
            <ConsultationForm />
          </div>
        </div>
      </div>

      {/* Project Gallery */}
      <section className="pt-24">
        <div className="flex flex-col gap-24">
          <div className="max-w-[1200px] mx-auto px-40 w-full text-left">
            <h4 className="font-headline text-2xl font-normal text-primary">
              Project Gallery
            </h4>
          </div>

          <div className="overflow-hidden">
            <motion.div
              ref={carouselRef}
              drag="x"
              dragConstraints={{ left: -width, right: 0 }}
              className="flex cursor-grab active:cursor-grabbing px-40 gap-16"
            >
              {[
                "/src/assets/image.png",
                "/src/assets/image.png",
                "/src/assets/image.png",
                "/src/assets/image.png",
                "/src/assets/image.png",
              ].map((img, index) => (
                <div
                  key={index}
                  className="shrink-0 h-50 md:h-[350px] select-none"
                >
                  <img
                    src={img}
                    alt={`Project Gallery ${index + 1}`}
                    className="w-full h-full object-cover rounded-l-16 shadow-lg pointer-events-none"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* You May Also Like Section */}
      <section className="py-80 lg:py-[100px] px-40 bg-[#FDFAF6]">
        <div className="flex flex-col gap-24 max-w-[1200px] mx-auto">
          <h2 className="font-headline text-2xl lg:text-[32px] text-center text-primary font-medium">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
            {[
              {
                id: "harmony-heights",
                title: "Harmony Heights",
                location: "Sector-21, Faridabad",
                tagline: "Integrated Living, Shopping, and Office Spaces",
                category: "Residential",
              },
              {
                id: "eldeco-echo",
                title: "Eldeco Echo of Eden",
                location: "Sector-17, Ghaziabad",
                tagline: "State-of-the-art School Campus",
                category: "Residential",
              },
              {
                id: "ace-divino",
                title: "Ace Divino",
                location: "Sector-1, Noida",
                tagline: "Advanced Medical Facilities and Clinics",
                category: "Residential",
              },
            ].map((related) => (
              <ProjectCard key={related.id} {...related} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
