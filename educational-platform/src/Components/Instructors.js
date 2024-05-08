import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    getAllInstrcutors();
  }, []);

  const getAllInstrcutors = () => {
    axios
      .get(`http://localhost:8082/api/instructors/`)
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
        <table class="table">
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
