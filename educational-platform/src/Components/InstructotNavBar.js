import React from "react";

const InstructotNavBar = () => {
  return (
    <div className="col-md-2 navigation-container">
      <a href="/instructors" className="nav-item-container">
        Dashboard
      </a>
      <a href="/instructors" className="nav-item-container">
        My Courses
      </a>
      <a href="" className="nav-item-container">
        Profile
      </a>
    </div>
  );
};

export default InstructotNavBar;
