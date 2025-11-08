import { Input } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  addRecommendation,
  changeStatus,
  deleteRecommendation,
  editRecommendation,
} from "../../services/recommendations.service";
import { deleteComment, editComment } from "../../services/comments.service";
import { useAuth } from "../../context/AuthContext";

const ModalComponent = ({
  modalText,
  modalInputs,
  cancel,
  confirm,
  action,
  recommendationId,
  commentId,
}: {
  modalText: string;
  modalInputs?: string[] | null;
  cancel: any;
  confirm?: any;
  action?: string;
  recommendationId?: string;
  commentId?: string;
}) => {
  const location = useLocation();
  const path = location.pathname;
  const { profile } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const recommendationDTO = {
      title: event.target.title?.value,
      content: event.target.content?.value,
      category: event.target.category?.value,
      profileId: profile?.id,
    };
    const commentDTO = {
      profileId: profile?.id,
      content: event.target.content?.value,
    };

    if (action === "addRecommendation") {
      await addRecommendation(recommendationDTO);
    } else if (action === "editRecommendation") {
      await editRecommendation(recommendationId!, recommendationDTO);
    } else if (action === "deleteRecommendation") {
      await deleteRecommendation(recommendationId!);
      window.location.href = path.substring(0, path.lastIndexOf("/"));
    } else if (action === "activateRecommendation") {
      await changeStatus(recommendationId!, "ACTIVE");
    } else if (action === "deactivateRecommendation") {
      await changeStatus(recommendationId!, "INACTIVE");
    } else if (action === "editComment") {
      await editComment(
        path.substring(path.lastIndexOf("/") + 1),
        commentDTO,
        commentId,
      );
    } else if (action === "deleteComment") {
      await deleteComment(commentId);
    }
    cancel();
  };

  const handleRecommendationInputs = () => {
    if (path.substring(1).includes("vehicles")) {
      return (
        <Input name="category" value="VEHICLES" style={{ display: "none" }} />
      );
    } else if (path.substring(1).includes("home-appliances")) {
      return <Input name="category" value="HOME" style={{ display: "none" }} />;
    } else if (path.substring(1).includes("books")) {
      return (
        <Input name="category" value="BOOKS" style={{ display: "none" }} />
      );
    } else {
      return <Input name="category" value="IT" style={{ display: "none" }} />;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-silver opacity-70"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit z-10 rounded-lg bg-gray-dark flex justify-center items-center backdrop-blur">
        <div className="bg-transparent px-10 py-5 rounded-lg w-fit">
          <div className="modal-content text-center text-white">
            <h1 className="text-xl mb-4">{modalText}</h1>
          </div>
          <div>
            {modalInputs ? (
              <form onSubmit={handleSubmit}>
                {(action === "addRecommendation" ||
                  action === "editRecommendation") && (
                  <>
                    {handleRecommendationInputs()}
                    <Input
                      name="title"
                      placeholder="Име"
                      defaultValue={modalInputs[0]}
                      autoFocus
                      required
                      fullWidth
                      color="secondary"
                      style={{ color: "white" }}
                      sx={{
                        "&:before": { borderBottom: "1px solid #fff" },
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottom: "1px solid #fff",
                        },
                      }}
                    />
                  </>
                )}
                <Input
                  name="content"
                  placeholder="Содржина"
                  defaultValue={modalInputs[1]}
                  autoFocus={
                    action !== "addRecommendation" &&
                    action !== "editRecommendation"
                  }
                  required
                  fullWidth
                  color="secondary"
                  multiline
                  style={{ color: "white" }}
                  sx={{
                    "&:before": { borderBottom: "1px solid #fff" },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "1px solid #fff",
                    },
                  }}
                />
                <div className="mt-5 justify-center flex flex-row-reverse gap-4">
                  {action === "editRecommendation" ||
                  action === "editComment" ? (
                    <>
                      <button type="submit" className="bg-white">
                        Потврди
                      </button>
                      <button onClick={cancel}>Откажи</button>
                    </>
                  ) : (
                    <>
                      <button type="submit" className="bg-white">
                        Додади
                      </button>
                      <button onClick={cancel}>Откажи</button>
                    </>
                  )}
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mt-5 justify-center flex gap-4">
                  <button onClick={cancel}>Откажи</button>
                  <button
                    onClick={confirm}
                    type="submit"
                    className="bg-white"
                    autoFocus
                  >
                    Потврди
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
