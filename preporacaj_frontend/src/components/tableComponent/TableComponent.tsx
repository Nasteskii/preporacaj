import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import RecommendationComponent from "../recommendationComponent/RecommendationComponent";

const columns = [
  {
    name: "Id",
    selector: (row: any) => row.id,
    sortable: true,
    cell: (row: any) => (
      <Link
        to={`${row.id}`}
        className="no-underline text-black hover:text-purple w-full"
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
        className="no-underline text-black hover:text-purple w-full"
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
        className="no-underline text-black hover:text-purple w-full"
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

const subHeaderComponent = (
  <ThemeProvider theme={theme}>
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      sx={{ margin: "5px" }}
    />
  </ThemeProvider>
);

const customStyles = {
  subHeader: {
    style: {
      background: "#ecebff",
    },
  },
  headCells: {
    style: {
      background: "#ecebff",
      color: "purple",
      fontSize: "14px",
    },
  },
  rows: {
    style: {
      background: "#ecebff",
      fontSize: "14px",
    },
  },
  pagination: {
    style: {
      background: "#ecebff",
      color: "purple",
      fontSize: "14px",
    },
  },
};

function TableComponent() {
  const location = useLocation();
  const path = location.pathname;

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
