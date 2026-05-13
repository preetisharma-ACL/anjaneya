import { motion } from "framer-motion";
import { WhyChooseUsCard } from "./WhyChooseUsCard";
import cityBg from "@/assets/city.png";
import userIcon from "@/assets/user-octagon.svg";
import buildingIcon from "@/assets/building.svg";
import chartIcon from "@/assets/Icon.svg";
import shieldIcon from "@/assets/shield-tick.svg";

const cards = [
  {
    title: "Affordable Realty Options",
    description: "We prioritize clear communication and simplicity, making your property journey smooth and stress-free.",
    icon: buildingIcon,
  },
  {
    title: "Expertise You Can Trust",
    description: "Our experienced real estate experts guide you through every step with knowledge, care, and dedication.",
    icon: userIcon,
  },
  {
    title: "Market Intelligence Investment",
    description: "We provide real-time insights and expert guidance for smarter property investments.",
    icon: chartIcon,
  },
  {
    title: "Full Portfolio Access",
    description: "Our team offers unparalleled access to a wide range of properties to suit every need.",
    icon: shieldIcon,
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative w-full min-h-[768px] flex items-center overflow-hidden py-48 md:py-120">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={cityBg}
          alt="City Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#16243E]/60" />
        <div className="absolute inset-0 bg-[#1A2231]/60" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-24 sm:px-48 md:px-96">
        <div className="flex flex-col xl:flex-row items-start justify-between gap-48 xl:gap-96">
          
          {/* Left Content */}
          <div className="w-full xl:w-[500px] flex flex-col gap-16 xl:pt-120">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-surface-primary text-sm font-medium uppercase tracking-[0.2em]"
            >
              Why Choose Us
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-16"
            >
              <h2 className="text-4xl font-sans font-medium text-negative leading-normal max-w-[532px]">
                What makes us different
              </h2>
              <p className="text-md font-sans font-normal text-negative opacity-80 leading-relaxed max-w-[464px]">
                We combine institutional-grade market intelligence with a deeply
                personal, client-first approach. Our advisors are not just
                transaction facilitators — we are long-term partners in your
                wealth creation journey.
              </p>
            </motion.div>
          </div>

          {/* Right Cards Grid */}
          <div className="w-full xl:w-auto flex justify-center xl:justify-end mt-48 xl:mt-0">
            <div className="flex flex-col md:flex-row gap-24 xl:gap-24 items-start">
              {/* Left Column (Cards 1 & 3) - Staggered Down on XL */}
              <div className="flex flex-col gap-24 xl:mt-120">
                <WhyChooseUsCard
                  index={0}
                  icon={cards[0].icon}
                  title={cards[0].title}
                  description={cards[0].description}
                />
                <WhyChooseUsCard
                  index={2}
                  icon={cards[2].icon}
                  title={cards[2].title}
                  description={cards[2].description}
                />
              </div>

              {/* Right Column (Cards 2 & 4) - Starts at Top */}
              <div className="flex flex-col gap-24">
                <WhyChooseUsCard
                  index={1}
                  icon={cards[1].icon}
                  title={cards[1].title}
                  description={cards[1].description}
                />
                <WhyChooseUsCard
                  index={3}
                  icon={cards[3].icon}
                  title={cards[3].title}
                  description={cards[3].description}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
