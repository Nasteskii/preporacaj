import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import RecommendationComponent from "../recommendationComponent/RecommendationComponent";
import { FiPlus } from "react-icons/fi";
import { Button } from "@mui/material";
import ModalComponent from "../modalComponent/ModalComponent";
import { useState } from "react";
import { RecommendationsList } from "../../types/RecommendationsList";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#800080",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#800080",
            },
          },
        },
      },
    },
  },
});

const customStyles = {
  subHeader: {
    style: {
      background: "#ecebff",
      justifyContent: "space-between",
      marginBottom: "16px",
      padding: "0",
    },
  },
  headCells: {
    style: {
      background: "#ecebff",
      color: "purple",
      fontSize: "18px",
    },
  },
  rows: {
    style: {
      background: "#ecebff",
      height: "70px",
      fontSize: "16px",
    },
  },
  pagination: {
    style: {
      background: "#ecebff",
      color: "purple",
      fontSize: "16px",
    },
  },
};

function TableComponent({ recommendations, fetchData }: RecommendationsList) {
  const location = useLocation();
  const path = location.pathname;
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("Дали сте сигурни?");
  const [modalInputs, setModalInputs] = useState<string[] | null>(null);
  const [formAction, setFormAction] = useState("");

  const openAddModal = () => {
    setShowModal(true);
    setModalText("Додади препорака");
    setFormAction("addRecommendation");
    const inputs = ["", ""];
    setModalInputs(inputs);
  };

  const closeModal = () => {
    setShowModal(false);
    fetchData();
  };

  const subHeaderComponent = (
    <ThemeProvider theme={theme}>
      <Button
        onClick={() => openAddModal()}
        children={
          <FiPlus
            style={{
              color: "#800080",
              width: "30px",
              height: "30px",
            }}
          />
        }
        color="secondary"
      />
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
      />
    </ThemeProvider>
  );

  const columns = [
    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
      cell: (row: any) => (
        <Link
          to={`${row.id !== "Нема податоци" ? row.id : ""}`}
          className="no-underline text-black hover:text-purple w-full h-full py-6"
        >
          {row.title}
        </Link>
      ),
    },
    {
      name: "Rating",
      selector: (row: any) => row.rating,
      sortable: true,
      cell: (row: any) => (
        <Link
          to={`${row.id !== "Нема податоци" ? row.id : ""}`}
          className="no-underline text-black hover:text-purple w-full h-full py-6"
        >
          {row.rating}
        </Link>
      ),
    },
    {
      name: "User",
      selector: (row: any) => row.username,
      sortable: true,
      cell: (row: any) => (
        <Link
          to={`${row.id !== "Нема податоци" ? row.id : ""}`}
          className="no-underline text-black hover:text-purple w-full h-full py-6"
        >
          {row.username}
        </Link>
      ),
    },
  ];

  let data =
    recommendations && recommendations.length > 0
      ? recommendations.map((recommendation) => ({
          id: recommendation.id,
          username: recommendation.profile.username,
          title: recommendation.title,
          rating: recommendation.rating,
        }))
      : [
          {
            id: "Нема податоци",
            username: "Нема податоци",
            title: "Нема податоци",
            rating: "Нема податоци",
          },
        ];

  const allowedPaths = [
    "/my-recommendations",
    "/vehicles",
    "/home-appliances",
    "/books",
    "/IT",
  ];

  if (allowedPaths.includes(path)) {
    return (
      <div className="w-3/4 m-auto h-full">
        {showModal && (
          <ModalComponent
            modalText={modalText}
            modalInputs={modalInputs}
            action={formAction}
            closeModal={closeModal}
          />
        )}
        <DataTable
          defaultSortFieldId={1}
          pagination
          responsive
          subHeader
          subHeaderWrap
          subHeaderComponent={subHeaderComponent}
          columns={columns}
          data={data}
          customStyles={customStyles}
        />
      </div>
    );
  } else {
    const recommendationType = path.substring(1, path.lastIndexOf("/"));
    const recommendationId = path.substring(path.lastIndexOf("/") + 1);

    return (
      <div className="w-3/4 m-auto">
        <RecommendationComponent
          recommendationType={recommendationType}
          recommendationId={recommendationId}
        />
      </div>
    );
  }
}

export default TableComponent;
