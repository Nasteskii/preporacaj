import { useState } from "react";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import CommentComponent from "../commentComponent/CommentComponent";
import ModalComponent from "../modalComponent/ModalComponent";

interface RecommendationProps {
  recommendationType: string;
  recommendationId: string;
}

function RecommendationComponent({
  recommendationType,
  recommendationId,
}: RecommendationProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("Дали сте сигурни?");
  const [modalInputs, setModalInputs] = useState<string[] | null>(null);

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
          <Button onClick={() => openEditModal()}>Edit</Button>
          <Button onClick={() => deleteRecommendation()}>Delete</Button>
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
        <h2>Comments</h2>
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
