import { useEffect, useState } from "react";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import CommentComponent from "../commentComponent/CommentComponent";
import ModalComponent from "../modalComponent/ModalComponent";
import { RecommendationMeta } from "../../types/RecommendationMeta";
import { Recommendation } from "../../types/Recommendation";
import axios from "axios";
import { RecommendationComment } from "../../types/RecommendationComment";

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
  const [comments, setComments] = useState<RecommendationComment[] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recommendationResponse = await axios.get(
          `http://localhost:9090/api/recommendations/${recommendationId}`
        );
        setRecommendation(recommendationResponse.data);

        const commentsResponse = await axios.get(
          `http://localhost:9090/api/comments/${recommendationId}`
        );
        setComments(commentsResponse.data);
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
      <h2 className="text-center text-2xl m-5">{recommendation?.title}</h2>
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
            value={recommendation?.recommendationContent}
            disabled={true}
            fullWidth={true}
            multiline={true}
            color="secondary"
          ></TextField>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-purple text-xl mb-4">Comments</h2>
        {comments && comments.length > 0
          ? comments.map((comment) => (
              <CommentComponent
                key={comment.id}
                recommendationComment={comment}
              />
            ))
          : "Нема коментари"}
      </div>
    </div>
  );
}

export default RecommendationComponent;
