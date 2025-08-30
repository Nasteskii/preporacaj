import { useEffect, useState } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { Recommendation } from "../../types/Recommendation";
import { fetchRecommendationsByCategory } from "../../services/recommendations.service";

function HomeAppliancesComponent() {
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  const fetchData = () => {
    fetchRecommendationsByCategory("HOME").then((response) =>
      setRecommendations(response?.data),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-silver w-full pt-12 pb-32 overflow-auto">
      <div className="text-center text-3xl mb-12 text-purple">Домаќинство</div>
      <TableComponent recommendations={recommendations} fetchData={fetchData} />
    </div>
  );
}

export default HomeAppliancesComponent;
