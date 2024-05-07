import React from "react";
import LearnerNavBar from "./LearnerNavBar";

const LearnerDashboard = () => {
  return (
    <div className="row">
      <LearnerNavBar />
      <div className="col-md-10">
        <h4>content</h4>
      </div>
    </div>
  );
};

export default LearnerDashboard;
