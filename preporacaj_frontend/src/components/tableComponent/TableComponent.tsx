import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import RecommendationComponent from "../recommendationComponent/RecommendationComponent";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IconButton } from "@mui/material";
import ModalComponent from "../modalComponent/ModalComponent";
import { useEffect, useState } from "react";
import { RecommendationsList } from "../../types/RecommendationsList";
import { useAuth } from "../../context/AuthContext";

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
      background: "#f3f8ff",
      justifyContent: "align-right",
      marginBottom: "16px",
      padding: "0",
    },
  },
  headCells: {
    style: {
      background: "#f3f8ff",
      color: "purple",
      fontSize: "18px",
    },
  },
  rows: {
    style: {
      background: "#f3f8ff",
      height: "70px",
      fontSize: "16px",
    },
  },
  pagination: {
    style: {
      background: "#f3f8ff",
      color: "purple",
      fontSize: "16px",
    },
  },
  noData: {
    style: {
      background: "#f3f8ff",
    },
  },
};

function TableComponent({ recommendations, fetchData }: RecommendationsList) {
  const location = useLocation();
  const path = location.pathname;
  const { profile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("Дали сте сигурни?");
  const [modalInputs, setModalInputs] = useState<string[] | null>(null);
  const [formAction, setFormAction] = useState("");
  const [recommendationId, setRecommendationId] = useState<
    string | undefined
  >();
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      const newData = recommendations
        .filter(
          (item) =>
            item.status === "ACTIVE" || profile?.role === "ROLE_SUPERUSER",
        )
        .map((item) => ({
          id: item.id,
          email: item.profile.email,
          fullName: item.profile.name + " " + item.profile.surname,
          title: item.title,
          rating:
            item.overallRating === 0
              ? "Нема рејтинг"
              : item.overallRating.toFixed(2),
          status: item.status === "ACTIVE" ? "АКТИВНА" : "НЕАКТИВНА",
        }));
      setData(newData);
    }
  }, [recommendations, profile]);

  const handleSearch = (event: any) => {
    const searchText = event.target.value;
    setSearchText(searchText);

    if (recommendations && recommendations.length > 0) {
      const filteredData = recommendations.filter(
        (item) =>
          (item.status === "ACTIVE" || profile?.role === "ROLE_SUPERUSER") &&
          (item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.recommendationContent
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.profile.email
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.profile.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.profile.surname
              .toLowerCase()
              .includes(searchText.toLowerCase())),
      );
      const newData = filteredData.map((item) => ({
        id: item.id,
        email: item.profile.email,
        fullName: item.profile.name + " " + item.profile.surname,
        title: item.title,
        rating:
          item.overallRating === 0
            ? "Нема рејтинг"
            : item.overallRating.toFixed(2),
        status: item.status === "ACTIVE" ? "АКТИВНА" : "НЕАКТИВНА",
      }));
      setData(newData);
    }
  };

  const openAddModal = () => {
    setShowModal(true);
    setModalText("Додади препорака");
    setFormAction("addRecommendation");
    const inputs = ["", ""];
    setModalInputs(inputs);
  };

  const openDeleteModal = (recommendationId: string) => {
    setShowModal(true);
    setModalText("Избриши препорака");
    setFormAction("deleteRecommendation");
    setModalInputs(null);
    setRecommendationId(recommendationId);
  };

  const closeModal = () => {
    setShowModal(false);
    fetchData();
  };

  const subHeaderComponent = (
    <ThemeProvider theme={theme}>
      <div className="flex justify-between items-center w-full">
        {path.substring(1) !== "my-recommendations" && profile && (
          <IconButton
            aria-label="add"
            onClick={() => openAddModal()}
            size="large"
            color="secondary"
          >
            <FiPlus />
          </IconButton>
        )}
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          className="w-96 !ml-auto"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
    </ThemeProvider>
  );

  const columns = [
    {
      name: "Име",
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
      name: "Рејтинг",
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
      sortFunction: (firstRow: any, secondRow: any) => {
        const firstValue = firstRow.rating;
        const secondValue = secondRow.rating;

        const isFirstString = isNaN(Number(firstValue));
        const isSecondString = isNaN(Number(secondValue));

        if (isFirstString && !isSecondString) {
          return -1;
        } else if (!isFirstString && isSecondString) {
          return 1;
        }

        return secondValue > firstValue ? -1 : secondValue < firstValue ? 1 : 0;
      },
    },
    {
      name: "Автор",
      selector: (row: any) => row.fullName,
      sortable: true,
      cell: (row: any) => (
        <Link
          to={`${row.id !== "Нема податоци" ? row.id : ""}`}
          className="no-underline text-black hover:text-purple w-full h-full py-6"
        >
          {row.fullName}
        </Link>
      ),
    },
    ...(profile && profile.role === "ROLE_SUPERUSER"
      ? [
          {
            name: "Статус",
            selector: (row: any) => row.status,
            sortable: true,
            cell: (row: any) => (
              <Link
                to={`${row.id !== "Нема податоци" ? row.id : ""}`}
                className="no-underline text-black hover:text-purple w-full h-full py-6"
              >
                {row.status}
              </Link>
            ),
          },
        ]
      : []),
    ...(profile
      ? [
          {
            cell: (row: any) =>
              profile.email === row.email ||
              profile.role === "ROLE_SUPERUSER" ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => openDeleteModal(row.id)}
                  size="small"
                  color="error"
                >
                  <FiTrash2 />
                </IconButton>
              ) : null,
          },
        ]
      : []),
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
      <div className="w-3/4 m-auto">
        {showModal && (
          <ModalComponent
            modalText={modalText}
            modalInputs={modalInputs}
            action={formAction}
            cancel={closeModal}
            recommendationId={recommendationId}
          />
        )}
        <DataTable
          defaultSortFieldId={2}
          defaultSortAsc={false}
          pagination
          responsive
          subHeader
          subHeaderWrap
          subHeaderComponent={subHeaderComponent}
          columns={columns}
          data={data}
          customStyles={customStyles}
          noDataComponent={<h2 className="text-lg">Нема препораки</h2>}
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
