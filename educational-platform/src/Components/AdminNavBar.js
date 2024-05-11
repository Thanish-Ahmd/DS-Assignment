import React from "react";

const AdminNavBar = () => {
  return (
    <div className="col-md-2 navigation-container">
      <a href="/instructors" className="nav-item-container">
        Dashboard
      </a>
      <a href="/instructors" className="nav-item-container">
        Instructors
      </a>
      <a href="" className="nav-item-container">
        Admins
      </a>
      <a href="/adminProfile" className="nav-item-container">
        Profile
      </a>
      <a href="/courseContentApproval" className="nav-item-container">
        Course Approval
      </a>
    </div>
  );
};

export default AdminNavBar;
