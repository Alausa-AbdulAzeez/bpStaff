import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./pendingCandidates.scss";
import PendingCandidatesDatagrid from "../../components/pendingCandidatesDatagrid/PendingCandidatesDatagrid";
import { useSelector } from "react-redux";
import ErrorComponent from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { publicRequest } from "../../functions/requestMethods";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingCandidates = () => {
  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role;
  const userName = currentUser?.data?.profile?.fullName;
  const [reloadTable, setReloadTable] = useState(false);

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // TABLE DATA
  const [tableData, setTableData] = useState([]);

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // END OF LOADING AND ERROR DATA

  // FUNCTION TO GET AND SET PENDING CANDIDATES
  const getPendingCandidates = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("/Candidate/stage", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        console.log(res.data);
        setTableData(res.data?.data?.reverse());
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
  // END OF FUNCTION TO GET AND SET PENDING CANDIDATES

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getPendingCandidates();
  }, []);
  useEffect(() => {
    getPendingCandidates();
  }, [reloadTable]);

  // USEEFFECT TO UPDATE TABLE AFTER AUTHORIZING A CANDIATE
  useEffect(() => {
    console.log(reloadTable);
  }, [reloadTable]);

  return (
    <>
      <ToastContainer />
      <div className="pendingCandidatesWrapper">
        <Sidebar loggedInUserRole={loggedInUserRole} />
        <div className="pendingCandidatesRight">
          <Topber userName={userName} />
          <div className="pendingCandidatesMainWrapper">
            <div className="pendingCandidatesMainTop">
              <h3 className="pendingCandidatesMainTopTitle">Search</h3>
              <div className="pendingCandidatesMainTopForm">
                {/* <FormControl className='companySelect'>
      <InputLabel id='demo-simple-select-label'>
        Company name
      </InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        //   value={age}
        label='Company name'
        //   onChange={handleChange}
      >
        <MenuItem value={10}>Union Bank</MenuItem>
        <MenuItem value={20}>Chicken Republic</MenuItem>
      </Select>
    </FormControl> */}
                <TextField
                  id="outlined-search"
                  label="Candidate name"
                  type="search"
                  className="candidateName"
                />

                <div className="pendingCandidatesBtn">Search</div>
              </div>
            </div>
            <div className="pendingCandidatesMainBottom">
              {loading || error ? (
                loading ? (
                  <Loading />
                ) : (
                  <ErrorComponent errorMessage={errorMessage && errorMessage} />
                )
              ) : (
                <PendingCandidatesDatagrid
                  userDetails={currentUser}
                  tableData={tableData}
                  setReloadTable={setReloadTable}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingCandidates;
