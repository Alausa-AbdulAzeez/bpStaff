import React, { useEffect } from "react";
import "./sidebar.scss";

import LogoImg from "../../utils/images/sidebarBiopath2.png";
import { BsFillPersonFill } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import AlertDialogSlide from "../Dialogue";
import {
  customerCareData,
  generalData,
  generalList,
  labScientistData,
  partnerLabManagerData,
  phlebotomistData,
  qualityAssuranceData,
  receptionistData,
  reportOfficerData,
  roleSpecificData,
} from "../../utils/data/sidebarData";
import { useSelector } from "react-redux";
import { IoIosMenu } from "react-icons/io";

const Sidebar = () => {
  // LOGOUT DIALOGUE
  const [open, setOpen] = React.useState(false);
  const [sidebarList, setSidebarList] = React.useState(generalList);
  const sidebarListNoPendingCandidate = sidebarList.filter(
    (sidebarItem) => sidebarItem?.title !== "Pending Candidates"
  );
  const sidebarListNoViewClients = sidebarList.filter(
    (sidebarItem) =>
      sidebarItem?.title !== "View Clients" &&
      sidebarItem?.title !== "Pending Candidates" &&
      sidebarItem?.title !== "Candidate Search"
  );
  const sidebarData = generalData;

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role?.[0];
  // const loggedInUserRole = 'partnerLabManager'

  let sidebarInfo;

  // FUNCTION TO SET DATA
  // const setData = () => {
  //   loggedInUserRole.forEach((role) => {
  //     console.log(roleSpecificData[role])
  //     if (roleSpecificData?.hasOwnProperty(role)) {
  //       sidebarInfo = sidebarInfo?.[1]?.listItems.push(
  //         ...roleSpecificData[role]
  //       )
  //     }
  //   })
  // }
  // END OF FUNCTION TO SET DATA

  // INITIALIZE SIDEBAR DATA

  switch (loggedInUserRole) {
    case "Reception":
      sidebarInfo = [...receptionistData, ...sidebarList];
      break;
    case "Phlebotomy":
      sidebarInfo = [...sidebarList, ...phlebotomistData];

      break;
    case "MainLab1":
      sidebarInfo = [...sidebarList, ...labScientistData];

      break;
    case "Quality assurance":
      sidebarInfo = [...sidebarList, ...qualityAssuranceData];

      break;
    case "Report":
      sidebarInfo = [...sidebarList, ...reportOfficerData];
      break;
    case "PartnerLab Manager":
      sidebarInfo = [
        ...partnerLabManagerData,
        ...sidebarListNoPendingCandidate,
      ];
      break;
    case "Customer Care":
      sidebarInfo = [...customerCareData, ...sidebarListNoViewClients];
      break;

    default:
      break;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="menuIconWrapper">
        <IoIosMenu className="menuIcon" />
      </div>
      <div className={`sidebarWrapper ${open ? "open" : ""}`}>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          message=" Are you sure you want to logout?"
          link="/login"
          title="Logout"
        />

        <div className="sidebarTop">
          <div className="sidebarTopImageWrapper">
            <img src={LogoImg} alt="Logo" /> <span>Biopath MedLab</span>
          </div>
        </div>
        <div className="sidebarBottom">
          <div className="sidebarBottomTop">
            {sidebarData?.map((singleItem, index) => {
              return (
                <ul className="ulTitle" key={index}>
                  {singleItem?.ulTitle}
                  {singleItem?.listItems?.map((listItem, index) => {
                    return (
                      <NavLink
                        to={listItem.link}
                        style={{ textDecoration: "none" }}
                        key={index}
                      >
                        {({ isActive }) => (
                          <li
                            className={
                              isActive
                                ? "activeLink sidebarListItem"
                                : "sidebarListItem"
                            }
                          >
                            {listItem.icon}
                            <span> {listItem.title}</span>
                          </li>
                        )}
                      </NavLink>
                    );
                  })}
                </ul>
              );
            })}
          </div>
          <div className="sidebarBottomTopBottom">
            <ul className="ulTitle">
              LIST
              {sidebarInfo?.map((listItem, index) => {
                return (
                  <NavLink
                    to={listItem.link}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    {({ isActive }) => (
                      <li
                        className={
                          isActive
                            ? "activeLink sidebarListItem"
                            : "sidebarListItem"
                        }
                      >
                        {listItem.icon}
                        <span> {listItem.title}</span>
                      </li>
                    )}
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div className="sidebarBottomBottom">
            <ul className="ulTitle">
              USER
              <NavLink to="/profile" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <li
                    className={
                      isActive
                        ? "activeLink sidebarListItem"
                        : "sidebarListItem"
                    }
                  >
                    <BsFillPersonFill className="sidebarIcon" />
                    <span> Profile</span>
                  </li>
                )}
              </NavLink>
              <li className="sidebarListItem" onClick={handleClickOpen}>
                <FiLogOut className="sidebarIcon" />
                <span> Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
