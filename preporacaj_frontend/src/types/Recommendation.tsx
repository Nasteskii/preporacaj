import { Profile } from "./Profile";

export interface Recommendation {
  id: string;
  title: string;
  rating: number;
  profile: Profile;
  recommendationContent: string;
}
