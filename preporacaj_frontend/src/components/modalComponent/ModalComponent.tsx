import { Input } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ModalComponent = ({
  modalText,
  modalInputs,
  cancel,
  confirm,
  action,
  commentId,
}: {
  modalText: string;
  modalInputs?: string[] | null;
  cancel: any;
  confirm: any;
  action?: string;
  commentId?: string;
}) => {
  const location = useLocation();
  const path = location.pathname;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const recommendationDTO = {
      title: event.target.title?.value,
      content: event.target.content?.value,
      category: event.target.category?.value,
      profileId: event.target.profileId?.value,
    };
    const commentDTO = {
      profileId: event.target.profileId?.value,
      content: event.target.content?.value,
    };
    try {
      if (action === "addRecommendation") {
        await axios.post(
          "http://localhost:9090/api/recommendations/add",
          recommendationDTO,
        );
      } else if (action === "editRecommendation") {
        await axios.post(
          `http://localhost:9090/api/recommendations/edit/${path.substring(
            path.lastIndexOf("/") + 1,
          )}`,
          recommendationDTO,
        );
      } else if (action === "deleteRecommendation") {
        await axios.delete(
          `http://localhost:9090/api/recommendations/delete/${path.substring(
            path.lastIndexOf("/") + 1,
          )}`,
        );
        history.go(-1);
      } else if (action === "editComment") {
        await axios.post(
          `http://localhost:9090/api/comments/${path.substring(
            path.lastIndexOf("/") + 1,
          )}/edit/${commentId}`,
          commentDTO,
        );
      } else if (action === "deleteComment") {
        await axios.delete(
          `http://localhost:9090/api/comments/delete/${commentId}`,
        );
      }
      cancel();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleRecommendationInputs = () => {
    if (path.substring(1) === "vehicles") {
      return (
        <Input name="category" value="VEHICLES" style={{ display: "none" }} />
      );
    } else if (path.substring(1) === "home-appliances") {
      return <Input name="category" value="HOME" style={{ display: "none" }} />;
    } else if (path.substring(1) === "books") {
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
            <p className="text-xl">{modalText}</p>
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
                      fullWidth={true}
                      color="secondary"
                      style={{ color: "white" }}
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
                  fullWidth={true}
                  color="secondary"
                  multiline
                  style={{ color: "white" }}
                />
                <Input name="profileId" value="1" style={{ display: "none" }} />
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
