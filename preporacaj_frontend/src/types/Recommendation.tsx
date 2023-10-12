import { Profile } from "./Profile";

export interface Recommendation {
  id: string;
  title: string;
  rating: string;
  profile: Profile;
  recommendationContent: string;
}
