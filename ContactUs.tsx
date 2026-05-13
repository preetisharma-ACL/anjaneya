import { SubPageHero } from "@/components/SubPageHero";
import featuredHero from "@/assets/featured-hero.png";
import tickCircle from "@/assets/tick-circle.svg";
import { OfficeLocationBanner } from "@/components/OfficeLocationBanner";
import { ConsultationForm } from "@/components/ConsultationForm";

export function ContactUs() {
  const bulletPoints = [
    "Free initial consultation with a senior advisor",
    "Personalized property shortlist within 48 hours",
    "Complete market analysis and investment report",
    "End-to-end support from search to possession",
  ];

  return (
    <main className="w-full overflow-visible">
      <SubPageHero
        subtitle="REACH OUT TO US"
        title="Let’s Start Your Property Journey"
        description="Have a question, a requirement, or just want expert advice? We're one conversation away."
        bgImage={featuredHero}
        className="lg:min-h-[600px]!"
      />

      <section className="relative max-w-[1136px] mx-auto px-24 py-48 sm:px-48 sm:py-80">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-48 lg:gap-[112px]">
          {/* Left Content */}
          <div className="flex-1 max-w-[560px]">
            <div className="flex flex-col gap-24 mb-32">
              <div className="flex flex-col gap-16">
                <h2 className="font-headline text-3xl sm:text-4xl lg:text-[40px] font-normal text-primary leading-tight lg:leading-56">
                  We're Here to Guide You
                </h2>
                <div className="h-4 w-120 bg-surface-primary" />
              </div>
              <p className="text-secondary font-extralight leading-relaxed">
                Whether you're a first-time homebuyer, an experienced investor, or a business seeking premium commercial spaces, our team is ready to provide personalized guidance tailored to your goals.
              </p>
            </div>

            <div className="flex flex-col gap-16">
              <span className="text-surface-primary text-sm font-medium uppercase tracking-[0.2em]">
                What to Expect
              </span>
              <ul className="flex flex-col gap-16">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-12">
                    <img
                      src={tickCircle}
                      alt="Tick"
                      className="size-16 shrink-0"
                    />
                    <span className="text-secondary text-sm font-extralight">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:sticky lg:top-120 self-start z-10 w-full lg:w-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>

      <OfficeLocationBanner />
    </main>
  );
}
