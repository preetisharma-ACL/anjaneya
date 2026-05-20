import { SubPageHero } from "@/components/SubPageHero";
import { ContactBanner } from "@/components/ContactBanner";
import { TeamMemberCard } from "@/components/Teammembercard";
import { TeamMemberSkeleton } from "@/components/Teammemberskeleton";
import { useTeamData } from "@/components/Useteamdata";
import teamsHero from "@/assets/teams-hero.png";

// Number of skeleton cards to show while loading
const SKELETON_COUNT = 4;

export function OurTeam() {
  const { team, isLoading, error, refetch } = useTeamData();

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
        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center gap-16 py-64 text-center">
            <p className="text-primary/70 text-lg">{error}</p>
            <button
              onClick={refetch}
              className="px-24 py-12 rounded-full border border-primary/30 text-primary font-medium hover:bg-primary/5 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-48">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <TeamMemberSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && team.length === 0 && (
          <div className="flex items-center justify-center py-64">
            <p className="text-primary/50 text-lg">No team members found.</p>
          </div>
        )}

        {/* Team Members List */}
        {!isLoading && !error && team.length > 0 && (
          <div className="grid grid-cols-1 gap-48">
            {team.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isLast={index === team.length - 1}
              />
            ))}
          </div>
        )}
      </section>

      <ContactBanner />
    </main>
  );
}