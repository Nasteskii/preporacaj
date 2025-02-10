import { useEffect, useState } from "react";
import { Button, Input, TextField } from "@mui/material";
import CommentComponent from "../commentComponent/CommentComponent";
import ModalComponent from "../modalComponent/ModalComponent";
import { RecommendationMeta } from "../../types/RecommendationMeta";
import { Recommendation } from "../../types/Recommendation";
import axios from "axios";
import { RecommendationComment } from "../../types/RecommendationComment";
import ReactStars from "react-rating-stars-component";

function RecommendationComponent({
  // recommendationType,
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
  const [formAction, setFormAction] = useState("");
  const [commentId, setCommentId] = useState<string | undefined>();

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const commentDTO = {
      profileId: event.target.profileId.value,
      content: event.target.content.value,
    };
    try {
      await axios.post(
        `http://localhost:9090/api/comments/${recommendationId}/add`,
        commentDTO
      ).then(fetchData);

      event.target.content.value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const ratingChanged = async (newRating: Int8Array) => {
    try {
      await axios.get(
        `http://localhost:9090/api/recommendations/rating/${recommendationId}/${newRating}`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const openEditModal = (
    text: string,
    action: string,
    commentId?: string,
    commentContent?: string
  ) => {
    setShowModal(true);
    setModalText(text);
    setFormAction(action);
    setCommentId(commentId);
    if (action === "editRecommendation") {
      if (recommendation) {
        const inputs = [
          recommendation.title,
          recommendation.recommendationContent,
        ];
        setModalInputs(inputs);
      }
    } else {
      const inputs = commentContent ? ["", commentContent] : ["", ""];
      setModalInputs(inputs);
    }
  };

  const openDeleteModal = (
    text: string,
    action: string,
    commentId?: string
  ) => {
    setModalInputs(null);
    setModalText(text);
    setFormAction(action);
    setCommentId(commentId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    fetchData();
  };

  return (
    <div>
      {showModal && (
        <ModalComponent
          modalText={modalText}
          modalInputs={modalInputs}
          closeModal={closeModal}
          action={formAction}
          commentId={commentId}
        />
      )}
      <h2 className="text-center text-2xl m-5">{recommendation?.title}</h2>
      <div>
        <div className="flex justify-end gap-4 m-5">
          <Button
            onClick={() =>
              openEditModal("Промени препорака", "editRecommendation")
            }
            color="secondary"
          >
            Промени
          </Button>
          <Button
            onClick={() =>
              openDeleteModal("Избриши препорака", "deleteRecommendation")
            }
            color="secondary"
          >
            Избриши
          </Button>
        </div>
        <div>
          <TextField
            className="bg-gray-light"
            value={recommendation?.recommendationContent}
            disabled
            fullWidth
            multiline
            color="secondary"
            inputProps={{
              style: {
                WebkitTextFillColor: "black",
                color: "black",
              },
            }}
          ></TextField>
        </div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={36}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
      </div>
      <div className="mt-12">
        <h2 className="text-purple text-xl mb-4">Коментари</h2>
        <form onSubmit={handleSubmit}>
          <h2 className="text-purple text-md">Напиши коментар</h2>
          <CommentComponent disabled={false} />
          <Input name="profileId" value="1" style={{ display: "none" }} />
          <button type="submit" className="bg-purple text-white">
            Коментирај
          </button>
        </form>
        <div className="mt-12">
          {comments && comments.length > 0
            ? comments.map((comment, index) => (
                <div key={index} className="flex space-between">
                  <div className="w-full">
                    <CommentComponent
                      key={comment.id}
                      recommendationComment={comment}
                      disabled={true}
                    />
                  </div>
                  <div className="w-1/4 mt-11">
                    <Button
                      onClick={() =>
                        openEditModal(
                          "Промени коментар",
                          "editComment",
                          comment.id,
                          comment.commentContent
                        )
                      }
                      color="secondary"
                    >
                      Промени
                    </Button>
                    <Button
                      onClick={() =>
                        openDeleteModal(
                          "Избриши коментар",
                          "deleteComment",
                          comment.id
                        )
                      }
                      color="secondary"
                    >
                      Избриши
                    </Button>
                  </div>
                </div>
              ))
            : "Нема коментари"}
        </div>
      </div>
    </div>
  );
}

export default RecommendationComponent;
