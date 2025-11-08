import { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import ModalComponent from "../modalComponent/ModalComponent";
import { RecommendationMeta } from "../../types/RecommendationMeta";
import { Recommendation } from "../../types/Recommendation";
import { RecommendationComment } from "../../types/RecommendationComment";
import ReactStars from "react-rating-stars-component";
import {
  changeRating,
  fetchRecommendationById,
} from "../../services/recommendations.service";
import {
  addComment,
  fetchCommentsByRecommendationId,
} from "../../services/comments.service";
import { useAuth } from "../../context/AuthContext";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function RecommendationComponent({ recommendationId }: RecommendationMeta) {
  const { profile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("Дали сте сигурни?");
  const [modalInputs, setModalInputs] = useState<string[] | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );
  const [comments, setComments] = useState<RecommendationComment[] | null>(
    null,
  );
  const [formAction, setFormAction] = useState("");
  const [commentId, setCommentId] = useState<string | undefined>();

  const fetchData = () => {
    fetchRecommendationById(recommendationId).then((response) =>
      setRecommendation(response?.data),
    );

    fetchCommentsByRecommendationId(recommendationId).then((response) =>
      setComments(response?.data),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const commentDTO = {
      profileId: profile?.id,
      content: event.target.content.value,
    };
    await addComment(recommendationId, commentDTO);
    fetchData();
    event.target.content.value = "";
  };

  const availabilityRatingChanged = async (newRating: Int8Array) => {
    await changeRating(recommendationId, newRating, "availability");
  };

  const reliabilityRatingChanged = async (newRating: Int8Array) => {
    await changeRating(recommendationId, newRating, "reliability");
  };

  const priceRatingChanged = async (newRating: Int8Array) => {
    await changeRating(recommendationId, newRating, "price");
  };

  const openEditModal = (
    text: string,
    action: string,
    commentId?: string,
    commentContent?: string,
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
    commentId?: string,
  ) => {
    setModalInputs(null);
    setModalText(text);
    setFormAction(action);
    setCommentId(commentId);
    setShowModal(true);
  };

  const openActivationModal = (text: string, action: string) => {
    setModalInputs(null);
    setModalText(text);
    setFormAction(action);
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
          cancel={closeModal}
          action={formAction}
          recommendationId={recommendationId}
          commentId={commentId}
        />
      )}
      <div className="mb-10">
        <div className="flex justify-end items-center h-8">
          {profile &&
            profile.role === "ROLE_SUPERUSER" &&
            (recommendation?.status === "INACTIVE" ? (
              <Button
                variant="text"
                color="success"
                className="!mr-4"
                onClick={() =>
                  openActivationModal(
                    "Активирај препорака?",
                    "activateRecommendation",
                  )
                }
              >
                Активирај
              </Button>
            ) : (
              <Button
                variant="text"
                color="warning"
                className="!mr-4"
                onClick={() =>
                  openActivationModal(
                    "Деактивирај препорака?",
                    "deactivateRecommendation",
                  )
                }
              >
                Деактивирај
              </Button>
            ))}
          {profile &&
            (profile.email === recommendation?.profile.email ||
              profile.role === "ROLE_SUPERUSER") && (
              <div>
                <IconButton
                  aria-label="edit"
                  onClick={() =>
                    openEditModal("Промени препорака", "editRecommendation")
                  }
                  size="medium"
                  color="secondary"
                >
                  <FiEdit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() =>
                    openDeleteModal("Избриши препорака", "deleteRecommendation")
                  }
                  size="medium"
                  color="error"
                >
                  <FiTrash2 />
                </IconButton>
              </div>
            )}
        </div>
        <h1 className="text-center text-3xl mb-8">{recommendation?.title}</h1>
        <p className="bg-gray-light p-4 rounded-xl mb-4">
          {recommendation?.recommendationContent}
        </p>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-purple text-md">
              Остави рејтинг за достапност на производот
            </p>
            {recommendation && (
              <ReactStars
                count={5}
                onChange={availabilityRatingChanged}
                size={36}
                isHalf={true}
                value={Math.round(recommendation.availabilityRating * 2) / 2}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            )}
          </div>
          <div>
            <p className="text-purple text-md">
              Остави рејтинг за надежност на производот
            </p>
            {recommendation && (
              <ReactStars
                count={5}
                onChange={reliabilityRatingChanged}
                size={36}
                isHalf={true}
                value={Math.round(recommendation.reliabilityRating * 2) / 2}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            )}
          </div>
          <div>
            <p className="text-purple text-md">
              Остави рејтинг за цената на производот
            </p>
            {recommendation && (
              <ReactStars
                count={5}
                onChange={priceRatingChanged}
                size={36}
                isHalf={true}
                value={Math.round(recommendation.priceRating * 2) / 2}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-light p-4 rounded-xl">
        <h2 className="text-purple text-xl mb-4">Коментари</h2>
        {profile && (
          <form onSubmit={handleSubmit} className="mb-12">
            <p className="text-purple text-md">Остави коментар</p>
            <TextField
              id="commentInput"
              name="content"
              className="bg-silver !mb-3"
              required
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
            <button type="submit" className="bg-purple text-white">
              Коментирај
            </button>
          </form>
        )}
        <div>
          {comments && comments.length > 0
            ? comments.map((comment, index) => (
                <div key={index} className="w-full mb-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-purple">
                      {comment?.profile?.name} {comment?.profile?.surname}
                    </h2>
                    {profile &&
                      (profile.email === comment?.profile.email ||
                        profile.role === "ROLE_SUPERUSER") && (
                        <div className="text-end">
                          <IconButton
                            aria-label="edit"
                            onClick={() =>
                              openEditModal(
                                "Промени коментар",
                                "editComment",
                                comment.id,
                                comment.commentContent,
                              )
                            }
                            size="small"
                            color="secondary"
                          >
                            <FiEdit />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() =>
                              openDeleteModal(
                                "Избриши коментар",
                                "deleteComment",
                                comment.id,
                              )
                            }
                            size="small"
                            color="error"
                          >
                            <FiTrash2 />
                          </IconButton>
                        </div>
                      )}
                  </div>
                  <p>{comment.commentContent}</p>
                </div>
              ))
            : "Нема коментари"}
        </div>
      </div>
    </div>
  );
}

export default RecommendationComponent;
