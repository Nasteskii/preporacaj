import { Input } from "@mui/material";

const ModalComponent = ({
  modalText,
  modalInputs,
  closeModal,
}: {
  modalText: string;
  modalInputs?: string[] | null;
  closeModal: any;
}) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-silver opacity-70"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit z-10 rounded-lg bg-gray-dark flex justify-center items-center backdrop-blur">
        <div className="bg-transparent px-10 py-5 rounded-lg w-fit">
          <div className="modal-content text-center text-white">
            <p className="text-xl">{modalText}</p>
          </div>
          <div>
            {modalInputs && (
              <form>
                <Input
                  name="name"
                  placeholder="Име"
                  defaultValue={modalInputs[0]}
                  autoFocus={false}
                  fullWidth={true}
                  color="secondary"
                  style={{ color: "white" }}
                />
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
              </form>
            )}
          </div>
          <div className="mt-5 justify-center flex gap-4">
            <button onClick={closeModal}>Назад</button>
            <button>Потврди</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
