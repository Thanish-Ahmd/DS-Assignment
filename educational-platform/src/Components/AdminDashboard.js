import React, { useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";

const AdminDashboard = () => {
  useEffect(() => {
    verifyAdmin();
  }, []);
  const verifyAdmin = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      token: token,
    };
    await axios
      .post(
        `http://localhost:8081/api/admins/verify`,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.message == "Authentication Successfull") {
        } else {
          console.log(res.data);
          alert("your session expired and you have been logged out");

          window.location.href = "/";
        }
      })
      .catch((err) => {
        alert("You have been logged out");
        window.location.href = "/";
      });
  };
  return (
    <div className="row">
      <AdminNavBar />
      <div className="col-md-10">
        <h4>Dashboard</h4>
      </div>
    </div>
  );
};

export default AdminDashboard;
