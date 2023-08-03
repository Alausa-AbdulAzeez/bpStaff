import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MdCancel, MdEdit } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./manageClients.scss";
import { Link } from "react-router-dom";
import { publicRequest } from "../../functions/requestMethods";
import Loading from "../../components/loading/Loading";
import { FaAngleDown, FaDotCircle } from "react-icons/fa";
import Error from "../../components/error/Error";
import { useSelector } from "react-redux";
import { BsEye, BsTrashFill } from "react-icons/bs";

const ManageClients = () => {
  const [pageSize, setPageSize] = useState(50);
  const [tableData, setTableData] = useState([]);
  const [searchedTableData, setSearchedTableData] = useState([]);

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role;
  const userData = currentUser?.data;

  // SET LOADING AND ERROR FUNCTIONALITY
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // CLIENT  TO BE EDITED INFO
  const [clientTobeEdited, setClientToBeEdited] = useState({});

  // CLIENT  TO BE DELETED INFO
  const [clientToBeDeleted, setClientToBeDeleted] = useState({});

  // DATA TO BE DISPLAYED IN THE INPUTS AND SENT TO THE BACKEND
  const [updatedClientInfo, setupdatedClientInfo] = useState({});

  // DISABLE SLIDE INPUT PROPERTIES
  const [disableClientProperties, setdisableClientProperties] = useState(true);

  // TO SET THE STATE OF THE UPDATE BUTTON
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);

  // handlerowclick function
  const showSlide = (props, state) => {
    // getCandidate(props?.row)
    setClientToBeEdited(props?.row);
    setupdatedClientInfo(props?.row);
    console.log("function called");
    if (position !== "0") {
      setPosition("0");
      if (state === "notDisabled") {
        setdisableClientProperties(false);
        console.log("aa");
      }
      if (state === "disabled") {
        setdisableClientProperties(true);
      }
    }
  };
  // end of  handlerowclick function

  // function for seting candidate info
  const handleUpdateClientInfo = (e, dataName, data) => {
    if (dataName === "contactPersonEmail") {
      setupdatedClientInfo((prev) => {
        return {
          ...prev,
          contactPersonEmail: e.target.value,
        };
      });
    } else if (dataName === "contactPersonPhoneNummber") {
      setupdatedClientInfo((prev) => {
        return {
          ...prev,
          contactPersonPhone: e.target.value,
        };
      });
    } else {
      setupdatedClientInfo((prev) => {
        return {
          ...prev,
          [dataName]: e.target.value,
        };
      });
    }
  };
  // end of function for seting candidate info

  // UPDATE USER FUNCTION
  const handleUpdateClient = async () => {
    toastId.current = toast("Please wait...", {
      autoClose: 3000,
      isLoading: true,
    });

    setDisableUpdateBtn(true);

    try {
      await publicRequest
        .put(
          `Candidate/EditbyCID?Candidateid=${candidateToBeEdited?.candidateId}`,
          updatedClientInfo,
          {
            headers: {
              Accept: "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.update(toastId.current, {
            render: "Candidate updated succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setDisableUpdateBtn(true);
        })
        .then(async () => {
          await getAllCandidates().then(() => {
            setPosition("-100%");
          });
        });
    } catch (error) {
      console.log(error);
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
      setDisableUpdateBtn(true);
    }
  };
  // END OF UPDATE USER FUNCTION

  // useEffect to update error and loading state
  useEffect(() => {}, [error, loading]);
  // end of useEffect to update error and loading state

  // useeffect for disabled candidate inputs
  useEffect(() => {}, [disableClientProperties]);

  // useeffect for disabled candidate inputs

  // END OF SET LOADING AND ERROR FUNCTIONALITY

  // CLIENTS DATA FUNCTIONALITIES
  const getAllClients = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("Client/Client-list", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setTableData(res?.data?.data);
        setSearchedTableData(res?.data?.data);
        setLoading(false);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error);
      console.log(error);
    }
  };

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredclientsArray;
    filteredclientsArray = tableData.filter((tableDatum) =>
      tableDatum?.clientName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    );
    setSearchedTableData(filteredclientsArray);
    // console.log(filteredPendingCandidatesArray)
  };
  // END OF SEARCH FUNCTIONALITY

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients();
  }, []);
  // end of use effect to call the getAllClients function as the page loads
  // END OF TEST DATA FUNCTIONALITIES

  const columns = [
    // { field: 'id', headerName: 'Client ID', width: 190 },
    {
      field: "clientName",
      headerName: "Client name",
      width: 300,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email ",
      width: 200,
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
      editable: false,
    },

    {
      field: "fullName",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 360,
      renderCell: (props) => {
        return (
          <div className="buttons">
            <div>
              <div className="view" onClick={() => handleRowClick(props)}>
                View
              </div>
            </div>
            <div className="editWrapper">
              <div
                className="edit"
                onClick={() => showSlide(props, "notDisabled")}
              >
                Edit
              </div>
              <MdEdit className="editIcon" />
            </div>
            <div className="deleteWrapper">
              <div className="delete" onClick={() => handleClickOpen(props)}>
                Delete
              </div>
              <BsTrashFill className="deleteIcon" />
            </div>
          </div>
        );
      },
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Action',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 260,
    //   renderCell: () => {
    //     return (
    //       <div className='buttons'>
    //         <div className='editWrapper'>
    //           <div className='edit'>Edit</div>
    //           <MdEdit className='editIcon' />
    //         </div>
    //         <div className='deleteWrapper'>
    //           <div className='delete'>Delete</div>
    //           <BsTrashFill className='deleteIcon' />
    //         </div>
    //       </div>
    //     )
    //   },
    // },
  ];

  const rows = tableData;

  // ACCOURDION FUNCTIONALITIES
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // END OF ACCOURDION FUNCTIONALITIES

  // SLIDE FUNCTIONALITIES
  const [position, setPosition] = useState("-100%");
  const [client, setClient] = useState(null);
  const [clientInfo, setClientInfo] = useState(null);
  const [fetchingTestInfo, setFetchingTestInfo] = useState(null);

  // functionalities for getting and updating client State
  //get client function
  const getClient = async (id) => {
    try {
      setFetchingTestInfo(true);
      const res = await publicRequest.get(`Test/test-category/${id}`, {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });
      setClient(res.data);
      setFetchingTestInfo(false);
    } catch (error) {
      console.log(error);
      setFetchingTestInfo(false);
    }
  };
  //end of get client function

  // end of functionalities for getting and updating client State

  // handlerowclick function
  const handleRowClick = (props, e) => {
    console.log(props);
    getClient(props?.row?.clientId);
    setClientToBeEdited(props?.row);
    setClientInfo(props);
    if (position !== "0") {
      setPosition("0");
    }
  };
  // end of  handlerowclick function

  // hide slide function
  const handleHideSlide = () => {
    setPosition("-100%");
    setdisableClientProperties(true);
  };
  // end of hide slide function

  // END OF SLIDE FUNCTIONALITIES

  // MISCELLANEOUS USEEFFECTS
  // update errorMessage state
  useEffect(() => {}, [errorMessage]);
  // end of update errorMessage state
  // END OF MISCELLANEOUS USEEFFECTS
  // useRedirectLoggedOutUser()
  return (
    <div className="manageClientsWrapper">
      <Sidebar />
      <div className="manageClientsRight">
        <Topber userData={userData} />

        {loading || error ? (
          loading ? (
            <Loading />
          ) : (
            <Error errorMessage={errorMessage && errorMessage} />
          )
        ) : (
          <div className="manageClientsMainWrapper">
            <div className="manageClientsMainTop">
              <h3>All Clients</h3>
              <TextField
                id="outlined-search"
                label="Search"
                type="search"
                className="candidateSearchName"
                onChange={(e) => handleSearchParamsChange(e)}
                size="small"
              />
              <Link to="/manageClients/addClient">
                <button className="addClientBtn">
                  Add Client
                  <span>
                    <RiAddLine className="addIcon" />
                  </span>
                </button>
              </Link>
            </div>
            <div
              className={
                position === "-100%" ? "zeroWidthManageClients" : "slide"
              }
              style={{
                right: position,
              }}
            >
              <div className="slideTop">
                <div className="cancelconWrapper" onClick={handleHideSlide}>
                  <MdCancel className="cancelIcon" />
                </div>
                <div className="initials">
                  {clientTobeEdited?.clientName?.[0]}
                </div>
                <div className="slideFullname">
                  {clientTobeEdited?.clientName}
                </div>
              </div>
              <div className="slideMiddle">
                <div className="companyName h3 companyDetail">
                  <h3>Email</h3>
                  <p>{clientTobeEdited?.email}</p>
                </div>

                <div className="phoneNo h3 companyDetail">
                  <h3>Phone Number</h3>
                  <p>{clientTobeEdited?.phoneNumber}</p>
                </div>
                <div className="companyName h3 companyDetail">
                  <h3>Contact Person Email</h3>
                  {clientTobeEdited?.contactPersonEmail
                    ?.split(",")
                    .map((singleEmail, index) => {
                      return <p key={index}>{singleEmail}</p>;
                    })}
                </div>

                <div className="phoneNo h3 companyDetail">
                  <h3>Contact Person Phone Number</h3>
                  {clientTobeEdited?.contactPersonPhone
                    ?.split(",")
                    .map((singlePhone, index) => {
                      return <p key={index}>{singlePhone}</p>;
                    })}
                </div>
              </div>
              {!disableClientProperties && (
                <div className="updateClientSlideBottom">
                  <div className="updateClientInputWrapper">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      className="updateClientInput"
                      value={updatedClientInfo?.email}
                      onChange={(e) => handleUpdateClientInfo(e, "email")}
                      disabled={disableClientProperties}
                    />
                  </div>
                  <div className="updateClientInputWrapper">
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNo"
                      className="updateClientInput"
                      value={updatedClientInfo?.phoneNumber}
                      onChange={(e) => handleUpdateClientInfo(e, "phoneNumber")}
                      disabled={disableClientProperties}
                    />
                  </div>
                  <div className="updateClientInputWrapper">
                    <label htmlFor="address">Contact Person Email</label>
                    <input
                      type="text"
                      id="address"
                      className="updateClientInput"
                      value={updatedClientInfo?.contactPersonEmail}
                      disabled={disableClientProperties}
                      onChange={(e) =>
                        handleUpdateClientInfo(e, "contactPersonEmail")
                      }
                    />
                  </div>
                  <div className="updateClientInputWrapper">
                    <label htmlFor="address">Contact Person Phone Number</label>
                    <input
                      type="text"
                      id="address"
                      className="updateClientInput"
                      value={updatedClientInfo?.contactPersonPhone}
                      disabled={disableClientProperties}
                      onChange={(e) =>
                        handleUpdateClientInfo(e, "contactPersonPhoneNummber")
                      }
                    />
                  </div>
                  <button
                    className="updateClientBtn"
                    disabled={disableUpdateBtn}
                    onClick={handleUpdateClient}
                  >
                    Update
                  </button>
                </div>
              )}

              {/* <div className="testCategoriesWrapper">
                <h3>Test Categories</h3>
                {fetchingTestInfo
                  ? "Loading..."
                  : client?.data?.length === 0
                  ? "No result "
                  : client?.data?.map((clientData, index) => {
                      return (
                        <Accordion
                          expanded={expanded === `panel${index}`}
                          onChange={handleChange(`panel${index}`)}
                        >
                          <AccordionSummary
                            expandIcon={<FaAngleDown />}
                            aria-controls={`panel${index}d-content`}
                            id={`panel${index}d-header`}
                          >
                            <Typography>{clientData?.categoryName}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {clientData?.clientTestMappings?.map(
                              (clientTest) => {
                                return (
                                  // <Typography>

                                  //   <span>{clientTest?.test?.testName}</span>
                                  // </Typography>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <FaDotCircle />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={clientTest?.test?.testName}
                                    />
                                  </ListItemButton>
                                );
                              }
                            )}
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
              </div> */}
            </div>

            <div className="partnerLabsMainBottom">
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={searchedTableData}
                  columns={columns}
                  pageSize={pageSize}
                  // checkboxSelection
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[50, 150, 200]}
                  pagination
                  getRowId={(row) => row.clientId}
                  // onRowClick={(row, e) => handleRowClick(row, e)}
                />
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageClients;
