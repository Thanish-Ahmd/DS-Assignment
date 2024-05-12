import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    verifyAdmin();
    getAllAdmins();
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

  const getAllAdmins = () => {
    axios
      .get(`http://localhost:8081/api/admins/`)
      .then((res) => {
        setAdmins(res.data.admins);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="row">
      <AdminNavBar />
      <div className="col-md-10">
        <h3>All Instructors</h3>
        <a href="/addAdmin" className="btn btn-success">
          Add Admin{" "}
        </a>
        <table class="table table-instrcutor">
          <thead class="table-warning">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Courses</th>
            </tr>
          </thead>
          {admins.map((admin, index) => (
            <tr>
              <th scope="col">{index + 1}</th>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td>{admin.phoneNo}</td>
              <td>{}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllAdmins;
