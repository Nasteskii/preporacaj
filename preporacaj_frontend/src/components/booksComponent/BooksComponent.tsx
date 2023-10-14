import { useEffect, useState } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { Recommendation } from "../../types/Recommendation";
import axios from "axios";

function BooksComponent() {
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/api/recommendations/category/BOOKS"
      );
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-silver w-full pt-12 pb-32 overflow-auto">
      <div className="text-center text-3xl mb-12 text-purple">Книги</div>
      <TableComponent recommendations={recommendations} fetchData={fetchData} />
    </div>
  );
}

export default BooksComponent;
