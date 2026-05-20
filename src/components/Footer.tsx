import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo-light.svg";
import { getSiteSettings } from "@/api/services/homeService";
import { PrivacyPolicy } from "@/pages/Privacypolicy";
import { TermsAndConditions } from "@/pages/Termsandconditions";
// ── Types ──────────────────────────────────────────────────────────────────────

interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  whatsapp_url: string;
  instagram_url: string;
  linkedin_url: string;
  facebook_url: string;
  youtube_url: string;
  hero_stat_clients: string;
  hero_stat_clients_label: string;
  hero_stat_value: string;
  hero_stat_value_label: string;
  copyright_year: number;
}

// ── Custom SVG Social Icons ────────────────────────────────────────────────────

const SocialIcons = {
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Youtube: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  Whatsapp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
};

// ── Static data (non-API) ──────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Team", path: "/team" },
  { label: "Projects", path: "/projects" },
  { label: "Contact Us", path: "/contact" },
];

const services = [
  "Residential Advisory",
  "Commercial Real Estate",
  "Luxury Properties",
  "Investment Consulting",
  "Property Management",
  "NRI Services",
];

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Build the social links array from settings, filtering out empty URLs.
 */
function buildSocialLinks(s: SiteSettings) {
  return [
    { Icon: SocialIcons.Instagram, url: s.instagram_url, label: "Instagram" },
    { Icon: SocialIcons.Linkedin, url: s.linkedin_url, label: "LinkedIn" },
    { Icon: SocialIcons.Facebook, url: s.facebook_url, label: "Facebook" },
    { Icon: SocialIcons.Youtube, url: s.youtube_url, label: "YouTube" },
    { Icon: SocialIcons.Whatsapp, url: s.whatsapp_url, label: "WhatsApp" },
  ].filter((item) => Boolean(item.url));
}

/**
 * Build the contact items array from settings.
 */
function buildContactItems(s: SiteSettings) {
  return [
    {
      Icon: MapPin,
      content: s.address,
      link: `https://www.google.com/maps/search/?api=1&query=Assotech+Business+Cresterra+Sector+135+Noida`,
      external: true,
    },
    {
      Icon: Phone,
      content: s.phone,
      link: `tel:${s.phone.replace(/\s+/g, "")}`,
      external: false,
    },
    {
      Icon: Mail,
      content: s.email,
      link: `mailto:${s.email}`,
      external: false,
    },
  ];
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings()
      .then((data: SiteSettings) => setSettings(data))
      .catch((err) => console.error("Failed to fetch site settings:", err));
  }, []);

  // Derive dynamic arrays only when settings are available
  const socialLinks = settings ? buildSocialLinks(settings) : [];
  const contactItems = settings ? buildContactItems(settings) : [];
  const copyrightYear = settings?.copyright_year ?? new Date().getFullYear();

  return (
    <footer className="bg-[#1A2231] text-negative pt-48 lg:pt-80 pb-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-48 lg:gap-24 mb-80">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-4 flex flex-col gap-24">
            <Link to="/">
              <img src={logo} alt="Anjaneya Logo" className="w-[240px] h-auto" />
            </Link>
            <p className="text-negative opacity-60 text-sm font-extralight leading-relaxed max-w-[340px]">
              Anjaneya Global Realty is your trusted partner for premium real estate
              investments across Delhi NCR – where ambition meets opportunity.
            </p>

            {/* Social Links */}
            <div className="flex flex-col gap-16">
              <span className="text-sm">Follow us on</span>
              <div className="flex items-center gap-12 flex-wrap">
                {socialLinks.length > 0
                  ? socialLinks.map(({ Icon, url, label }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="size-40 rounded-full border border-surface-primary/40 flex items-center justify-center hover:bg-surface-primary hover:border-surface-primary transition-all duration-300 group"
                    >
                      <Icon className="size-16 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </a>
                  ))
                  : /* Skeleton placeholders while loading */
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="size-40 rounded-full border border-negative/10 bg-negative/5 animate-pulse"
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* ── Quick Links Column ── */}
          <div className="lg:col-span-2 flex flex-col gap-24">
            <h4 className="text-surface-primary text-sm font-extralight uppercase tracking-[0.2em]">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-16">
              {quickLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-negative/70 hover:text-surface-primary flex items-center gap-8 group transition-colors"
                  >
                    <ChevronRight className="size-12 text-surface-primary group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services Column ── */}
          <div className="lg:col-span-3 flex flex-col gap-24">
            <h4 className="text-surface-primary text-sm font-extralight uppercase tracking-[0.2em]">
              Our Services
            </h4>
            <ul className="flex flex-col gap-16">
              {services.map((label) => (
                <li
                  key={label}
                  className="text-negative/70 hover:text-surface-primary flex items-center gap-8 group transition-colors"
                >
                  <ChevronRight className="size-12 text-surface-primary group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Column ── */}
          <div className="lg:col-span-3 flex flex-col gap-24">
            <h4 className="text-surface-primary text-sm font-extralight uppercase tracking-[0.2em]">
              Contact Us
            </h4>

            {contactItems.length > 0 ? (
              <ul className="flex flex-col gap-24">
                {contactItems.map(({ Icon, content, link, external }) => (
                  <li key={link}>
                    <a
                      href={link}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex gap-16 group cursor-pointer"
                    >
                      <div className="shrink-0 mt-4 group-hover:scale-110 transition-transform">
                        <Icon className="size-5 text-surface-primary" />
                      </div>
                      <span className="text-negative opacity-70 text-sm leading-relaxed group-hover:text-surface-primary transition-colors">
                        {content}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              /* Skeleton while loading */
              <ul className="flex flex-col gap-24">
                {Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className="flex gap-16">
                    <div className="size-20 rounded bg-negative/10 animate-pulse shrink-0 mt-1" />
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="h-3 rounded bg-negative/10 animate-pulse w-3/4" />
                      <div className="h-3 rounded bg-negative/10 animate-pulse w-1/2" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-32 border-t border-negative/10 flex flex-col md:flex-row justify-between items-center gap-24">
          <p className="text-negative opacity-50 text-xs">
            © {copyrightYear} Anjaneya Global Realty. All rights reserved. | Empowering Smart Real Estate Decisions.
          </p>
          <div className="flex items-center text-xs gap-24 flex-wrap">
            <Link
              to="/privacy-policy"
              className="text-negative opacity-50 hover:text-surface-primary transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="text-negative opacity-50 hover:text-surface-primary transition-colors"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/disclaimer"
              className="text-negative opacity-50 hover:text-surface-primary transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}