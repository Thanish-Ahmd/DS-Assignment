import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    verifyAdmin();
    getAllInstrcutors();
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

  const getAllInstrcutors = () => {
    axios
      .get(`http://localhost:8081/api/instructors/`)
      .then((res) => {
        setInstructors(res.data.instructors);
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
        <a href="/addInstructor" className="btn btn-success">
          Add Instructor{" "}
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
          {instructors.map((instructor, index) => (
            <tr>
              <th scope="col">{index + 1}</th>
              <td>{instructor.firstName}</td>
              <td>{instructor.lastName}</td>
              <td>{instructor.email}</td>
              <td>{instructor.phoneNo}</td>
              <td>{instructor.courses}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Instructors;
