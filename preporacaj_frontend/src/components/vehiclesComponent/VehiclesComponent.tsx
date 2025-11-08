import { useEffect, useState } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { Recommendation } from "../../types/Recommendation";
import { fetchRecommendationsByCategory } from "../../services/recommendations.service";

function VehiclesComponent() {
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  const fetchData = () => {
    fetchRecommendationsByCategory("VEHICLES").then((response) =>
      setRecommendations(response?.data),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-silver w-full py-12 overflow-auto">
      <h1 className="text-center text-3xl mb-12 text-purple">Возила</h1>
      <TableComponent recommendations={recommendations} fetchData={fetchData} />
    </div>
  );
}

export default VehiclesComponent;
