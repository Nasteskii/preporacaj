import { useEffect, useState } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { Recommendation } from "../../types/Recommendation";
import axios from "axios";

function ITComponent() {
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/recommendations/category/IT"
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
      <div className="text-center text-3xl mb-12 text-purple">
        ИТ и компјутери
      </div>
      <TableComponent recommendations={recommendations} />
    </div>
  );
}

export default ITComponent;
