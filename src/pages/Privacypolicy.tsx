import { Shield } from "lucide-react";

interface Section {
  number: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    number: "01",
    title: "Information We Collect",
    content: (
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-12">
          <h4 className="text-primary text-md font-medium">Personal Information</h4>
          <ul className="flex flex-col gap-8">
            {[
              "Full name",
              "Email address",
              "Phone number",
              "Property preferences",
              "Location details",
              "Any information submitted through contact forms or inquiries",
            ].map((item) => (
              <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
                <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-12">
          <h4 className="text-primary text-md font-medium">Non-Personal Information</h4>
          <ul className="flex flex-col gap-8">
            {[
              "IP address",
              "Browser type",
              "Device information",
              "Pages visited",
              "Time spent on the website",
              "Cookies and analytics data",
            ].map((item) => (
              <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
                <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content: (
      <ul className="flex flex-col gap-8">
        {[
          "Responding to inquiries and property requests",
          "Providing real estate consultation and services",
          "Improving website functionality and user experience",
          "Sending updates, offers, newsletters, or promotional communication",
          "Conducting analytics and market research",
          "Complying with legal obligations",
        ].map((item) => (
          <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
            <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    number: "03",
    title: "Cookies Policy",
    content: (
      <div className="flex flex-col gap-16">
        <p className="text-secondary text-sm leading-relaxed">
          Our website may use cookies and similar technologies to:
        </p>
        <ul className="flex flex-col gap-8">
          {[
            "Enhance website performance",
            "Analyze visitor behavior",
            "Personalize user experience",
          ].map((item) => (
            <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
              <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary text-sm leading-relaxed">
          Users may disable cookies through browser settings; however, some website features may not function properly.
        </p>
      </div>
    ),
  },
  {
    number: "04",
    title: "Sharing of Information",
    content: (
      <div className="flex flex-col gap-16">
        <p className="text-secondary text-sm leading-relaxed">
          We do not sell or rent your personal information. We may share information with:
        </p>
        <ul className="flex flex-col gap-8">
          {[
            "Trusted business partners",
            "Real estate developers and property owners",
            "Service providers assisting website operations",
            "Government or legal authorities when required by law",
          ].map((item) => (
            <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
              <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "05",
    title: "Data Security",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        We implement reasonable administrative, technical, and security measures to protect your
        personal information from unauthorized access, misuse, or disclosure. However, no online
        platform can guarantee absolute security.
      </p>
    ),
  },
  {
    number: "06",
    title: "Third-Party Links",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        Our website may contain links to third-party websites. We are not responsible for the
        privacy practices, content, or policies of external websites.
      </p>
    ),
  },
  {
    number: "07",
    title: "Your Rights",
    content: (
      <div className="flex flex-col gap-16">
        <p className="text-secondary text-sm leading-relaxed">You may:</p>
        <ul className="flex flex-col gap-8">
          {[
            "Request access to your personal data",
            "Request correction or deletion of information",
            "Opt out of marketing communications",
            "Withdraw consent where applicable",
          ].map((item) => (
            <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
              <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary text-sm leading-relaxed">
          To make such requests, contact us using the details below.
        </p>
      </div>
    ),
  },
  {
    number: "08",
    title: "Children's Privacy",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        Our services are not intended for individuals under the age of 18. We do not knowingly
        collect personal information from minors.
      </p>
    ),
  },
  {
    number: "09",
    title: "Changes to This Privacy Policy",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        We reserve the right to update or modify this Privacy Policy at any time without prior
        notice. Updated versions will be posted on this page with the revised effective date.
      </p>
    ),
  },
  {
    number: "10",
    title: "Contact Us",
    content: (
      <div className="flex flex-col gap-8">
        {[
          ["Company", "Anjaneya Global Realty"],
          ["Location", "Noida, Uttar Pradesh, India"],
          ["Email", "info@anjaneyaglobalrealty.com"],
          ["Website", "www.anjaneyaglobalrealty.com"],
        ].map(([label, value]) => (
          <p key={label} className="text-secondary text-sm leading-relaxed">
            <span className="text-primary font-medium">{label}:&nbsp;</span>
            {value}
          </p>
        ))}
      </div>
    ),
  },
];

export function PrivacyPolicy() {
  return (
    <main className="bg-surface-white min-h-screen">

      {/* Hero */}
      <section className="bg-[#1A2231] pt-120 pb-80 px-24 sm:px-48 lg:px-120">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-20">
            <div className="flex items-center gap-12">
              <div className="size-40 rounded-full bg-surface-primary/15 flex items-center justify-center">
                <Shield className="size-20 text-surface-primary" />
              </div>
              <span className="text-surface-primary text-sm font-medium uppercase tracking-[0.2em]">
                Legal
              </span>
            </div>
            <h1 className="text-negative text-4xl lg:text-5xl font-light leading-tight max-w-[600px]">
              Privacy Policy
            </h1>
            <p className="text-negative/50 text-sm">
              Effective Date: <span className="text-negative/70 font-medium">May 19, 2026</span>
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120 pt-64 pb-0">
        <div className="max-w-[760px]">
          <p className="text-secondary text-md leading-relaxed">
            At Anjaneya Global Realty, we value your privacy and are committed to protecting your
            personal information. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our services.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120 py-64">
        <div className="flex flex-col divide-y divide-border-default">
          {sections.map((section) => (
            <div
              key={section.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-48 py-48 first:pt-0"
            >
              {/* Left: number + title */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <span className="text-surface-primary text-sm font-medium font-mono">
                  {section.number}
                </span>
                <h3 className="text-primary text-xl font-medium leading-32">
                  {section.title}
                </h3>
              </div>

              {/* Right: content */}
              <div className="lg:col-span-8">{section.content}</div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}