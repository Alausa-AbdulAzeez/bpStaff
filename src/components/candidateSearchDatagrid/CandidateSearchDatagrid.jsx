/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "./candidateSearchDatagrid.scss";
import { toast } from "react-toastify";
import { format } from "date-fns";

const CandidateSearchDatagrid = (props) => {
  // TABLE ROWS TO LOAD
  const [pageSize, setPageSize] = useState(5);

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedCandidate, setSelecedCandidate] = useState({});

  // INITIAL POSITION OF SLIDE
  const [position, setPosition] = useState("-100%");

  // TABLE DATA
  const tableData = props?.tableData;
  let rows;
  let columns;
  let title;

  // SLIDE BUTTONS
  let leftBtnText;
  let rightBtnText;

  // LOGGED IN USER RLOE
  const loggedInUserRole = props.userDetails?.data?.role;

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition("0");
  };
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedCandidate(row?.row);
    if (e.target.textContent !== "Authorize") {
      if (position !== "0") {
        setPosition("0");
      }
    }
  };
  // END OF HANDLE ROW CLICK

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    setPosition("-100%");
  };
  // END OF HANDLE ROW CLICK

  const defaultColumns = [
    {
      field: "candidateName",
      headerName: "Candidate Name",
      width: 250,
      editable: false,
    },
    { field: "id", headerName: "Company Name", width: 250 },
    {
      field: "testcategory",
      headerName: "Test Category",
      width: 200,
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
    //   field: 'action',
    //   headerName: 'Authorize',
    //   width: 130,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {params.row.attendedTo === 'true' ? (
    //           <div className='notAuthorized'>Authorize</div>
    //         ) : (
    //           <div className='notAuthorized'>Authorize</div>
    //         )}
    //       </>
    //     )
    //   },
    // },

    // {
    //   field: 'role',
    //   headerName: 'Attended to',
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {params.row.attendedTo === 'true' ? (
    //           <div className='attendedTo'>True</div>
    //         ) : (
    //           <div className='notAttendedTo'>False</div>
    //         )}
    //       </>
    //     )
    //   },
    // },
  ];

  const qualityAssuranceColumns = [
    {
      field: "lastName",
      headerName: "Candidate Name",
      width: 250,
      editable: false,
    },
    { field: "id", headerName: "Company Name", width: 190 },

    { field: "date", headerName: "Appointment Date", width: 180 },

    {
      field: "role",
      headerName: "Report Status",
      width: 160,
      renderCell: () => {
        return (
          <>
            <div className="reportSent">Sent</div>
          </>
        );
      },
    },
    {
      field: "timeSent",
      headerName: "Time Sent",
      width: 145,
    },
    {
      field: "timeUpdated",
      headerName: "Time Updated",
      width: 145,
    },
  ];

  const qualityAssuranceRows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "1",
      date: "1-March-2023",
      age: 35,
      attendedTo: "true",
    },
    {
      id: 2,
      lastName: "Lannister",
      date: "1-March-2023",
      firstName: "1",
      age: 42,
      attendedTo: "true",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "3",
      date: "1-March-2023",
      age: 45,
      attendedTo: "true",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "3",
      date: "1-March-2023",
      age: 16,
      attendedTo: "true",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "2",
      age: null,
      date: "1-March-2023",
      attendedTo: "true",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: "2",
      age: 150,
      date: "1-March-2023",
      attendedTo: "true",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "3",
      age: 44,
      attendedTo: "true",
      date: "1-March-2023",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "3",
      age: 36,
      attendedTo: "true",
    },
    { id: 9, lastName: "Roxie", firstName: "3", age: 65, attendedTo: "true" },
  ];

  switch (loggedInUserRole) {
    case "Reception":
      rows = tableData;
      columns = defaultColumns;
      title = "Candidates";
      rightBtnText = "Authorize";
      break;
    case "Phlebotomy":
      rows = tableData;
      columns = defaultColumns;
      title = "Candidates";
      // leftBtnText = "Send Details";
      rightBtnText = "Save Details";
      break;
    case "MainLab1":
      rows = tableData;
      columns = defaultColumns;
      title = "Candidates";
      // leftBtnText = "Send Result";
      rightBtnText = "Save Result";
      break;
    case "qualityAssurance":
      rows = qualityAssuranceRows;
      columns = qualityAssuranceColumns;
      title = "Candidates";
      rightBtnText = "Approve";
      break;

    default:
      break;
  }

  // DUMMY DATA STATE
  const [result, setResult] = useState({
    Gender: "",
    Age: "",
    Temperature: "",
    Weight: "",
    Height: "",
    BMI: "",
    ["Blood Pressure"]: "",
  });

  // DUMMY DATA FUNCTION
  const dummyDataSave = () => {
    setTimeout(() => {
      handleHideSlide();
      toast("Details Saved Successfully");
    }, 3000);
  };

  // DUMMY HANDLE CHANGE
  const handleChange = () => {
    console.log(result);
  };

  // USEEFFECT TO UPDATE SELECTED ROW
  useEffect(() => {}, [selectedCandidate]);
  return (
    <div className="datagridWraper">
      <div className="slide" style={{ right: position }}>
        <div className="slideTop">
          <div className="cancelconWrapper" onClick={handleHideSlide}>
            <MdCancel className="cancelIcon" />
          </div>
          <div className="initials">
            {selectedCandidate?.candidateName &&
              selectedCandidate?.candidateName[0]?.toUpperCase()}
          </div>
          <div className="slideFullname">
            {selectedCandidate?.candidateName?.toUpperCase()}
          </div>
        </div>
        <div className="companyName h3">
          <h3>Company Name</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>

        <div className="phoneNo h3">
          <h3>Candidate Phone Number</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>
        <div className="numberOfTests h3">
          <h3>{"Candidate's Email"}</h3>
          <p>{selectedCandidate?.email}</p>
        </div>
        {loggedInUserRole === "Reception" && (
          <div className="numberOfTests h3">
            <h3>{"Candidate's Adderess"}</h3>
            <p>{selectedCandidate?.address}</p>
          </div>
          // <div className='listOfTests'>
          //   <div className='singleTest'></div>
          //   <h3>Number of Tests</h3>
          //   <p>
          //     1. <span>Malaria test</span>
          //   </p>
          // </div>
        )}
        {loggedInUserRole === "Phlebotom" && (
          <div className="basicDetailsWrapper">
            <FormControl className="genderSelect">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={result?.Gender}
                label="Company name"
                onChange={() => handleChange()}
              >
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-search"
              label="Age"
              type="number"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleChange(e, "Age")}
            />
            <TextField
              id="outlined-search"
              label="Temperature"
              type="number"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleChange(e, "Temperature")}
            />
            <TextField
              id="outlined-search"
              label="Weight"
              type="number"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleChange(e, "Weight")}
            />
            <TextField
              id="outlined-search"
              label="Height"
              type="number"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleChange(e, "Height")}
            />
            <TextField
              id="outlined-search"
              label="BMI"
              type="number"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleChange(e, "BMI")}
            />
            <TextField
              id="outlined-search"
              label="Blood Pressure"
              type="search"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleChange(e, "Blood Pressure")}
            />
          </div>
        )}

        {loggedInUserRole === "labScientist" && (
          <>
            <div className="qualityAssuranceAccordionWrapper">
              <Accordion>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Candidate Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="basicDetailsWrapper">
              <TextField
                id="outlined-search"
                label="PCV"
                type="search"
                className="candidateName basicCandidateDetailsInput"
              />
              <TextField
                id="outlined-search"
                label="Blood Pressure"
                type="search"
                className="candidateName basicCandidateDetailsInput"
              />
            </div>
          </>
        )}
        {loggedInUserRole === "qualityAssurance" && (
          <div className="qualityAssuranceAccordionWrapper">
            <Accordion>
              <AccordionSummary
                expandIcon={<FaAngleDown />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Test Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
        <div className="bottomButtons">
          {/* {leftBtnText && (
            <div className='authorize sendDetails'>{leftBtnText}</div>
          )} */}
          {/* {rightBtnText?.length > 0 && (
            <div className='authorize' onClick={() => dummyDataSave()}>
              {rightBtnText}
            </div>
          )} */}
        </div>
      </div>
      <div className="boxWrapper">
        <Box sx={{ height: 350 }}>
          <h3>{title}</h3>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            // checkboxSelection
            // disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            onRowClick={(row, e) => handleRowClick(row, e)}
            pagination
            getRowId={(row) => row.candidateId}
          />
        </Box>
      </div>
    </div>
  );
};

export default CandidateSearchDatagrid;
