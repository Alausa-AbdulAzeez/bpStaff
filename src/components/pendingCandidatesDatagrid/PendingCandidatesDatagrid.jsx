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
import React, { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import SimpleBackdrop from "../backdrop/Backdrop";
import "./pendingCandidatesDatagrid.scss";
import { FaAngleDown } from "react-icons/fa";
import {
  publicRequest,
  publicRequestWithHeaders,
} from "../../functions/requestMethods";
import { toast } from "react-toastify";

const PendingCandidatesDatagrid = (props) => {
  // SELECTED CANDIDATE TESTS
  const [candidateTests, setCandidateTests] = useState([]);
  const [loadingCandedateTests, setLoadingCandedateTests] = useState(false);
  const [candedateTestsError, setCandedateTestsError] = useState(false);

  // SELECTED CANDIDATE RESULTS
  const [candidateResults, setCandidateResults] = useState([]);

  // BMI
  const [BMI, setBMI] = useState("");

  // TOAST ID
  const toastId = useRef(null);

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedCandidate, setSelecedCandidate] = useState({});

  // USER DETAILS
  const [userDetails, setUserDetails] = useState({
    candidateId: "",
    clientid: "",
    height: "",
    bloodPressure: "",
    weight: "",
    age: "",
    bmi: "",
    gender: "",
    // temperature: "",
    state: "",
  });
  // TABLE ROWS PER PAGE
  const [pageSize, setPageSize] = useState(5);

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

  // LOGGED IN USER
  const userName = props.userDetails?.data?.profile?.fullName;

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition("0");
  };
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedCandidate(row?.row);
    setUserDetails({
      ...userDetails,
      clientid: row?.row.clientId,
      candidateId: row?.row.candidateId,
    });

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

  // FUNCTION TO HANDLE CANDIDATE AUTHORIZATION
  const authorizeUser = async (params, type) => {
    if (type === "main") {
      console.log(params?.row?.candidateId);
    }
    if (type === "notMain") {
      console.log(selectedCandidate);
    }
    toastId.current = toast("Please wait...", {
      autoClose: 3000,
      isLoading: true,
    });

    let selectedCandidateId =
      params?.row?.candidateId || selectedCandidate?.candidateId;
    try {
      await publicRequest
        .put(
          `Candidate/Authorize/${selectedCandidateId}`,
          {},
          {
            headers: {
              Accept: "*",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          toast.update(toastId.current, {
            render: "Candidate can proceed to the next stage",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          props?.setReloadTable((prev) => !prev);
        });
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
    }
  };
  // END OF FUNCTION TO HANDLE CANDIDATE AUTHORIZATION

  const defaultColumns = [
    {
      field: "candidateName",
      headerName: "Candidate Name",
      width: 250,
      editable: false,
    },
    { field: "clientName", headerName: "Client Name", width: 250 },
    {
      field: "testcategory",
      headerName: "Test Category",
      width: 200,
      editable: false,
    },
    {
      field: "action",
      headerName: "Authorize",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {loggedInUserRole === "Reception" && (
              <div
                className="notAuthorized"
                onClick={() => authorizeUser(params, "main")}
              >
                Authorize
              </div>
            )}
            {(loggedInUserRole === "Phlebotomy" ||
              loggedInUserRole === "MainLab1") && (
              <div className="notAuthorized">View</div>
            )}
          </>
        );
      },
    },

    {
      field: "role",
      headerName: "Attended to",
      width: 150,
      renderCell: () => {
        return (
          <>
            <div className="pendingCandidatesNotAttendedTo">False</div>
          </>
        );
      },
    },
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
  const reportOfficerColumns = [
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

  const reportOfficerRows = [
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
      title = "Pending Candidates";
      rightBtnText = "Authorize";
      break;

    case "Phlebotomy":
      rows = tableData;
      columns = defaultColumns;
      title = "Pending Candidates";
      rightBtnText = "Save Details";
      break;
    case "MainLab1":
      rows = tableData;
      columns = defaultColumns;
      title = "Pending Candidates";
      rightBtnText = "Save Result";
      break;
    case "qualityAssurance":
      rows = qualityAssuranceRows;
      columns = qualityAssuranceColumns;
      title = "Candidates";
      rightBtnText = "Approve";
      break;

    case "reportOfficer":
      rows = reportOfficerRows;
      columns = reportOfficerColumns;
      title = "Candidates";
      leftBtnText = "Send Report";
      rightBtnText = "Preview Report";
      break;

    default:
      break;
  }
  // FUNCTION TO SEND UPDATED USER DETAILS TO THE BACKEND
  const updatedUserDetails = async () => {
    const { candidateId, clientId } = selectedCandidate;
    console.log(selectedCandidate);
    console.log(candidateId, clientId);
    console.log(userDetails);

    toastId.current = toast("Please wait...", {
      isLoading: true,
    });

    const keys = [
      "height",
      "bloodPressure",
      "weight",
      "age",
      "gender",
      "temperature",
    ];

    try {
      const found = keys?.find((key) => {
        return userDetails[key] === "";
      });

      if (!found) {
        await publicRequest
          .put(
            `/Candidate/UInfo?Candidateid=${Number(
              candidateId
            )}&Clientid=${Number(clientId)}`,
            userDetails,
            {
              headers: {
                Accept: "*",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            toast.update(toastId.current, {
              render: "Candidate can proceed to the next stage",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            props?.setReloadTable((prev) => !prev);
          });
      } else {
        console.log(found);
        throw Error(`Please fill all fields, the "${found}" field is empty`);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
    }
  };

  // HANDLE LEFT AND RIGHT BUTTON CLICK
  const handleBtnClick = (e) => {
    e.preventDefault();
    switch (e.target.textContent) {
      case "Preview Report":
        setOpen(true);
        console.log(e.target.textContent);
        break;
      case "Save Details":
        updatedUserDetails();
        break;
      case "Authorize":
        authorizeUser(selectedCandidate, "notMain");
        break;
      default:
        break;
    }
  };
  // FUNCTION TO CALCULATE BMI
  const calculateBmi = () => {
    let height = Number(userDetails?.height);
    let weight = Number(userDetails?.weight);
    let bmi;
    let heightInMetres;

    // CHECK IF HEIGHT AND WEIGHT ARE AVAILABLE
    userDetails?.height && userDetails?.weight;

    // convert Number( to) metres
    heightInMetres = Number(height) / 100;

    bmi = weight / Math.pow(heightInMetres, 2);
    setUserDetails({ ...userDetails, bmi: bmi?.toString() });

    setBMI(bmi);
  };
  // END OF FUNCTION TO CALCULATE BMI

  // FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES
  const handleCandidatePropertyChange = (e, dataType) => {
    setUserDetails({ ...userDetails, [dataType]: e.target.value });
    console.log(userDetails);
  };

  // END OF FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES

  // FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES
  const handleTestInputChange = (e, data) => {
    console.log(data);
  };

  // END OF FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES

  // use effect to update bmi
  useEffect(() => {
    calculateBmi();
  }, [userDetails?.height, userDetails?.weight]);

  // USEEFFECT TO UPDATE SELECTED ROW
  useEffect(() => {
    if (selectedCandidate?.candidateId) {
      let resultList = [];
      const getCandidatetTests = async () => {
        console.log(selectedCandidate);
        setLoadingCandedateTests(true);
        try {
          await publicRequest
            .get(`Candidate/test/${selectedCandidate?.candidateId}`)
            .then((res) => {
              console.log(res);
              setCandidateTests(res?.data?.data?.tests);
              setLoadingCandedateTests(false);

              for (
                let index = 0;
                index < res?.data?.data?.tests.length;
                index++
              ) {
                resultList = [
                  ...resultList,
                  {
                    candidateId: selectedCandidate?.candidateId,
                    testId: res?.data?.data?.tests[0]?.testId,
                    testCategoryId: 0,
                    result: "",
                    department: 3,
                    uploadedBy: userName,
                    clientId: selectedCandidate?.clientid,
                  },
                ];
              }
              console.log(resultList);
            });
        } catch (error) {
          console.log(error);
          setCandedateTestsError(true);
        }
      };

      getCandidatetTests();
    }
  }, [selectedCandidate]);

  // USEEFFECT TO UPDATE USER DETAILS
  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  // USEEFFECT TO UPDATE CANDIDATE TESTS
  useEffect(() => {
    console.log(candidateTests);
  }, [candidateTests]);

  return (
    <div className="datagridWraper">
      <SimpleBackdrop open={open} handleClose={handleClose} />

      <form className="slide" style={{ right: position }}>
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
          <p>{selectedCandidate?.clientName}</p>
        </div>

        <div className="phoneNo h3">
          <h3>Candidate Phone Number</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>
        <div className="numberOfTests h3">
          <h3>{"Candidate's Email"}</h3>
          <p>{selectedCandidate?.email}</p>
        </div>
        {loggedInUserRole === "receptionist" && (
          <div className="numberOfTests h3">
            <h3>{"Candidate's Adderess"}</h3>
            <p>{selectedCandidate?.address}</p>
          </div>
        )}
        {loggedInUserRole === "Phlebotomy" && (
          <div className="basicDetailsWrapper">
            <FormControl className="genderSelect">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userDetails?.gender}
                label="Company name"
                required
                onChange={(e) => handleCandidatePropertyChange(e, "gender")}
              >
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-search"
              label="Age"
              type="string"
              required={true}
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleCandidatePropertyChange(e, "age")}
            />
            <TextField
              id="outlined-search"
              label="Temperature"
              type="string"
              required
              className="candidateName basicCandidateDetailsInput"
              // onChange={(e) => handleCandidatePropertyChange(e, "temperature")}
            />
            <TextField
              id="outlined-search"
              label="Weight"
              type="string"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleCandidatePropertyChange(e, "weight")}
              value={userDetails?.weight}
              required
            />
            <TextField
              id="outlined-search"
              label="Height"
              type="number"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) => handleCandidatePropertyChange(e, "height")}
              value={userDetails?.height}
              required
            />
            <TextField
              id="outlined-search"
              label="BMI"
              type="number"
              value={BMI}
              className="candidateName basicCandidateDetailsInput"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="outlined-search"
              label="Blood Pressure"
              type="search"
              className="candidateName basicCandidateDetailsInput"
              onChange={(e) =>
                handleCandidatePropertyChange(e, "bloodPressure")
              }
              required
            />
          </div>
        )}
        {loggedInUserRole === "MainLab1" && (
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
              {loadingCandedateTests || candedateTestsError
                ? loadingCandedateTests
                  ? "Loading..."
                  : "An error occured, please try again"
                : candidateTests?.map((candidateTest) => {
                    return (
                      <TextField
                        id={candidateTest?.id}
                        label={candidateTest?.test}
                        type="search"
                        className="candidateName basicCandidateDetailsInput"
                        onChange={(e) =>
                          handleTestInputChange(e, candidateTest)
                        }
                      />
                    );
                  })}
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
            <div
              className='authorize sendDetails'
              onClick={(e) => handleBtnClick(e)}
            >
              {leftBtnText}
            </div>
          )} */}
          {rightBtnText?.length > 0 && (
            <div className="authorize" onClick={(e) => handleBtnClick(e)}>
              {rightBtnText}
            </div>
          )}
        </div>
      </form>
      <Box sx={{ height: 350, width: "100%" }}>
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
          getRowId={(row) => row.candidateId}
          pagination
          rowSelection={false}
        />
      </Box>
    </div>
  );
};

export default PendingCandidatesDatagrid;
