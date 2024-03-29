import { React, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/login/Login";
import "./app.scss";
import Home from "./pages/home/Home";
import CandidateSearch from "./pages/candidateSearch/CandidateSearch";
import PendingCandidates from "./pages/pendingCandidates/PendingCandidates";
import ViewClients from "./pages/viewClients/ViewClients";
import { useSelector } from "react-redux";
import Reports from "./pages/reports/Reports";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ChangePassword from "./pages/changePassword/ChangePassword";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./pages/profile/Profile";
import RejectedResults from "./pages/rejectedResults/RejectedResults";
import LabReportPage from "./pages/labReportPage/LabReportPage";
import DownloadReportPage from "./pages/downloadReport/DownloadReportPage";
import ScheduleCandidate from "./pages/scheduleCandidate/ScheduleCandidate";
import AddLaboratory from "./pages/addLaboratory/AddLaboratory";
import PartnerLabs from "./pages/partnerLabs/PartnerLabs";
import Invoice from "./pages/invoice/Invoice";
import TestCategories from "./pages/testCategories/TestCategories";
import AddClient from "./pages/addClient/AddClient";
import ManageClients from "./pages/manageClients/ManageClients";

function App() {
  let userDetails;
  // const user = sessionStorage.getItem('user')
  // const [user, setUser] = useState(sessionStorage.getItem('user'))
  // const user = useSelector((state) => state.globalState.globalState.user);
  // console.log(user);

  // FUNCTION FOR SETTING USER DETAILS
  // switch (user?.email) {
  //   case 'e@gmail.com':
  //     userDetails = { name: 'Esther', role: 'receptionist' }
  //     break
  //   case 'o@gmail.com':
  //     userDetails = { name: 'Olamide', role: 'phlebotomist' }
  //     console.log('Olamide')
  //     break
  //   case 'ada@gmail.com':
  //     userDetails = { name: 'Ada', role: 'labScientist' }
  //     break
  //   case 'ade@gmail.com':
  //     userDetails = { name: 'Adetola', role: 'reportOfficer' }
  //     break
  //   case 'b@gmail.com':
  //     userDetails = { name: 'Bankole', role: 'qualityAssurance' }
  //     break

  //   default:
  //     break
  // }

  // END OF FUNCTION FOR SETTING USER DETAILS

  // useEffect(() => {}, [user])

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/partnerLabs" element={<PartnerLabs />} />
            <Route path="/invoices" element={<Invoice />} />
            <Route path="/partnerLabs/addLab" element={<AddLaboratory />} />
            <Route path="/candidateSearch" element={<CandidateSearch />} />
            <Route path="/pendingCandidates" element={<PendingCandidates />} />
            <Route path="/rejectedResults" element={<RejectedResults />} />
            <Route path="/viewClients" element={<ViewClients />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/testCategories" element={<TestCategories />} />
            <Route path="/manageClients" element={<ManageClients />} />
            <Route path="/manageClients/addClient" element={<AddClient />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/labReport/:candidate"
              element={<DownloadReportPage />}
            />
            <Route path="/scheduleCandidate" element={<ScheduleCandidate />} />

            {/* <Route path='/labReport' element={<LabReportPage />} /> */}
          </Route>
          <Route exact path="/login" element={<Register />} />

          <Route path="/getToken" element={<ForgotPassword />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
