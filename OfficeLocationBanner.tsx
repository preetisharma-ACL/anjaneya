import smsIcon from "@/assets/sms.svg";
import callIcon from "@/assets/call-calling.svg";
import bannerImg from "@/assets/contact-us-banner.png";

export function OfficeLocationBanner() {
  return (
    <section className="max-w-[1184px] mx-auto px-24 pb-48 lg:pb-120">
      <div className="bg-primary rounded-2xl-32 overflow-hidden flex flex-col sm:flex-row gap-24 lg:gap-72 px-24 lg:px-48">
        {/* Left Side: Image with custom shape */}
        <div className="relative w-full sm:w-1/2 h-[300px] lg:h-[480px] shrink-0">
          <div className="w-full h-full overflow-hidden rounded-b-[160px] lg:rounded-b-[200px]">
            <img
              src={bannerImg}
              alt="Office Building"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-32 py-32 lg:pr-80 sm:py-72">
          <div className="flex flex-col gap-12">
            <h3 className="font-headline text-white text-xl sm:text-2xl font-normal">
              Anjaneya Global Realty
            </h3>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Assotech+Business+Cresterra+Sector+135+Noida"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 text-sm font-extralight leading-relaxed max-w-[400px] hover:text-surface-primary transition-colors cursor-pointer"
            >
              Office No. 106, 1st Floor, Tower 4, Assotech Business Cresterra, Sector 135, Noida Expressway, Noida – 201304
            </a>
          </div>

          <div className="flex flex-col gap-24">
            {/* Email Section */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-12">
                <img src={smsIcon} alt="Email" className="size-16" />
                <span className="text-white font-medium">Email Us</span>
              </div>
              <a 
                href="mailto:info@anjaneyaglobalrealty.com" 
                className="text-white/80 text-sm font-extralight hover:text-surface-primary transition-colors pl-32"
              >
                info@anjaneyaglobalrealty.com
              </a>
            </div>

            {/* Call Section */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-12">
                <img src={callIcon} alt="Call" className="size-16" />
                <span className="text-white font-medium">Call us</span>
              </div>
              <div className="flex flex-col gap-4 pl-32">
                <a 
                  href="tel:+917311103111" 
                  className="text-white/80 text-sm font-extralight hover:text-surface-primary transition-colors"
                >
                  +91 73111 03111
                </a>
                <p className="text-white/60 text-xs font-extralight">
                  Mon - Sat | 9am – 7pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
