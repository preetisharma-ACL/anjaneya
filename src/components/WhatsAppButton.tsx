import whatsappIcon from "@/assets/icons/whatsapp.svg";

export function WhatsAppButton() {
  const phoneNumber = "917311103111"; // Based on navbar number
  const message = "Hi, I'm interested in Anjaneya Global Realty projects.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-24 top-[85%] -translate-y-1/2 z-100 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Pulsing background effect */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
        
        {/* Main Button */}
        <div className="relative size-48 lg:size-56 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(37,211,102,0.3)] group-hover:shadow-[0_12px_24px_rgba(37,211,102,0.4)] group-hover:scale-110 transition-all duration-300">
          <img 
            src={whatsappIcon} 
            alt="WhatsApp" 
            className="size-24 lg:size-32"
          />
        </div>
      </div>
    </a>
  );
}
