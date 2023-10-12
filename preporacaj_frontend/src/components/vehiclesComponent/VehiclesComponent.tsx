import { useEffect, useState } from "react";
import TableComponent from "../tableComponent/TableComponent";
import axios from "axios";
import { Recommendation } from "../../types/Recommendation";

function VehiclesComponent() {
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/recommendations/category/VEHICLES"
        );
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-silver w-full pt-12 pb-32 overflow-auto">
      <div className="text-center text-3xl mb-12 text-purple">Возила</div>
      <TableComponent recommendations={recommendations} />
    </div>
  );
}

export default VehiclesComponent;
