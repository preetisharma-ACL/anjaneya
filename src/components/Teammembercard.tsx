import { TeamMember } from "@/types/Team";
import fallbackImg from "@/assets/rohit.png"; // use any default placeholder image

const SocialIcons = {
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => (
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
//   Youtube: (props: React.SVGProps<SVGSVGElement>) => (
//     <svg
//       {...props}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
//       <path d="m10 15 5-3-5-3z" />
//     </svg>
//   ),
};

interface TeamMemberCardProps {
  member: TeamMember;
  isLast: boolean;
}

// Shared YouTube channel URL — override per member if the API provides one
// const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/@RohitfromAnjaneyaGlobalRealty";

export function TeamMemberCard({ member, isLast }: TeamMemberCardProps) {
  const photoSrc = member.photo ?? fallbackImg;
//   const youtubeUrl = member.youtube_url ?? DEFAULT_YOUTUBE_URL;

  // Split bio into paragraphs on newlines, or show as single paragraph
  const bioParagraphs = member.bio
    ? member.bio.split("\n").filter((p) => p.trim().length > 0)
    : [];

  return (
    <div
      className={`flex flex-col md:flex-row gap-32 lg:gap-64 items-start ${
        !isLast ? "pb-48 border-b border-dashed" : ""
      }`}
    >
      {/* Member Image */}
      <div className="w-full sm:w-1/2 h-auto max-h-[400px] lg:max-h-[600px] lg:h-full lg:w-[300px] shrink-0">
        <picture>
          <source srcSet={photoSrc} type="image/webp" />
          <img
            src={photoSrc}
            alt={member.name}
            className="w-full h-full object-cover object-center rounded-2xl-32"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              (e.currentTarget as HTMLImageElement).src = fallbackImg;
            }}
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
            {/* <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on YouTube`}
              className="size-32 sm:size-40 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <SocialIcons.Youtube className="size-16" />
            </a> */}
            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="size-32 sm:size-40 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <SocialIcons.Linkedin className="size-16" />
              </a>
            )}
          </div>
        </div>

        {/* Bio Paragraphs */}
        <div className="flex flex-col gap-16">
          {bioParagraphs.length > 0 ? (
            bioParagraphs.map((para, pIdx) => (
              <p
                key={pIdx}
                className="text-primary/70 text-md leading-relaxed font-light"
              >
                {para}
              </p>
            ))
          ) : (
            <p className="text-primary/70 text-md leading-relaxed font-light">
              {member.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}