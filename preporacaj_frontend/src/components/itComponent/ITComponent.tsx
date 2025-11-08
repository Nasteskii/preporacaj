import { useEffect, useState } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { Recommendation } from "../../types/Recommendation";
import { fetchRecommendationsByCategory } from "../../services/recommendations.service";

function ITComponent() {
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  const fetchData = () => {
    fetchRecommendationsByCategory("IT").then((response) =>
      setRecommendations(response?.data),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-silver w-full py-12 overflow-auto">
      <div className="text-center text-3xl mb-12 text-purple">
        ИТ и компјутери
      </div>
      <TableComponent recommendations={recommendations} fetchData={fetchData} />
    </div>
  );
}

export default ITComponent;
