import { Profile } from "./Profile";
import { Recommendation } from "./Recommendation";

export interface RecommendationComment {
  id: string;
  profile: Profile;
  recommendation: Recommendation;
  commentContent: string;
}
