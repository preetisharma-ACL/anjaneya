export interface TeamMember {
  id: number;
  slug: string;
  name: string;
  designation: string;
  bio: string;
  photo: string | null;
  linkedin_url: string;
  youtube_url?: string;
  display_order: number;
}