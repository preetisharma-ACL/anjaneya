import { FileText } from "lucide-react";

interface Section {
  number: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        By using this website, you agree to these Terms &amp; Conditions and our Privacy Policy.
        If you do not agree, please discontinue use of the website.
      </p>
    ),
  },
  {
    number: "02",
    title: "Website Purpose",
    content: (
      <div className="flex flex-col gap-16">
        <p className="text-secondary text-sm leading-relaxed">
          This website is intended to provide:
        </p>
        <ul className="flex flex-col gap-8">
          {[
            "Real estate information",
            "Property listings",
            "Consultation services",
            "Investment-related information",
            "Marketing and promotional content",
          ].map((item) => (
            <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
              <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary text-sm leading-relaxed">
          The information provided is for general informational purposes only.
        </p>
      </div>
    ),
  },
  {
    number: "03",
    title: "Property Information Disclaimer",
    content: (
      <div className="flex flex-col gap-16">
        <p className="text-secondary text-sm leading-relaxed">
          While we strive to provide accurate property details, Anjaneya Global Realty does not
          guarantee:
        </p>
        <ul className="flex flex-col gap-8">
          {[
            "Accuracy of listings",
            "Availability of properties",
            "Pricing updates",
            "Project specifications",
            "Legal approvals or permissions",
          ].map((item) => (
            <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
              <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary text-sm leading-relaxed">
          Users are advised to independently verify all property-related information before making
          decisions.
        </p>
      </div>
    ),
  },
  {
    number: "04",
    title: "Intellectual Property Rights",
    content: (
      <div className="flex flex-col gap-16">
        <p className="text-secondary text-sm leading-relaxed">
          All website content including:
        </p>
        <ul className="flex flex-col gap-8">
          {[
            "Text",
            "Logos",
            "Graphics",
            "Images",
            "Designs",
            "Videos",
            "Branding materials",
          ].map((item) => (
            <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
              <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary text-sm leading-relaxed">
          are the intellectual property of Anjaneya Global Realty unless otherwise stated.
          Unauthorized reproduction or distribution is prohibited.
        </p>
      </div>
    ),
  },
  {
    number: "05",
    title: "User Responsibilities",
    content: (
      <div className="flex flex-col gap-16">
        <p className="text-secondary text-sm leading-relaxed">Users agree not to:</p>
        <ul className="flex flex-col gap-8">
          {[
            "Use the website for unlawful purposes",
            "Upload malicious software or harmful content",
            "Attempt unauthorized access to website systems",
            "Copy or misuse website content",
            "Submit false or misleading information",
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
    number: "06",
    title: "Third-Party Services",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        The website may contain links to third-party websites, projects, developers, or service
        providers. We are not responsible for their content, services, or policies.
      </p>
    ),
  },
  {
    number: "07",
    title: "Limitation of Liability",
    content: (
      <div className="flex flex-col gap-16">
        <p className="text-secondary text-sm leading-relaxed">
          Anjaneya Global Realty shall not be liable for:
        </p>
        <ul className="flex flex-col gap-8">
          {[
            "Direct or indirect damages",
            "Loss of data",
            "Financial losses",
            "Website interruptions",
            "Errors or omissions in content",
          ].map((item) => (
            <li key={item} className="flex items-start gap-12 text-secondary text-sm leading-relaxed">
              <span className="mt-8 size-4 rounded-full bg-surface-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary text-sm leading-relaxed">
          arising from the use of this website.
        </p>
      </div>
    ),
  },
  {
    number: "08",
    title: "No Professional Advice",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        The content on this website does not constitute legal, financial, investment, or
        professional advice. Users should seek independent consultation before making property or
        investment decisions.
      </p>
    ),
  },
  {
    number: "09",
    title: "Modification of Terms",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        We reserve the right to update or modify these Terms &amp; Conditions at any time without
        prior notice. Continued use of the website constitutes acceptance of the revised terms.
      </p>
    ),
  },
  {
    number: "10",
    title: "Governing Law",
    content: (
      <p className="text-secondary text-sm leading-relaxed">
        These Terms &amp; Conditions shall be governed by and interpreted in accordance with the
        laws of India. Any disputes shall be subject to the jurisdiction of courts located in
        Noida, Uttar Pradesh.
      </p>
    ),
  },
  {
    number: "11",
    title: "Contact Information",
    content: (
      <div className="flex flex-col gap-8">
        {[
          ["Company", "Anjaneya Global Realty"],
          ["Location", "Noida, Uttar Pradesh, India"],
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

export function TermsAndConditions() {
  return (
    <main className="bg-surface-white min-h-screen">

      {/* Hero */}
      <section className="bg-[#1A2231] pt-120 pb-80 px-24 sm:px-48 lg:px-120">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-20">
            <div className="flex items-center gap-12">
              <div className="size-40 rounded-full bg-surface-primary/15 flex items-center justify-center">
                <FileText className="size-20 text-surface-primary" />
              </div>
              <span className="text-surface-primary text-sm font-medium uppercase tracking-[0.2em]">
                Legal
              </span>
            </div>
            <h1 className="text-negative text-4xl lg:text-5xl font-light leading-tight max-w-[600px]">
              Terms &amp; Conditions
            </h1>
            <p className="text-negative/50 text-sm">
              Effective Date:{" "}
              <span className="text-negative/70 font-medium">May 19, 2026</span>
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120 pt-64 pb-0">
        <div className="max-w-[760px]">
          <p className="text-secondary text-md leading-relaxed">
            Welcome to Anjaneya Global Realty. By accessing or using this website, you agree to
            comply with and be bound by the following Terms &amp; Conditions.
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