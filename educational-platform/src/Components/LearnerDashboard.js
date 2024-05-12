import React, { useEffect } from "react";
import LearnerNavBar from "./LearnerNavBar";
import axios from "axios";

const LearnerDashboard = () => {
  useEffect(() => {
    verifyLearner();
  }, []);

  const verifyLearner = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      token: token,
    };
    await axios
      .post(
        `http://localhost:8081/api/learners/verify`,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.message == "Authentication Successfull") {
        } else {
          alert("your session expired and you have been logged out");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        alert("You have been logged out");
        window.location.href = "/";
        console.log(err);
      });
  };
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
