import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import "./homedatagrid.scss";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Homedatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5);
  console.log(props);

  // TABLE DATA
  const tableData = props?.tableData;
  let rows;
  let columns;
  let title;

  // END OF TABLE DATA

  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role;

  const defaultColumns = [
    {
      field: "candidateName",
      headerName: "Candidate Name",
      width: 250,
      editable: true,
    },
    { field: "id", headerName: "Company Name", width: 190 },
    {
      field: "testcategory",
      headerName: "Test Category",
      width: 140,
      editable: false,
    },
    {
      field: "appointmentdate",
      headerName: "Appointment Date",
      width: 190,
      description: "The candidate shoul be present by this date",
      renderCell: (props) => {
        const refinedDate = new Date(props?.value);
        const dateWithRightFormat = format(refinedDate, "dd-MMM-yyyy");
        return <div>{dateWithRightFormat}</div>;
      },
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 130,
    },
    // {
    //   field: "action",
    //   headerName: "Authorize",
    //   width: 170,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {params.row.attendedTo === "true" ? (
    //           <div className="homeNotAuthorized">Authorize</div>
    //         ) : (
    //           <div className="homeNotAuthorized">Authorize</div>
    //         )}
    //       </>
    //     );
    //   },
    // },
  ];

  switch (loggedInUserRole) {
    case "Reception":
      rows = tableData;
      columns = defaultColumns;
      title = "Candidates";
      break;
    case "Phlebotomy":
      rows = tableData;
      columns = defaultColumns;
      title = "Candidates";
      break;
    case "MainLab1":
      rows = tableData;
      columns = defaultColumns;
      title = "Candidates";
      break;

    default:
      break;
  }
  return (
    <div className="datagridWraper">
      <h3>{title}</h3>
      <Box sx={{ height: 350, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          // checkboxSelection
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rowSelection={false}
          getRowId={(row) => row?.candidateId}
        />
      </Box>
    </div>
  );
};

export default Homedatagrid;
