import React from "react";

const LearnerNavBar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="col-md-2 navigation-container">
      <a href="/learnerDashboard" className="nav-item-container">
        Dashboard
      </a>
      <a href="/allCourses" className="nav-item-container">
        All Courses
      </a>
      <a href="/myCourses" className="nav-item-container">
        My Courses
      </a>
      <a href="/learnerProfile" className="nav-item-container">
        Profile
      </a>
      <a href="/learnerChangePassword" className="nav-item-container">
        Change Password
      </a>
      <a href="/#" className="nav-item-container" onClick={logout}>
        Log out
      </a>
    </div>
  );
};

export default LearnerNavBar;
