import { Input } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ModalComponent = ({
  modalText,
  modalInputs,
  closeModal,
}: {
  modalText: string;
  modalInputs?: string[] | null;
  closeModal: any;
}) => {
  const location = useLocation();
  const path = location.pathname;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:9090/api/recommendations/add",
        formData
      );

      console.log("Form submitted successfully:", response.data);
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleRecommendationInputs = () => {
    if (path.substring(1) === "vehicles") {
      return (
        <Input
          name="category"
          value="VEHICLES"
          inputProps={{
            style: {
              WebkitTextFillColor: "white",
              color: "white",
            },
          }}
          style={{ display: "none" }}
        />
      );
    } else if (path.substring(1) === "home-appliances") {
      return (
        <Input
          name="category"
          value="HOME"
          inputProps={{
            style: {
              WebkitTextFillColor: "white",
              color: "white",
            },
          }}
          style={{ display: "none" }}
        />
      );
    } else if (path.substring(1) === "books") {
      return (
        <Input
          name="category"
          value="BOOKS"
          inputProps={{
            style: {
              WebkitTextFillColor: "white",
              color: "white",
            },
          }}
          style={{ display: "none" }}
        />
      );
    } else {
      return (
        <Input
          name="category"
          value="IT"
          inputProps={{
            style: {
              WebkitTextFillColor: "white",
              color: "white",
            },
          }}
          style={{ display: "none" }}
        />
      );
    }
  };

  const allowedPaths = [
    "/my-recommendations",
    "/vehicles",
    "/home-appliances",
    "/books",
    "/IT",
  ];

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
                {allowedPaths.includes(
                  path.substring(1, path.indexOf("/"))
                ) && (
                  <>
                    {handleRecommendationInputs()}
                    <Input
                      name="title"
                      placeholder="Име"
                      defaultValue={modalInputs[0]}
                      autoFocus={false}
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
                  autoFocus={false}
                  fullWidth={true}
                  color="secondary"
                  multiline={true}
                  style={{ color: "white" }}
                />
                <Input name="profileId" value="1" style={{ display: "none" }} />
                <div className="mt-5 justify-center flex gap-4">
                  <button onClick={closeModal}>Назад</button>
                  <button type="submit" className="bg-white">
                    Потврди
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-5 justify-center flex gap-4">
                <button onClick={closeModal}>Назад</button>
                <button type="submit" className="bg-white">
                  Потврди
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
