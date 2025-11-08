import { useEffect, useState } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { Recommendation } from "../../types/Recommendation";
import { fetchRecommendationsByProfileId } from "../../services/recommendations.service";
import { useAuth } from "../../context/AuthContext";

function MyRecommendationsComponent() {
  const { profile } = useAuth();
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  const fetchData = () => {
    if (!profile) return;

    fetchRecommendationsByProfileId(profile?.id!).then((response) =>
      setRecommendations(response?.data),
    );
  };

  useEffect(() => {
    fetchData();
  }, [profile]);

  if (profile) {
    return (
      <div className="bg-silver w-full py-12 overflow-auto">
        <div className="text-center text-3xl mb-12 text-purple">
          Мои препораки
        </div>
        <TableComponent
          recommendations={recommendations}
          fetchData={fetchData}
        />
      </div>
    );
  }
}

export default MyRecommendationsComponent;
