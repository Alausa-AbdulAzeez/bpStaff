import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import SimpleBackdrop from "../backdrop/Backdrop";
import "./rejectedResultsDatagrid.scss";
import { publicRequest } from "../../functions/requestMethods";
import { toast } from "react-toastify";

const RejectedResultsDatagrid = (props) => {
  // SELECTED CANDIDATE RESULTS
  let [candidateResults, setCandidateResults] = useState([]);

  // SELECTED CANDIDATE RESULTS TO BE UPDATED
  let [candidateResultsTobeUpdated, setCandidateResultsTobeUpdated] = useState(
    []
  );

  // DISABLE BUTTON WHILE UPDATING
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);

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

  // WIDAL TEST VALUES
  const [widalTestValues, setWidalTestValues] = useState({
    "S.typhi O": "",
    "S.typhi H": "",
    "S.paratyphi-A O": "",
    "S.paratyphi-A H": "",
    "S.paratyphi-B O": "",
    "S.paratyphi-B H": "",
    "S.paratyphi-C O": "",
    "S.paratyphi-C H": "",
  });

  // TABLE ROWS PER PAGE
  const [pageSize, setPageSize] = useState(5);

  // INITIAL POSITION OF SLIDE
  const [position, setPosition] = useState("-100%");

  // WIDAL TEST CHECK
  let containsWidalTest = false;
  const [containsWidal, setContainsWidal] = useState(false);

  const defaultColumns = [
    {
      field: "candidateName",
      headerName: "Candidate Name",
      width: 350,
      editable: false,
    },
    { field: "clientName", headerName: "Client Name", width: 350 },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: () => {
        return (
          <>
            <div className="notAuthorized">View</div>
          </>
        );
      },
    },
  ];

  // TABLE DATA
  const tableData = props?.tableData;
  let rows = tableData;
  let columns = defaultColumns;
  let title = "Rejected Results";

  // SLIDE BUTTONS
  let leftBtnText;
  let rightBtnText = "Update Result";

  // LOGGED IN USER RLOE
  const loggedInUserRole = props.userDetails?.data?.role?.[0];

  // LOGGED IN USER
  const userName = props.userDetails?.data?.profile?.fullName;

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // LOGOUT BACKDROP
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
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

  // HANDLE FUNCTIONS TO CALL BASED ON BUTTON CLICKED
  const handleBtnClick = (e) => {
    e.preventDefault();
    switch (e.target.textContent) {
      case "Preview Report":
        setOpen(true);
        break;
      case "Update Result":
        updateResult();

        break;
      default:
        break;
    }
  };

  // FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES
  const handleTestInputChange = (e, data) => {
    if (candidateResults.length > 0) {
      // MAP OVER THE CANDIDATE RESULTS ARRAY, IF THE IDs MATCH UPDATE, IF NOT RETURN CURRENT ITEM IN THE ARRAY
      candidateResults = candidateResults.map((candidateResult) => {
        if (candidateResult?.testName !== "Widal test") {
          return candidateResult?.resultId === data?.resultId
            ? { ...candidateResult, result: e.target.value }
            : candidateResult;
        } else {
          return candidateResult;
        }
      });
      setCandidateResults(candidateResults);
    }
  };

  // END OF FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES

  // FUNCTION TO UPDATE CANDIDATE RESULT (MAINLAB)
  const updateResult = async () => {
    setDisableUpdateBtn(true);

    toastId.current = toast("Please wait...", {
      autoClose: 3000,
      isLoading: true,
    });
    let updatedResult;
    updatedResult = candidateResults?.map((candidateResult) => {
      return {
        resultDescription: candidateResult?.result,
        resultId: candidateResult?.resultId,
      };
    });
    try {
      await publicRequest
        .put(`Result`, updatedResult, {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        .then(() => {
          toast.update(toastId.current, {
            render: "Result updated successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setDisableUpdateBtn(false);
        })
        .then(async () => await props?.getRejectedResults())
        .then(() => {
          setPosition("-100%");
        });
    } catch (error) {
      console.log(error);
      setDisableUpdateBtn(false);
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

  // END OF FUNCTION TO UPDATE CANDIDATE RESULT (MAINLAB)

  // USEEFFECT TO UPDATE SELECTED ROW

  // AS A CANDIDATE IS SELECTED, GET IT'S TESTS AND CREATE A RESULTS LIST
  useEffect(() => {
    if (loggedInUserRole === "MainLab1") {
      let rejectedResultList = selectedCandidate?.tests;
      setCandidateResults(rejectedResultList);

      containsWidalTest = selectedCandidate?.tests?.some((test) => {
        if (test.testName === "Widal test") {
          setWidalTestValues(JSON.parse(test?.result));
        }
        return test.testName === "Widal test";
      });

      setContainsWidal(containsWidalTest);
    }
  }, [selectedCandidate]);

  // FUNCTION TO HANDLE WIDAL TEST DATA CHANGE
  const handleWidalDetailsChange = (e, dataType) => {
    setWidalTestValues({ ...widalTestValues, [dataType]: e.target.value });
    // setUserDetails({
    //   ...userDetails,
    //   urinalysis: JSON.stringify({
    //     ...urinalysisDetails,
    //     [dataType]: e.target.value,
    //   }),
    // })
    // console.log(userDetails)
    candidateResults = candidateResults.map((candidateResult) => {
      if (candidateResult.testName === "Widal test") {
        return {
          ...candidateResult,
          result: JSON.stringify({
            ...widalTestValues,
            [dataType]: e.target.value,
          }),
        };
      } else {
        return candidateResult;
      }
    });

    setCandidateResults(candidateResults);
  };
  // END OF FUNCTION TO HANDLE WIDAL TEST DATA CHANGE

  // USEEFFECT TO UPDATE USER DETAILS
  useEffect(() => {}, [userDetails]);

  // USEEFFECT TO UPDATE USER DETAILS
  useEffect(() => {}, [selectedCandidate]);

  return (
    <div className="datagridWraper">
      <SimpleBackdrop open={open} handleClose={handleClose} />

      <form
        className={position === "-100%" ? "zeroWidth" : "slide"}
        style={{ right: position }}
      >
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

        {loggedInUserRole === "MainLab1" && (
          <>
            <div className="basicDetailsWrapper">
              {candidateResults?.map((candidateResult, index) => {
                return (
                  candidateResult?.testName !== "Widal test" && (
                    <TextField
                      key={index}
                      id={candidateResult?.resultId}
                      label={candidateResult?.testName}
                      type="search"
                      value={candidateResult?.result}
                      className="candidateName basicCandidateDetailsInput"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) =>
                        handleTestInputChange(e, candidateResult)
                      }
                      size="small"
                    />
                  )
                );
              })}
            </div>
            {containsWidal && (
              <div className="rejectedWidalTestWrapper">
                <h3 className="rejectedWidalTestH3">{"Widal Test"}</h3>
                <div className="rejectedWidalTestBasicDetailsWrapper">
                  <TextField
                    id="outlined-search"
                    label="S.typhi O"
                    type="search"
                    className="candidateName basicCandidateDetailsInput"
                    onChange={(e) => handleWidalDetailsChange(e, "S.typhi O")}
                    size="small"
                    value={widalTestValues?.["S.typhi O"]}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    id="outlined-search"
                    label="S.typhi H"
                    type="search"
                    className="candidateName basicCandidateDetailsInput"
                    onChange={(e) => handleWidalDetailsChange(e, "S.typhi H")}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={widalTestValues?.["S.typhi H"]}
                  />
                  <TextField
                    id="outlined-search"
                    label="S.paratyphi-A O"
                    type="search"
                    className="candidateName basicCandidateDetailsInput"
                    onChange={(e) =>
                      handleWidalDetailsChange(e, "S.paratyphi-A O")
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={widalTestValues?.["S.paratyphi-A O"]}
                  />
                  <TextField
                    id="outlined-search"
                    label="S.paratyphi-A H"
                    type="search"
                    className="candidateName basicCandidateDetailsInput"
                    onChange={(e) =>
                      handleWidalDetailsChange(e, "S.paratyphi-A H")
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={widalTestValues?.["S.paratyphi-A H"]}
                  />
                  <TextField
                    id="outlined-search"
                    label="S.paratyphi-B O"
                    type="search"
                    className="candidateName basicCandidateDetailsInput"
                    onChange={(e) =>
                      handleWidalDetailsChange(e, "S.paratyphi-B O")
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={widalTestValues?.["S.paratyphi-B O"]}
                  />
                  <TextField
                    id="outlined-search"
                    label="S.paratyphi-B H"
                    type="search"
                    className="candidateName basicCandidateDetailsInput"
                    onChange={(e) =>
                      handleWidalDetailsChange(e, "S.paratyphi-B H")
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={widalTestValues?.["S.paratyphi-B H"]}
                  />
                  <TextField
                    id="outlined-search"
                    label="S.paratyphi-C O"
                    type="search"
                    className="candidateName basicCandidateDetailsInput"
                    onChange={(e) =>
                      handleWidalDetailsChange(e, "S.paratyphi-C O")
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={widalTestValues?.["S.paratyphi-C O"]}
                  />
                  <TextField
                    id="outlined-search"
                    label="S.paratyphi-C H"
                    type="search"
                    className="candidateName basicCandidateDetailsInput"
                    onChange={(e) =>
                      handleWidalDetailsChange(e, "S.paratyphi-C H")
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={widalTestValues?.["S.paratyphi-C H"]}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <div className="bottomButtons">
          {/* {leftBtnText && (
            <div className=" rejectResult" onClick={(e) => handleBtnClick(e)}>
              {leftBtnText}
            </div>
          )} */}

          <button
            className="authorizeRejectedResult"
            onClick={(e) => handleBtnClick(e)}
            disabled={disableUpdateBtn}
          >
            {rightBtnText}
          </button>
        </div>
      </form>
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
          getRowId={(row) => row?.candidateName + row?.clientName}
          pagination
          rowSelection={false}
        />
      </Box>
    </div>
  );
};

export default RejectedResultsDatagrid;
