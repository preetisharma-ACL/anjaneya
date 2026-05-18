import { SubPageHero } from "@/components/SubPageHero";
import teamsHero from "@/assets/teams-hero.png";
import rohitImg from "@/assets/rohit.png";
import vikrantImg from "@/assets/vikrant.png";
import raunakImg from "@/assets/raunak.png";
import upenderImg from "@/assets/upender.png";
import { ContactBanner } from "@/components/ContactBanner";

const SocialIcons = {
  Linkedin: (props: any) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Youtube: (props: any) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
};

const TEAMS = [
  {
    name: "Rohit Aggarwal",
    image: rohitImg,
    designation: "Founder & CEO",
    description: [
      "Rohit Aggarwal brings over 15 years of experience in real estate sales, marketing, and investment advisory. Before founding Anjaneya Global Realty, he spent nearly 11 years as Assistant Director – Sales & Marketing at Bullmen Realty India Pvt. Limited, where he led high-performing teams, built strong developer partnerships, and managed large-scale residential and commercial transactions across the NCR region. He also held senior roles at Investors Clinic Infratech and Corporate Infocom.",
      "Rohit specializes in helping investors and homebuyers identify high-potential property opportunities in Noida, Greater Noida, and the wider NCR market. His approach is rooted in transparency, market analysis, and long-term relationship building. He holds a B.Tech (ECE) from GITM Gurgaon.",
    ],
    socialLinks: {
      youtube: "https://www.youtube.com/@RohitfromAnjaneyaGlobalRealty",
      linkedin: "https://www.linkedin.com/in/rohit-aggarwal-1b900035/",
    },
  },
  {
    name: "Vikrant Singh",
    image: vikrantImg,
    designation: "Director - Sales & Marketing",
    description: [
      "Vikrant Singh brings over 13 years of experience in luxury real estate sales and marketing across both residential and commercial segments. Before co-founding Anjaneya Global Realty, he spent nearly 9 years as Assistant Director at Bullmen Realty India, where he honed his expertise in direct sales, team building, and large-scale project execution.",
      "He also served as Vice President of Sales at Eleque Infra, Director at Innovation Infra Solutions, and Senior Manager at Investor Clinic - building a deep understanding of the Noida and NCR real estate landscape.",
      "As COO, Vikrant oversees day-to-day operations and ensures seamless execution across all Anjaneya Global Realty projects. His core strengths lie in customer experience, sales operations, and driving performance through KPI-driven team management.",
    ],
    socialLinks: {
      youtube: "https://www.youtube.com/@RohitfromAnjaneyaGlobalRealty",
      linkedin: "https://www.linkedin.com/in/vikrant-singh-57035324/",
    },
  },
  {
    name: "Raunak Verma",
    image: raunakImg,
    designation: "Director - Sales & Marketing",
    description: [
      "Raunak Verma is a seasoned real estate sales and marketing professional with over 10 years of progressive experience in luxury and high-value residential and commercial deals. Before co-founding Anjaneya Global Realty, he built his career at Bullmen Realty India, rising from Associate to Vice President of Sales over nearly a decade - demonstrating deep expertise in direct sales, team leadership, and site operations.",
      "He also served as Assistant Director at Innovation Infra Solutions.",
      "As CMO, Raunak leads all marketing strategy, brand positioning, and client acquisition for Anjaneya Global Realty, specializing in driving high-value commercial and residential transactions across the NCR region.",
    ],
    socialLinks: {
      youtube: "https://www.youtube.com/@RohitfromAnjaneyaGlobalRealty",
      linkedin: "https://www.linkedin.com/in/raunak-verma-7698151b0/",
    },
  },
  {
    name: "Upender Singh",
    image: upenderImg,
    designation: "Director - Sales & Marketing",
    description: [
      "Upender Singh is a seasoned real estate leader and investment strategist with over 8 years of experience across India's luxury and commercial property sectors. As Director at Investment Experts Infratech Pvt. Ltd., he developed deep expertise in the end-to-end lifecycle of high-value real estate assets - from strategic land acquisition through to successful project monetization.",
      "With a track record of managing transactions for over 5,000 investors and delivering multi-billion-rupee project outcomes, Upender brings institutional-grade investment intelligence to every client engagement at Anjaneya Global Realty.",
    ],
    socialLinks: {
      youtube: "https://www.youtube.com/@RohitfromAnjaneyaGlobalRealty",
      linkedin:
        "https://www.linkedin.com/in/upender-singh-806324114?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
  },
];

export function OurTeam() {
  return (
    <main className="bg-surface-white min-h-screen">
      <SubPageHero
        subtitle="The People Behind the Vision"
        title="Meet Our Expert Team"
        className="lg:min-h-[675px]!"
        description="Meet the advisors behind every deal - 40+ combined years of Delhi NCR real estate expertise, dedicated to helping you invest smarter, buy confidently, and grow your wealth for the long run."
        bgImage={teamsHero}
        webpImage={teamsHero}
      />

      <section className="max-w-[1184px] mx-auto px-24 py-48 lg:py-[100px]">
        <div className="grid grid-cols-1 gap-48">
          {TEAMS.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row gap-32 lg:gap-64 items-start ${
                index !== TEAMS.length - 1
                  ? "pb-48 border-b border-dashed"
                  : ""
              }`}
            >
              {/* Member Image */}
              <div className="w-full sm:w-1/2 h-auto max-h-[400px] lg:max-h-[600px] lg:h-full lg:w-[300px] shrink-0">
                <picture>
                  <source srcSet={member.image} type="image/webp" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center rounded-2xl-32"
                  />
                </picture>
              </div>

              {/* Member Content */}
              <div className="flex flex-col gap-24 pt-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16">
                  <div className="flex flex-col gap-4">
                    <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-primary">
                      {member.name}
                    </h2>
                    <p className="text-surface-primary font-medium text-[16px] sm:text-lg">
                      {member.designation}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-12">
                    <a
                      href={member.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-32 sm:size-40 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <SocialIcons.Youtube className="size-16" />
                    </a>
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-32 sm:size-40 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <SocialIcons.Linkedin className="size-16" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-16">
                  {member.description.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-primary/70 text-md leading-relaxed font-light"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactBanner />
    </main>
  );
}