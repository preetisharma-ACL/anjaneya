import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail,
  ChevronRight 
} from "lucide-react";
import logo from "@/assets/logo-light.svg";

// Custom Brand Icons (since missing in current lucide-react version)
const SocialIcons = {
  Instagram: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  Linkedin: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Facebook: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Youtube: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
  )
};

const footerLinks = {
  quickLinks: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Our Team", path: "/team" },
    { label: "Projects", path: "/projects" },
    { label: "Contact Us", path: "/contact" },
  ],
  services: [
    { label: "Residential Advisory", path: "#" },
    { label: "Commercial Real Estate", path: "#" },
    { label: "Luxury Properties", path: "#" },
    { label: "Investment Consulting", path: "#" },
    { label: "Property Management", path: "#" },
    { label: "NRI Services", path: "#" },
  ],
  contact: [
    { 
      icon: <MapPin className="size-5 text-surface-primary" />, 
      content: "Office No. 106, 1st Floor, Tower 4, Assotech Business Cresterra, Sector 135, Noida Expressway, Noida – 201304",
      link: "https://www.google.com/maps/search/?api=1&query=Assotech+Business+Cresterra+Sector+135+Noida"
    },
    { 
      icon: <Phone className="size-5 text-surface-primary" />, 
      content: "+91 73111 03111",
      link: "tel:+917311103111"
    },
    { 
      icon: <Mail className="size-5 text-surface-primary" />, 
      content: "info@anjaneyaglobalrealty.com",
      link: "mailto:info@anjaneyaglobalrealty.com"
    },
  ],
  social: [
    { icon: SocialIcons.Instagram, url: "https://www.instagram.com/anjaneya.global.realty/" },
    { icon: SocialIcons.Linkedin, url: "https://www.linkedin.com/company/anjaneya-global-realty/" },
    { icon: SocialIcons.Facebook, url: "https://www.facebook.com/profile.php?id=61576461473513" },
    { icon: SocialIcons.Youtube, url: "https://www.youtube.com/@RohitfromAnjaneyaGlobalRealty" },
  ]
};

export function Footer() {
  return (
    <footer className="bg-[#1A2231] text-negative pt-48 lg:pt-80 pb-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-48 lg:gap-24 mb-80">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-24">
            <Link to="/">
              <img src={logo} alt="Anjaneya Logo" className="w-[240px] h-auto" />
            </Link>
            <p className="text-negative opacity-60 text-sm font-extralight leading-relaxed max-w-[340px]">
              Anjaneya Global Realty is your trusted partner for premium real estate 
              investments across Delhi NCR – where ambition meets opportunity.
            </p>
            <div className="flex flex-col gap-16">
              <span className="text-sm">Follow us on</span>
              <div className="flex items-center gap-12">
                {footerLinks.social.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-40 rounded-full border border-surface-primary/40 flex items-center justify-center hover:bg-surface-primary hover:border-surface-primary transition-all duration-300 group"
                  >
                    <social.icon className="size-16 opacity-50 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col gap-24">
            <h4 className="text-surface-primary text-sm font-extralight uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="flex flex-col gap-16">
              {footerLinks.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-negative/70 hover:text-surface-primary flex items-center gap-8 group transition-colors">
                    <ChevronRight className="size-12 text-surface-primary group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services Column */}
          <div className="lg:col-span-3 flex flex-col gap-24">
            <h4 className="text-surface-primary text-sm font-extralight uppercase tracking-[0.2em]">Our Services</h4>
            <ul className="flex flex-col gap-16">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-negative/70 hover:text-surface-primary flex items-center gap-8 group transition-colors">
                    <ChevronRight className="size-12 text-surface-primary group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 flex flex-col gap-24">
            <h4 className="text-surface-primary text-sm font-extralight uppercase tracking-[0.2em]">Contact Us</h4>
            <ul className="flex flex-col gap-24">
              {footerLinks.contact.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.link}
                    target={item.link.startsWith('http') ? "_blank" : undefined}
                    rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex gap-16 group cursor-pointer"
                  >
                    <div className="shrink-0 mt-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-negative opacity-70 text-sm leading-relaxed group-hover:text-surface-primary transition-colors">
                      {item.content}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-32 border-t border-negative/10 flex flex-col md:flex-row justify-between items-center gap-24">
          <p className="text-negative opacity-50 text-xs">
            © 2026 Anjaneya Global Realty. All rights reserved. | Empowering Smart Real Estate Decisions.
          </p>
          <div className="flex items-center text-xs gap-24">
            {["Privacy Policy", "Terms of Service", "Disclaimer"].map((text, idx) => (
              <a key={idx} href="#" className="text-negative opacity-50 hover:text-surface-primary text-xs transition-colors">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
