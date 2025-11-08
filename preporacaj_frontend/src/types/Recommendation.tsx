import { Profile } from "./Profile";

export interface Recommendation {
  id: string;
  title: string;
  recommendationContent: string;
  profile: Profile;
  status: string;
  availabilityRating: number;
  reliabilityRating: number;
  priceRating: number;
  overallRating: number;
}
