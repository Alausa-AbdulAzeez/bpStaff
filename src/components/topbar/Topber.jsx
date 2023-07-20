import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import "./topbar.scss";

const Topber = (props) => {
  console.log(props.userData);
  const userName = props?.userData?.profile?.fullName;
  const labName = props?.userData?.profile?.laboratory?.laboratoryName;
  return (
    <div className="topbarWrapper">
      <h3 className="topbarUsername">
        {userName} <span className="topbarLabname">({labName})</span>
      </h3>
      {/* <h3>{labName}</h3> */}
      <BsFillPersonFill className="topbarIcon" />
    </div>
  );
};

export default Topber;
