import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import RecommendationComponent from "../recommendationComponent/RecommendationComponent";
import { FiPlus } from "react-icons/fi";
import { Button } from "@mui/material";
import ModalComponent from "../modalComponent/ModalComponent";
import { useState } from "react";

const columns = [
  {
    name: "Id",
    selector: (row: any) => row.id,
    sortable: true,
    cell: (row: any) => (
      <Link
        to={`${row.id}`}
        className="no-underline text-black hover:text-purple w-full h-full py-6"
      >
        {row.id}
      </Link>
    ),
  },
  {
    name: "Title",
    selector: (row: any) => row.title,
    sortable: true,
    cell: (row: any) => (
      <Link
        to={`${row.id}`}
        className="no-underline text-black hover:text-purple w-full h-full py-6"
      >
        {row.title}
      </Link>
    ),
  },
  {
    name: "Year",
    selector: (row: any) => row.year,
    sortable: true,
    cell: (row: any) => (
      <Link
        to={`${row.id}`}
        className="no-underline text-black hover:text-purple w-full h-full py-6"
      >
        {row.year}
      </Link>
    ),
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 5,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 6,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 7,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 8,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 9,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 10,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 11,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 12,
    title: "Ghostbusters",
    year: "1984",
  },
];

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

function TableComponent() {
  const location = useLocation();
  const path = location.pathname;
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("Дали сте сигурни?");
  const [modalInputs, setModalInputs] = useState<string[] | null>(null);

  const openAddModal = () => {
    setShowModal(true);
    setModalText("Додади препорака");
    const inputs = ["Име", "Содржина"];
    setModalInputs(inputs);
  };

  const closeModal = () => {
    setShowModal(false);
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
      <div className="w-3/4 m-auto h-full">
        <RecommendationComponent
          recommendationType={recommendationType}
          recommendationId={recommendationId}
        />
      </div>
    );
  }
}

export default TableComponent;
