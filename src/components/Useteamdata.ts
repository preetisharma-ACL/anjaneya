import { useState, useEffect } from "react";
import { getTeamData } from "@/api/services/ourTeamService";
import { TeamMember } from "@/types/Team";

interface UseTeamDataReturn {
  team: TeamMember[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTeamData(): UseTeamDataReturn {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTeamData();
      // Sort by display_order so CMS controls the order
      const sorted = [...data].sort(
        (a: TeamMember, b: TeamMember) => a.display_order - b.display_order
      );
      setTeam(sorted);
    } catch (err) {
      setError("Failed to load team members. Please try again.");
      console.error("Team fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return { team, isLoading, error, refetch: fetchTeam };
}