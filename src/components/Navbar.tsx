import { NavLink, Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useState, useEffect } from "react";
import { getSiteSettings } from "@/api/services/homeService";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Team", path: "/team" },
  { name: "Projects", path: "/projects" },
  { name: "Contact Us", path: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [phone, setPhone] = useState("+91 73111 03111");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        if (data?.phone) setPhone(data.phone);
      } catch (err) {
        console.error("Failed to fetch site settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center z-50 transition-all duration-500">
      <div
        className={`bg-surface-white relative transition-all duration-500 ${
          isScrolled
            ? "w-full rounded-none shadow-md"
            : "w-full rounded-none lg:rounded-b-[40px] lg:max-w-[1140px]"
        }`}
      >
        {/* Left Inverted Curve */}
        <div
          className={`hidden lg:block absolute top-0 -left-40 w-40 h-40 bg-transparent pointer-events-none transition-all duration-500 ${
            isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
          }`}
          style={{
            borderTopRightRadius: "40px",
            boxShadow: "20px -20px 0 20px var(--color-surface-white)",
          }}
        />
        {/* Right Inverted Curve */}
        <div
          className={`hidden lg:block absolute top-0 -right-40 w-40 h-40 bg-transparent pointer-events-none transition-all duration-500 ${
            isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
          }`}
          style={{
            borderTopLeftRadius: "40px",
            boxShadow: "-20px -20px 0 20px var(--color-surface-white)",
          }}
        />

        {/* Content Container */}
        <div
          className={`mx-auto flex items-center justify-between px-24 lg:px-40 transition-all duration-500 ${
            isScrolled ? "max-w-[1140px]" : "w-full"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 flex items-center h-40 py-[20px] lg:py-[20px] box-content cursor-pointer"
          >
            <img src={logo} alt="Anjaneya Logo" className="h-32 lg:h-40 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `focus-visible:outline-none px-12 py-[30px] text-sm font-medium leading-[20px] transition-colors relative ${
                    isActive
                      ? "text-surface-primary"
                      : "text-primary hover:text-surface-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-surface-primary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Contact & Mobile Toggle */}
          <div className="flex items-center gap-16">
            <a
              href={phoneHref}
              className="hidden sm:flex items-center gap-8 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center justify-center bg-surface-primary rounded-[20px] w-32 h-32">
                <Phone className="w-16 h-16 text-white" />
              </div>
              <span className="text-primary text-sm font-medium">{phone}</span>
            </a>

            <button
              className="md:hidden p-8 text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100 py-24" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col px-24">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-8 font-medium transition-colors ${
                    isActive ? "text-surface-primary" : "text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="mt-16 pt-16 border-t border-default flex items-center gap-12 sm:hidden">
              <a
                href={phoneHref}
                className="flex items-center gap-12 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center bg-surface-primary rounded-[20px] w-32 h-32">
                  <Phone className="size-16 text-white" />
                </div>
                <span className="text-primary font-medium">{phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}