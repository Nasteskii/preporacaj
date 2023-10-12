import { useEffect, useState } from "react";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import CommentComponent from "../commentComponent/CommentComponent";
import ModalComponent from "../modalComponent/ModalComponent";
import { RecommendationMeta } from "../../types/RecommendationMeta";
import { Recommendation } from "../../types/Recommendation";
import axios from "axios";

function RecommendationComponent({
  recommendationType,
  recommendationId,
}: RecommendationMeta) {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("Дали сте сигурни?");
  const [modalInputs, setModalInputs] = useState<string[] | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/recommendations/category/VEHICLES/"
        );
        setRecommendation(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openEditModal = () => {
    setShowModal(true);
    setModalText("Промени препорака");
    const inputs = ["Име", "Содржина"];
    setModalInputs(inputs);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteRecommendation = () => {
    setShowModal(true);
  };

  return (
    <div>
      {showModal && (
        <ModalComponent
          modalText={modalText}
          modalInputs={modalInputs}
          closeModal={closeModal}
        />
      )}
      <h2 className="text-center m-5 ">
        {recommendationType}/{recommendationId} <br />
        Name
      </h2>
      <div>
        <div className="flex justify-end gap-4 m-5">
          <Button onClick={() => openEditModal()} color="secondary">
            Edit
          </Button>
          <Button onClick={() => deleteRecommendation()} color="secondary">
            Delete
          </Button>
        </div>
        <div>
          <TextField
            className="bg-gray-light"
            value="Content"
            disabled={true}
            fullWidth={true}
            multiline={true}
            color="secondary"
          ></TextField>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-purple text-xl mb-4">Comments</h2>
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
      </div>
    </div>
  );
}

export default RecommendationComponent;
