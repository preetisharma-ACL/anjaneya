import bungalowImg from "@/assets/who-we-are.png";
import tickImg from "@/assets/tick-circle.svg"
const WhoWeAre = () => {
  const benefits = [
    "Deep market intelligence across Delhi NCR",
    "Transparent, client-first advisory approach",
    "Specialized in high-value & luxury segments",
    "Hands-on guidance from search to possession"
  ];

  return (
    <section 
      className="py-48 lg:py-120"
      style={{ background: "linear-gradient(70deg, rgba(253, 232, 227, 1) 0%, rgba(255, 255, 255, 1) 20%)" }}
    >
      <div className="mx-auto px-24 md:px-0 md:pl-48 lg:pl-50 flex flex-col md:flex-row gap-32 items-center">
        
        {/* Text Content */}
        <div className="md:w-1/2 flex flex-col items-start md:ml-auto max-w-2xl">
          <div className="flex flex-col gap-16 mb-32">
            <div className="flex items-center gap-12">
              <span className="text-surface-primary text-sm font-medium uppercase tracking-[0.2em]">
                Who We Are
              </span>
              <div className="h-px w-32 bg-surface-primary/40" />
            </div>
            <h2 className="font-headline text-primary text-3xl sm:text-4xl lg:text-[40px] font-medium leading-tight lg:leading-56 max-w-[540px]">
              Redefining Real Estate Advisory in <span className="text-surface-primary">Delhi NCR</span>
            </h2>
          </div>

          <div className="flex flex-col gap-24 mb-40 text-primary/70 text-md font-extralight leading-relaxed max-w-[600px]">
            <p>
              Founded in 2026 and headquartered in Noida, <strong className="font-semibold text-primary">Anjaneya Global Realty</strong> operates across the Delhi NCR region, delivering comprehensive real estate solutions across residential, commercial, and luxury segments. We specialize in high-value investments and NCR-focused advisory, helping clients unlock maximum value while minimizing risk through tailored, insight-driven strategies.
            </p>
            <p>
              Our core purpose is to empower investors and homebuyers to make confident, well-informed property decisions that drive long-term wealth and growth. Built on the principles of trust, transparency, integrity, and excellence, we focus on creating lasting relationships through personalized guidance and deep market expertise.
            </p>
          </div>

          {/* Benefits List */}
          <ul className="grid grid-cols-1 gap-x-32 gap-y-16">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-12 group">
                <img src={tickImg} alt="tick" className="size-16 text-surface-primary group-hover:scale-110 transition-transform" />
                <span className="text-primary/80 text-sm font-extralight">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 relative">
          <div className="overflow-hidden flex items-center flex-1">
            <img
              src={bungalowImg}
              alt="Anjaneya Office"
              className="object-contain object-center md:object-right w-full h-[300px] md:h-[450px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;