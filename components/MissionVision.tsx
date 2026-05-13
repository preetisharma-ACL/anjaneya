import founderImg from "@/assets/founder-1.png";
import cityImg from "@/assets/metro-city.png";
import handshakeImg from "@/assets/client-handshaking.png";

export function MissionVision() {
  return (
    <section className="bg-surface-white pt-32 pb-[100px] overflow-hidden">
      <div className="max-w-[1184px] mx-auto px-24">
        <div className="flex flex-col xl:flex-row xl:rounded-tl-[80px] overflow-hidden">
          {/* Left Column: Main Featured Image (50% on desktop) */}
          <div className="w-full h-[400px] lg:h-[500px] xl:h-full xl:w-1/2 relative aspect-square lg:aspect-auto">
            <picture>
              <source srcSet={cityImg} type="image/webp" />
              <img
                src={cityImg}
                alt="Delhi NCR Metro City"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </div>

          {/* Right Content Area: 2x2 Grid Layout (50% on desktop) */}
          <div className="w-full xl:w-1/2 grid grid-cols-1 sm:grid-cols-2">
            {/* Row 1, Col 1: Handshake Image */}
            <div className="">
              <picture>
                <source srcSet={handshakeImg} type="image/webp" />
                <img
                  src={handshakeImg}
                  alt="Client Handshaking"
                  className="w-full h-full object-cover object-center"
                />
              </picture>
            </div>

            {/* Row 1, Col 2: Our Mission Text */}
            <div className="bg-[#FDFAF6] p-32 pb-40 flex flex-col justify-center gap-16">
              <h3 className="text-primary text-xl font-medium">Our Mission</h3>
              <p className="text-primary text-sm leading-relaxed font-extralight">
                To put people before properties. We exist to ensure that every
                homebuyer, investor, and business owner in Delhi NCR has access
                to honest expertise, real market insight, and a dedicated
                partner who treats their goals as our own.
              </p>
            </div>

            {/* Row 2, Col 1: Our Vision Text */}
            <div className="bg-[#FDFAF6] p-32 pb-40 flex flex-col justify-center gap-16">
              <h3 className="text-primary text-xl font-medium">Our Vision</h3>
              <p className="text-primary text-sm leading-relaxed font-extralight">
                To become Delhi NCR's most trusted and respected real estate
                advisory firm known not for the number of transactions we close,
                but for the lasting wealth and meaningful growth we create for
                every client we serve.
              </p>
            </div>

            {/* Row 2, Col 2: Founder Image */}
            <div className=" bg-black">
              <picture>
                <source srcSet={founderImg} type="image/webp" />
                <img
                  src={founderImg}
                  alt="Founder of Anjaneya Global Realty"
                  className="w-full h-full object-cover object-center"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
