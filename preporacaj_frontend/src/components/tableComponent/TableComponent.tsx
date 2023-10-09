import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const columns = [
  {
    name: "Title",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: any) => row.year,
    sortable: true,
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
}

export default TableComponent;
